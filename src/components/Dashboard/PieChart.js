import React, { useState } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PieChart = ({ data, title = "Répartition par département" }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Couleurs pour les segments
  const COLORS = [
    '#4F46E5', // Indigo
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#8B5CF6', // Violet
    '#EC4899'  // Pink
  ];

  // Formater les données pour Recharts
  const chartData = data.map(item => ({
    name: item.label || item.name,
    value: item.value
  }));

  // Calculer le total
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Personnalisation du tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-dark-darker text-white px-3 py-2 rounded-md shadow-lg">
          <p className="font-bold">{payload[0].name}</p>
          <p>{`${payload[0].value.toLocaleString()} (${percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  // Personnalisation de la légende
  const renderCustomizedLegend = (props) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-2">
        {payload.map((entry, index) => (
          <li 
            key={`item-${index}`} 
            className="flex items-center cursor-pointer"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            style={{ opacity: activeIndex === null || activeIndex === index ? 1 : 0.5 }}
          >
            <div 
              className="w-3 h-3 mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-300">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold text-white mb-2 text-center">{title}</h3>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationDuration={1500}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                if (percent < 0.05) return null;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
                const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                return (
                  <text 
                    x={x} 
                    y={y} 
                    fill="white" 
                    textAnchor="middle" 
                    dominantBaseline="central"
                    fontSize={12}
                    fontWeight="bold"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              content={renderCustomizedLegend} 
              verticalAlign="bottom" 
              align="center"
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
