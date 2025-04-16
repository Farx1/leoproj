import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart = ({ data, title = "Évolution des ventes mensuelles" }) => {
  // Formater les données pour Recharts
  const chartData = data.map(item => ({
    name: item.label || item.month,
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
          <RechartsLineChart
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
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4F46E5" 
              strokeWidth={2} 
              dot={{ r: 4, fill: '#4F46E5', stroke: '#fff', strokeWidth: 1 }}
              activeDot={{ r: 6, fill: '#4F46E5', stroke: '#fff', strokeWidth: 2 }}
              animationDuration={1500}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
