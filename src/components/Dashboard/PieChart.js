import React, { useRef, useEffect } from 'react';

const PieChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    // Effacer le canvas
    ctx.clearRect(0, 0, width, height);

    // Couleurs pour les segments
    const colors = [
      '#4F46E5', // Indigo
      '#10B981', // Emerald
      '#F59E0B', // Amber
      '#EF4444', // Red
      '#3B82F6', // Blue
      '#8B5CF6', // Violet
      '#EC4899'  // Pink
    ];

    // Calculer le total
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Dessiner le graphique
    let startAngle = -Math.PI / 2; // Commencer en haut

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      
      // Dessiner le segment
      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      
      // Calculer la position du texte
      const midAngle = startAngle + sliceAngle / 2;
      const textRadius = radius * 0.7;
      const textX = centerX + Math.cos(midAngle) * textRadius;
      const textY = centerY + Math.sin(midAngle) * textRadius;
      
      // Dessiner le pourcentage
      const percentage = Math.round((item.value / total) * 100);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (percentage > 5) { // Ne pas afficher le texte pour les petits segments
        ctx.fillText(`${percentage}%`, textX, textY);
      }
      
      startAngle = endAngle;
    });

    // Dessiner la légende
    const legendX = width - 120;
    const legendY = 20;
    
    data.forEach((item, index) => {
      const y = legendY + index * 25;
      
      // Carré de couleur
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(legendX, y, 15, 15);
      
      // Texte
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.name, legendX + 25, y + 7.5);
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

export default PieChart;
