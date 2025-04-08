import React, { useEffect, useRef } from 'react';

const PieChart = ({ data, title }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Draw pie segments
    let startAngle = -0.5 * Math.PI; // Start at top
    
    const colors = [
      '#6366f1', // Indigo
      '#8b5cf6', // Violet
      '#ec4899', // Pink
      '#f43f5e', // Rose
      '#f97316', // Orange
      '#eab308', // Yellow
    ];
    
    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      
      // Draw slice
      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      
      // Calculate label position
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);
      
      // Draw percentage label if slice is big enough
      if (sliceAngle > 0.2) {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round((item.value / total) * 100)}%`, labelX, labelY);
      }
      
      startAngle = endAngle;
    });
    
    // Draw center circle (donut style)
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }, [data]);

  return (
    <div className="bg-dark rounded-lg shadow-lg p-6">
      <h3 className="text-white text-lg font-medium mb-4">{title}</h3>
      <div className="flex flex-col md:flex-row items-center">
        <canvas 
          ref={canvasRef} 
          width="200" 
          height="200" 
          className="mb-4 md:mb-0"
        ></canvas>
        <div className="md:ml-4 flex flex-col space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ 
                  backgroundColor: [
                    '#6366f1', '#8b5cf6', '#ec4899', 
                    '#f43f5e', '#f97316', '#eab308'
                  ][index % 6] 
                }}
              ></div>
              <span className="text-gray-400 text-sm">{item.label}</span>
              <span className="text-white text-sm ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
