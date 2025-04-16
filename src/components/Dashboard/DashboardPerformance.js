import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Composant personnalisé pour afficher un graphique de performance
 */
const CustomPerformanceChart = ({ data, title, type = 'bar' }) => {
  // Formater les données pour Recharts
  const chartData = data.map(item => ({
    name: item.label,
    value: item.value
  }));
  
  // Personnalisation du tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-darker text-white px-3 py-2 rounded-md shadow-lg">
          <p className="font-bold">{label}</p>
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          {type === 'bar' ? (
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
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
