import React, { useRef, useEffect, useState } from 'react';

const LineChart = ({ data, title = "Évolution des ventes mensuelles" }) => {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, value: null, label: null });

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Effacer le canvas avant de dessiner
    ctx.clearRect(0, 0, width, height);
    
    // Dessiner le titre
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 20);

    // Effacer le canvas
    ctx.clearRect(0, 0, width, height);

    // Définir les couleurs et styles
    const primaryColor = '#4F46E5';
    const gridColor = 'rgba(255, 255, 255, 0.1)';
    const textColor = 'rgba(255, 255, 255, 0.7)';

    // Trouver les valeurs min et max pour l'échelle
    const values = data.map(item => item.value);
    const maxValue = Math.max(...values) * 1.1; // Ajouter 10% pour l'espace
    const minValue = 0;

    // Dessiner la grille et les axes
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    
    // Lignes horizontales
    for (let i = 0; i <= 5; i++) {
      const y = height - (i / 5) * (height - 40);
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
      
      // Étiquettes de l'axe Y
      const value = (i / 5) * maxValue;
      ctx.fillStyle = textColor;
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(value).toLocaleString(), 35, y + 4);
    }

    // Dessiner la ligne du graphique
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Calculer les points
    data.forEach((item, index) => {
      const x = 40 + (index / (data.length - 1)) * (width - 60);
      const y = height - ((item.value - minValue) / (maxValue - minValue)) * (height - 40);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      // Étiquettes de l'axe X
      ctx.fillStyle = textColor;
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.month, x, height - 10);
    });
    
    ctx.stroke();

    // Dessiner les points
    data.forEach((item, index) => {
      const x = 40 + (index / (data.length - 1)) * (width - 60);
      const y = height - ((item.value - minValue) / (maxValue - minValue)) * (height - 40);
      
      ctx.fillStyle = primaryColor;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    });

  }, [data]);

  // Gestion du survol
  const handleMouseMove = (e) => {
    if (!canvasRef.current || !data || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const xStep = (width - 2 * padding) / (data.length - 1);
    
    // Vérifier si la souris est proche d'un point
    for (let i = 0; i < data.length; i++) {
      const pointX = padding + i * xStep;
      const pointY = height - padding - (data[i].value / Math.max(...data.map(d => d.value))) * (height - 2 * padding);
      
      const distance = Math.sqrt(Math.pow(x - pointX, 2) + Math.pow(y - pointY, 2));
      
      if (distance < 20) {
        setTooltip({
          show: true,
          x: pointX,
          y: pointY,
          value: data[i].value,
          label: data[i].month
        });
        return;
      }
    }
    
    setTooltip({ show: false, x: 0, y: 0, value: null, label: null });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, value: null, label: null });
  };

  return (
    <div className="w-full h-64 relative">
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={250} 
        className="w-full h-full" 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {tooltip.show && (
        <div 
          className="absolute bg-dark-light text-white p-2 rounded shadow-lg z-10 text-sm"
          style={{ 
            left: `${tooltip.x}px`, 
            top: `${tooltip.y - 40}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-bold">{tooltip.label}</div>
          <div>{tooltip.value.toLocaleString()} €</div>
        </div>
      )}
    </div>
  );
};

export default LineChart;
