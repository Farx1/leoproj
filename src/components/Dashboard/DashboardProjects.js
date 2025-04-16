import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Composant pour afficher un projet individuel
 */
const ProjectCard = ({ project, onViewDetails }) => {
  // Calculer le pourcentage d'avancement
  const progress = project.tasks.length > 0
    ? Math.round((project.tasks.filter(task => task.completed).length / project.tasks.length) * 100)
    : 0;
  
  // Déterminer la couleur en fonction du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours':
        return 'bg-blue-500';
      case 'Terminé':
        return 'bg-green-500';
      case 'En retard':
        return 'bg-red-500';
      case 'En pause':
        return 'bg-yellow-500';
      case 'Planifié':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-dark-darker rounded-xl shadow-lg border border-gray-800 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{project.name}</h3>
          <span className={`px-2 py-1 rounded-md text-xs font-medium text-white ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4 h-12 overflow-hidden">{project.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-400">Progression</span>
            <span className="text-sm text-white">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-400">
            <span className="material-icons text-sm mr-1 align-text-bottom">calendar_today</span>
            {project.deadline}
          </div>
          <div className="text-sm text-gray-400">
            <span className="material-icons text-sm mr-1 align-text-bottom">task_alt</span>
            {project.tasks.filter(task => task.completed).length}/{project.tasks.length} tâches
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, index) => (
              <div 
                key={index}
                className="w-8 h-8 rounded-full bg-gray-600 border-2 border-dark-darker flex items-center justify-center text-xs text-white"
                title={member.name}
              >
                {member.name.charAt(0)}
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-dark-darker flex items-center justify-center text-xs text-white">
                +{project.team.length - 3}
              </div>
            )}
          </div>
          
          <button
            onClick={() => onViewDetails(project.id)}
            className="px-3 py-1 bg-primary rounded-md text-white text-sm hover:bg-primary-dark transition-colors"
          >
            Détails
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Composant pour l'onglet Projets du tableau de bord
 */
const DashboardProjects = ({ projects, onRefresh }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  
  // Filtrer et trier les projets
  const filteredProjects = React.useMemo(() => {
    if (!projects) return [];
    
    return projects
      .filter(project => {
        if (filter === 'all') return true;
        return project.status === filter;
      })
      .filter(project => {
        if (!searchTerm) return true;
        return (
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'deadline':
            return new Date(a.deadlineDate) - new Date(b.deadlineDate);
          case 'progress':
            const progressA = a.tasks.length > 0
              ? (a.tasks.filter(task => task.completed).length / a.tasks.length)
              : 0;
            const progressB = b.tasks.length > 0
              ? (b.tasks.filter(task => task.completed).length / b.tasks.length)
              : 0;
            return progressB - progressA;
          default:
            return 0;
        }
      });
  }, [projects, filter, searchTerm, sortBy]);
  
  const handleViewDetails = (projectId) => {
    console.log(`Voir les détails du projet ${projectId}`);
    // Implémenter la navigation vers la page de détails du projet
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* En-tête avec bouton d'actualisation */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des projets</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onRefresh}
            className="flex items-center px-4 py-2 bg-primary rounded-lg hover:bg-primary-dark transition-colors"
          >
            <span className="material-icons mr-2">refresh</span>
            <span>Actualiser</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
            <span className="material-icons mr-2">add</span>
            <span>Nouveau projet</span>
          </button>
        </div>
      </div>
      
      {/* Filtres, tri et recherche */}
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
              onClick={() => setFilter('En cours')}
              className={`px-3 py-1 rounded-md ${
                filter === 'En cours' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              En cours
            </button>
            <button
              onClick={() => setFilter('Terminé')}
              className={`px-3 py-1 rounded-md ${
                filter === 'Terminé' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Terminés
            </button>
            <button
              onClick={() => setFilter('En retard')}
              className={`px-3 py-1 rounded-md ${
                filter === 'En retard' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              En retard
            </button>
            <button
              onClick={() => setFilter('Planifié')}
              className={`px-3 py-1 rounded-md ${
                filter === 'Planifié' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Planifiés
            </button>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-dark-darker border border-gray-700 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                <option value="deadline">Date d'échéance</option>
                <option value="name">Nom</option>
                <option value="progress">Progression</option>
              </select>
              <span className="material-icons absolute right-3 top-2 text-gray-400 pointer-events-none">
                sort
              </span>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-dark-darker border border-gray-700 rounded-lg py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="material-icons absolute left-3 top-2 text-gray-400">search</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grille de projets */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              onViewDetails={handleViewDetails} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-dark-light p-8 rounded-xl shadow-lg border border-gray-800 text-center">
          <span className="material-icons text-4xl text-gray-400 mb-2">folder_off</span>
          <h3 className="text-xl font-bold text-white mb-2">Aucun projet trouvé</h3>
          <p className="text-gray-400">
            Aucun projet ne correspond à vos critères de recherche ou de filtrage.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardProjects;
