import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RecentTasks = ({ tasks }) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filters, setFilters] = useState({
    status: 'all',
    assignee: 'all',
    date: 'all'
  });

  // Statuts avec leurs couleurs harmonisées
  const statusColors = {
    'Terminé': 'bg-green-500',
    'En cours': 'bg-orange-500',
    'En attente': 'bg-blue-500',
    'Retard': 'bg-red-500'
  };

  // Appliquer les filtres
  const applyFilters = () => {
    let result = [...tasks];
    
    if (filters.status !== 'all') {
      result = result.filter(task => task.status === filters.status);
    }
    
    if (filters.assignee !== 'all') {
      result = result.filter(task => task.assignee === filters.assignee);
    }
    
    if (filters.date !== 'all') {
      const today = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      
      switch (filters.date) {
        case 'today':
          result = result.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.toDateString() === today.toDateString();
          });
          break;
        case 'week':
          result = result.filter(task => {
            const taskDate = new Date(task.dueDate);
            const diffDays = Math.round(Math.abs((taskDate - today) / oneDay));
            return diffDays <= 7;
          });
          break;
        case 'month':
          result = result.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.getMonth() === today.getMonth() && 
                   taskDate.getFullYear() === today.getFullYear();
          });
          break;
        default:
          break;
      }
    }
    
    setFilteredTasks(result);
  };

  // Mettre à jour les filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Appliquer les filtres quand ils changent
  React.useEffect(() => {
    applyFilters();
  }, [filters]);

  // Extraire les assignés uniques pour le filtre
  const uniqueAssignees = [...new Set(tasks.map(task => task.assignee))];

  // Gérer les actions sur les tâches
  const handleEditTask = (taskId) => {
    console.log(`Éditer la tâche ${taskId}`);
    // Implémenter la logique d'édition
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      console.log(`Supprimer la tâche ${taskId}`);
      // Implémenter la logique de suppression
    }
  };

  return (
    <div className="bg-dark-light rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Tâches Récentes</h2>
      
      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Statut</label>
          <select 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange}
            className="w-full bg-dark-darker text-white p-2 rounded"
          >
            <option value="all">Tous les statuts</option>
            {Object.keys(statusColors).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Assigné à</label>
          <select 
            name="assignee" 
            value={filters.assignee} 
            onChange={handleFilterChange}
            className="w-full bg-dark-darker text-white p-2 rounded"
          >
            <option value="all">Tous les assignés</option>
            {uniqueAssignees.map(assignee => (
              <option key={assignee} value={assignee}>{assignee}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Date d'échéance</label>
          <select 
            name="date" 
            value={filters.date} 
            onChange={handleFilterChange}
            className="w-full bg-dark-darker text-white p-2 rounded"
          >
            <option value="all">Toutes les dates</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
        </div>
      </div>
      
      {/* Liste des tâches */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-center py-4 text-gray-400">Aucune tâche ne correspond aux filtres sélectionnés</p>
        ) : (
          filteredTasks.map((task, index) => (
            <motion.div 
              key={task.id} 
              className="bg-dark-darker p-3 rounded flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${statusColors[task.status]}`}></div>
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-400">
                    Assigné à: {task.assignee} | Échéance: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditTask(task.id)}
                  className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                  title="Éditer"
                >
                  <span className="material-icons text-sm">edit</span>
                </button>
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  title="Supprimer"
                >
                  <span className="material-icons text-sm">delete</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
