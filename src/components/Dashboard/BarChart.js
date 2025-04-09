import React, { useRef, useEffect } from 'react';

const BarChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

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

  return (
    <div className="w-full h-64 relative">
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={250} 
        className="w-full h-full"
      />
    </div>
  );
};

export default BarChart;
