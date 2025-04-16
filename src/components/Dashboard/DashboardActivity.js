import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Composant pour afficher une activité individuelle
 */
const ActivityItem = ({ activity }) => {
  const getIconByType = (type) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'task':
        return '✅';
      case 'meeting':
        return '📅';
      case 'call':
        return '📞';
      case 'document':
        return '📄';
      default:
        return 'ℹ️';
    }
  };

  const getColorByType = (type) => {
    switch (type) {
      case 'email':
        return 'bg-blue-500';
      case 'task':
        return 'bg-green-500';
      case 'meeting':
        return 'bg-purple-500';
      case 'call':
        return 'bg-yellow-500';
      case 'document':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start space-x-4 p-4 border-b border-gray-700"
    >
      <div className={`p-2 rounded-full ${getColorByType(activity.type)}`}>
        <span className="text-white text-xl">{getIconByType(activity.type)}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-white">{activity.title}</h4>
          <span className="text-sm text-gray-400">{activity.time}</span>
        </div>
        <p className="text-gray-300 mt-1">{activity.description}</p>
        {activity.users && activity.users.length > 0 && (
          <div className="flex mt-2">
            {activity.users.map((user, index) => (
              <div key={index} className="flex items-center mr-3">
                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white mr-1">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm text-gray-400">{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Composant pour l'onglet Activité du tableau de bord
 */
const DashboardActivity = ({ activities, onRefresh }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrer les activités en fonction du filtre et du terme de recherche
  const filteredActivities = React.useMemo(() => {
    if (!activities) return [];
    
    return activities
      .filter(activity => {
        if (filter === 'all') return true;
        return activity.type === filter;
      })
      .filter(activity => {
        if (!searchTerm) return true;
        return (
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }, [activities, filter, searchTerm]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* En-tête avec bouton d'actualisation */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Journal d'activité</h2>
        <button 
          onClick={onRefresh}
          className="flex items-center px-4 py-2 bg-primary rounded-lg hover:bg-primary-dark transition-colors"
        >
          <span className="mr-2">🔄</span>
          <span>Actualiser</span>
        </button>
      </div>
      
      {/* Filtres et recherche */}
      <div className="bg-dark-light p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter('email')}
              className={`px-3 py-1 rounded-md ${
                filter === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Emails
            </button>
            <button
              onClick={() => setFilter('task')}
              className={`px-3 py-1 rounded-md ${
                filter === 'task' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Tâches
            </button>
            <button
              onClick={() => setFilter('meeting')}
              className={`px-3 py-1 rounded-md ${
                filter === 'meeting' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Réunions
            </button>
            <button
              onClick={() => setFilter('call')}
              className={`px-3 py-1 rounded-md ${
                filter === 'call' ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Appels
            </button>
            <button
              onClick={() => setFilter('document')}
              className={`px-3 py-1 rounded-md ${
                filter === 'document' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Documents
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-dark-darker border border-gray-700 rounded-lg py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="absolute left-3 top-2 text-gray-400">🔍</span>
          </div>
        </div>
      </div>
      
      {/* Liste des activités */}
      <div className="bg-dark-light rounded-xl shadow-lg border border-gray-800">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Activités récentes</h3>
          <p className="text-gray-400 mt-1">
            {filteredActivities.length} activité{filteredActivities.length !== 1 ? 's' : ''} trouvée{filteredActivities.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="max-h-[600px] overflow-y-auto">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))
          ) : (
            <div className="p-8 text-center text-gray-400">
              <span className="text-4xl mb-2">🔍❌</span>
              <p>Aucune activité ne correspond à vos critères.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardActivity;
