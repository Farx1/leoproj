import React from 'react';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-dark rounded-lg shadow-lg p-6 hover:border-primary transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <div className={`flex items-center mt-2 ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span className="text-sm">
                  {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                </span>
                <span className="text-xs text-gray-400 ml-1">vs dernier mois</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-icons text-primary">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
