import React from 'react';
import { motion } from 'framer-motion';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div 
          key={index} 
          className="card-dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className={`text-sm mt-2 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} {stat.changeType === 'positive' ? '↑' : '↓'}
              </p>
            </div>
            <div className="bg-primary/20 p-3 rounded-full">
              <span className="material-icons text-primary">{stat.icon}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
