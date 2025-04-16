import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Composant personnalisé pour afficher un graphique de performance
 */
const CustomPerformanceChart = ({ data, title, type = 'bar' }) => {
  const canvasRef = React.useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, value: null, label: null });
  
  React.useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, width, height);
    
    // Dessiner l'arrière-plan
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);
    
    // Trouver les valeurs min et max
    const maxValue = Math.max(...data.map(item => item.value)) * 1.1;
    
    // Dessiner les axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Dessiner le titre
    ctx.fillStyle = '#f8fafc';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 20);
    
    if (type === 'bar') {
      // Dessiner les barres
      const barWidth = (width - 2 * padding - (data.length - 1) * 10) / data.length;
      
      data.forEach((item, index) => {
        const x = padding + index * (barWidth + 10);
        const barHeight = ((height - 2 * padding) * item.value) / maxValue;
        const y = height - padding - barHeight;
        
        // Dessiner la barre
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Dessiner le label
        ctx.fillStyle = '#f8fafc';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + barWidth / 2, height - padding + 15);
        
        // Dessiner la valeur
        ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
      });
    } else if (type === 'line') {
      // Dessiner la ligne
      const pointWidth = (width - 2 * padding) / (data.length - 1);
      
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      data.forEach((item, index) => {
        const x = padding + index * pointWidth;
        const y = height - padding - ((height - 2 * padding) * item.value) / maxValue;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        // Dessiner le point
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Dessiner le label
        ctx.fillStyle = '#f8fafc';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x, height - padding + 15);
      });
      
      ctx.stroke();
    }
  }, [data, title, type]);
  
  const handleMouseMove = (e) => {
    if (!canvasRef.current || !data || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    if (type === 'bar') {
      const barWidth = (width - 2 * padding - (data.length - 1) * 10) / data.length;
      
      for (let i = 0; i < data.length; i++) {
        const barX = padding + i * (barWidth + 10);
        const barHeight = ((height - 2 * padding) * data[i].value) / (Math.max(...data.map(item => item.value)) * 1.1);
        const barY = height - padding - barHeight;
        
        if (x >= barX && x <= barX + barWidth && y >= barY && y <= height - padding) {
          setTooltip({
            show: true,
            x: barX + barWidth / 2,
            y: barY - 10,
            value: data[i].value,
            label: data[i].label
          });
          return;
        }
      }
    } else if (type === 'line') {
      const pointWidth = (width - 2 * padding) / (data.length - 1);
      
      for (let i = 0; i < data.length; i++) {
        const pointX = padding + i * pointWidth;
        const pointY = height - padding - ((height - 2 * padding) * data[i].value) / (Math.max(...data.map(item => item.value)) * 1.1);
        
        const distance = Math.sqrt(Math.pow(x - pointX, 2) + Math.pow(y - pointY, 2));
        
        if (distance <= 10) {
          setTooltip({
            show: true,
            x: pointX,
            y: pointY - 10,
            value: data[i].value,
            label: data[i].label
          });
          return;
        }
      }
    }
    
    setTooltip({ show: false, x: 0, y: 0, value: null, label: null });
  };
  
  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, value: null, label: null });
  };
  
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {tooltip.show && (
        <div
          className="absolute bg-dark-darker text-white px-3 py-1 rounded-md shadow-lg z-10 transform -translate-x-1/2"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-bold">{tooltip.label}</div>
          <div>{tooltip.value}</div>
        </div>
      )}
    </div>
  );
};

/**
 * Composant pour l'onglet Performance du tableau de bord
 */
const DashboardPerformance = ({ performanceData, onRefresh }) => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Filtrer les données en fonction de la plage de temps sélectionnée
  const filteredData = React.useMemo(() => {
    if (!performanceData) return [];
    
    switch (timeRange) {
      case 'week':
        return performanceData.filter(item => item.period === 'week');
      case 'month':
        return performanceData.filter(item => item.period === 'month');
      case 'quarter':
        return performanceData.filter(item => item.period === 'quarter');
      case 'year':
        return performanceData.filter(item => item.period === 'year');
      default:
        return performanceData;
    }
  }, [performanceData, timeRange]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* En-tête avec bouton d'actualisation */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analyse des performances</h2>
        <button 
          onClick={onRefresh}
          className="flex items-center px-4 py-2 bg-primary rounded-lg hover:bg-primary-dark transition-colors"
        >
          <span className="mr-2">🔄</span>
          <span>Actualiser</span>
        </button>
      </div>
      
      {/* Sélecteur de plage de temps */}
      <div className="flex space-x-4 bg-dark-light p-4 rounded-lg">
        <button
          onClick={() => setTimeRange('week')}
          className={`px-4 py-2 rounded-md ${
            timeRange === 'week' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Semaine
        </button>
        <button
          onClick={() => setTimeRange('month')}
          className={`px-4 py-2 rounded-md ${
            timeRange === 'month' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Mois
        </button>
        <button
          onClick={() => setTimeRange('quarter')}
          className={`px-4 py-2 rounded-md ${
            timeRange === 'quarter' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Trimestre
        </button>
        <button
          onClick={() => setTimeRange('year')}
          className={`px-4 py-2 rounded-md ${
            timeRange === 'year' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Année
        </button>
      </div>
      
      {/* Graphiques de performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800">
          <CustomPerformanceChart 
            data={filteredData.map(item => ({ label: item.label, value: item.sales }))} 
            title="Ventes" 
            type="bar" 
          />
        </div>
        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800">
          <CustomPerformanceChart 
            data={filteredData.map(item => ({ label: item.label, value: item.revenue }))} 
            title="Chiffre d'affaires" 
            type="line" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800">
          <CustomPerformanceChart 
            data={filteredData.map(item => ({ label: item.label, value: item.customers }))} 
            title="Nouveaux clients" 
            type="bar" 
          />
        </div>
        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800">
          <CustomPerformanceChart 
            data={filteredData.map(item => ({ label: item.label, value: item.conversion }))} 
            title="Taux de conversion (%)" 
            type="line" 
          />
        </div>
      </div>
      
      {/* Tableau récapitulatif */}
      <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">Récapitulatif des performances</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4">Période</th>
                <th className="py-3 px-4">Ventes</th>
                <th className="py-3 px-4">Chiffre d'affaires</th>
                <th className="py-3 px-4">Nouveaux clients</th>
                <th className="py-3 px-4">Taux de conversion</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-4">{item.label}</td>
                  <td className="py-3 px-4">{item.sales}</td>
                  <td className="py-3 px-4">{item.revenue} €</td>
                  <td className="py-3 px-4">{item.customers}</td>
                  <td className="py-3 px-4">{item.conversion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPerformance;
