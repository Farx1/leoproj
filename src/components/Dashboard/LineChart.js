import React, { useRef, useEffect } from 'react';

const LineChart = ({ data }) => {
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

export default LineChart;
