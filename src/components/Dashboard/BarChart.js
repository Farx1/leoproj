import React, { useRef, useEffect, useState } from 'react';

const BarChart = ({ data, title = "Répartition mensuelle du chiffre d'affaires" }) => {
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
    const barColor = '#10B981';
    const hoverBarColor = '#059669';
    const gridColor = 'rgba(255, 255, 255, 0.1)';
    const textColor = 'rgba(255, 255, 255, 0.7)';

    // Trouver la valeur max pour l'échelle
    const values = data.map(item => item.value);
    const maxValue = Math.max(...values) * 1.1; // Ajouter 10% pour l'espace

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

    // Dessiner les barres
    const barWidth = (width - 60) / data.length * 0.6;
    const barSpacing = (width - 60) / data.length;

    data.forEach((item, index) => {
      const x = 40 + index * barSpacing + (barSpacing - barWidth) / 2;
      const barHeight = (item.value / maxValue) * (height - 40);
      const y = height - barHeight;
      
      // Dessiner la barre
      ctx.fillStyle = index % 2 === 0 ? barColor : hoverBarColor;
      ctx.beginPath();
      
      // Polyfill pour roundRect si non supporté
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      } else {
        // Fallback pour les navigateurs qui ne supportent pas roundRect
        ctx.moveTo(x + 4, y);
        ctx.lineTo(x + barWidth - 4, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + 4);
        ctx.lineTo(x + barWidth, y + barHeight);
        ctx.lineTo(x, y + barHeight);
        ctx.lineTo(x, y + 4);
        ctx.quadraticCurveTo(x, y, x + 4, y);
      }
      
      ctx.fill();
      
      // Étiquettes de l'axe X
      ctx.fillStyle = textColor;
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.day, x + barWidth / 2, height - 10);
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
    const padding = 40;
    const barWidth = (width - 2 * padding - (data.length - 1) * 10) / data.length;
    const barSpacing = 10;
    
    // Vérifier si la souris est sur une barre
    for (let i = 0; i < data.length; i++) {
      const barX = padding + i * barWidth + i * barSpacing;
      const barHeight = (data[i].value / Math.max(...data.map(d => d.value))) * (canvas.height - 2 * padding);
      const barY = canvas.height - padding - barHeight;
      
      if (x >= barX && x <= barX + barWidth && y >= barY && y <= barY + barHeight) {
        setTooltip({
          show: true,
          x: barX + barWidth / 2,
          y: barY,
          value: data[i].value,
          label: data[i].day
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

export default BarChart;
