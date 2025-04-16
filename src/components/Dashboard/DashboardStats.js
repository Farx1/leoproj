import React from 'react';
import { motion } from 'framer-motion';

const DashboardStats = ({ stats }) => {
  // Fonction pour obtenir l'icône appropriée
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'payments':
        return '💰'; // Icône pour le chiffre d'affaires
      case 'person_add':
        return '👥'; // Icône pour les nouveaux clients
      case 'trending_up':
        return '📈'; // Icône pour le taux de conversion
      case 'confirmation_number':
        return '🎟️'; // Icône pour les tickets ouverts
      default:
        return '📊'; // Icône par défaut
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div 
          key={index} 
          className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-full ${stat.bgColor || 'bg-primary'} bg-opacity-20`}>
                <span className={`text-xl ${(stat.bgColor || 'bg-primary').replace('bg-', 'text-')}`}>{getIcon(stat.icon)}</span>
              </div>
              <div className={`flex items-center text-sm px-2 py-1 rounded-full ${
                (stat.changeType === 'positive' || stat.trend > 0) ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'
              }`}>
                <span className="mr-1">
                  {(stat.changeType === 'positive' || stat.trend > 0) ? '📈' : '📉'}
                </span>
                <span>{stat.change || `${Math.abs(stat.trend || 0)}%`}</span>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">vs période précédente</span>
                <span className={`text-xs font-medium ${
                  (stat.changeType === 'positive' || stat.trend > 0) ? 'text-green-500' : 'text-red-500'
                }`}>
                  {(stat.changeType === 'positive' || stat.trend > 0) ? 'hausse' : 'baisse'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
