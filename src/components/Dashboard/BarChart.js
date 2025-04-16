import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BarChart = ({ data, title = "Répartition mensuelle du chiffre d'affaires" }) => {
  // Formater les données pour Recharts
  const chartData = data.map(item => ({
    name: item.label || item.day,
    value: item.value
  }));

  // Personnalisation du tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-darker text-white px-3 py-2 rounded-md shadow-lg">
          <p className="font-bold">{label}</p>
          <p>{`${payload[0].value.toLocaleString()} €`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold text-white mb-2 text-center">{title}</h3>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <RechartsBarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
