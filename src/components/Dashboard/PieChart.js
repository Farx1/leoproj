import React, { useRef, useEffect, useState } from 'react';

const PieChart = ({ data, title = "Répartition par département" }) => {
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

  // Gestion du survol
  const handleMouseMove = (e) => {
    if (!canvasRef.current || !data || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 40;
    
    // Distance du centre
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    
    if (distance <= radius) {
      // Calculer l'angle
      let angle = Math.atan2(y - centerY, x - centerX);
      if (angle < 0) angle += 2 * Math.PI;
      
      // Trouver le segment correspondant
      let total = data.reduce((sum, item) => sum + item.value, 0);
      let currentAngle = 0;
      
      for (let i = 0; i < data.length; i++) {
        const sliceAngle = (data[i].value / total) * 2 * Math.PI;
        if (angle >= currentAngle && angle <= currentAngle + sliceAngle) {
          const tooltipX = centerX + Math.cos(currentAngle + sliceAngle / 2) * (radius / 1.5);
          const tooltipY = centerY + Math.sin(currentAngle + sliceAngle / 2) * (radius / 1.5);
          
          setTooltip({
            show: true,
            x: tooltipX,
            y: tooltipY,
            value: data[i].value,
            label: data[i].label
          });
          return;
        }
        currentAngle += sliceAngle;
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
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="font-bold">{tooltip.label}</div>
          <div>{tooltip.value.toLocaleString()} ({((tooltip.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)</div>
        </div>
      )}
    </div>
  );
};

export default PieChart;
