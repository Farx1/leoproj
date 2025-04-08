import React, { useEffect, useRef } from 'react';

const BarChart = ({ data, title }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / data.length - 10;
    const maxValue = Math.max(...data.map(item => item.value));
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw bars
    data.forEach((item, index) => {
      const x = index * (barWidth + 10) + 10;
      const barHeight = (item.value / maxValue) * (height - 60);
      const y = height - barHeight - 30;
      
      // Draw bar
      const gradient = ctx.createLinearGradient(0, y, 0, height - 30);
      gradient.addColorStop(0, '#6366f1');
      gradient.addColorStop(1, '#4f46e5');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Polyfill pour roundRect si non supporté
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barWidth, barHeight, 4);
      } else {
        // Fallback pour les navigateurs qui ne supportent pas roundRect
        ctx.moveTo(x + 4, y);
        ctx.lineTo(x + barWidth - 4, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + 4);
        ctx.lineTo(x + barWidth, y + barHeight - 4);
        ctx.quadraticCurveTo(x + barWidth, y + barHeight, x + barWidth - 4, y + barHeight);
        ctx.lineTo(x + 4, y + barHeight);
        ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - 4);
        ctx.lineTo(x, y + 4);
        ctx.quadraticCurveTo(x, y, x + 4, y);
      }
      
      ctx.fill();
      
      // Draw value
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.value, x + barWidth / 2, y - 5);
      
      // Draw label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + barWidth / 2, height - 10);
    });
  }, [data]);

  return (
    <div className="bg-dark rounded-lg shadow-lg p-6">
      <h3 className="text-white text-lg font-medium mb-4">{title}</h3>
      <canvas 
        ref={canvasRef} 
        width="500" 
        height="200" 
        className="w-full h-auto"
      ></canvas>
    </div>
  );
};

export default BarChart;
