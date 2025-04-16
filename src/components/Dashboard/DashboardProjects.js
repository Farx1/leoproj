import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardService from '../../services/dashboardService';

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
            <span className="mr-1">📅</span>
            {project.deadline}
          </div>
          <div className="text-sm text-gray-400">
            <span className="mr-1">✓</span>
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
  
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'Planifié',
    deadline: '',
    deadlineDate: ''
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleViewDetails = async (projectId) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await DashboardService.getProjectDetails(projectId);
      
      if (response.success) {
        setSelectedProject(response.data);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Une erreur est survenue lors du chargement des détails du projet");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateProject = () => {
    setIsCreatingProject(true);
  };
  
  const handleCancelCreate = () => {
    setIsCreatingProject(false);
    setNewProject({
      name: '',
      description: '',
      status: 'Planifié',
      deadline: '',
      deadlineDate: ''
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Si c'est la date d'échéance, mettre à jour à la fois le format lisible et la date ISO
    if (name === 'deadline') {
      const dateObj = new Date(value);
      setNewProject(prev => ({
        ...prev,
        deadline: dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        deadlineDate: value
      }));
    } else {
      setNewProject(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Validation de base
      if (!newProject.name || !newProject.description || !newProject.deadline) {
        setError("Veuillez remplir tous les champs obligatoires");
        return;
      }
      
      const response = await DashboardService.createProject(newProject);
      
      if (response.success) {
        // Dans une vraie application, on mettrait à jour la liste des projets
        // Pour l'instant, on simule juste la réussite
        setIsCreatingProject(false);
        onRefresh(); // Actualiser la liste des projets
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la création du projet");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const closeProjectDetails = () => {
    setSelectedProject(null);
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
            <span className="mr-2">🔄</span>
            <span>Actualiser</span>
          </button>
          <button 
            onClick={handleCreateProject}
            className="flex items-center px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="mr-2">➕</span>
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
              <span className="absolute right-3 top-2 text-gray-400 pointer-events-none">
                ↕️
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
              <span className="absolute left-3 top-2 text-gray-400">🔍</span>
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
          <span className="text-4xl text-gray-400 mb-2">📂❌</span>
          <h3 className="text-xl font-bold text-white mb-2">Aucun projet trouvé</h3>
          <p className="text-gray-400">
            Aucun projet ne correspond à vos critères de recherche ou de filtrage.
          </p>
        </div>
      )}
      {/* Modal de création de projet */}
      {isCreatingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-light rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Nouveau projet</h3>
            
            {error && (
              <div className="bg-red-500 bg-opacity-20 text-red-500 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmitProject}>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Nom du projet *</label>
                <input
                  type="text"
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  className="w-full bg-dark-darker border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="w-full bg-dark-darker border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary h-24"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Statut</label>
                <select
                  name="status"
                  value={newProject.status}
                  onChange={handleInputChange}
                  className="w-full bg-dark-darker border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Planifié">Planifié</option>
                  <option value="En cours">En cours</option>
                  <option value="En pause">En pause</option>
                  <option value="Terminé">Terminé</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Date d'échéance *</label>
                <input
                  type="date"
                  name="deadline"
                  value={newProject.deadlineDate}
                  onChange={handleInputChange}
                  className="w-full bg-dark-darker border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancelCreate}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">🔄</span>
                      <span>Création...</span>
                    </>
                  ) : (
                    <span>Créer le projet</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      {/* Modal de détails du projet */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-light rounded-xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-white">{selectedProject.name}</h3>
                  <span className={`ml-3 px-2 py-1 rounded-md text-xs font-medium text-white ${
                    selectedProject.status === 'En cours' ? 'bg-blue-500' :
                    selectedProject.status === 'Terminé' ? 'bg-green-500' :
                    selectedProject.status === 'En retard' ? 'bg-red-500' :
                    selectedProject.status === 'En pause' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`}>
                    {selectedProject.status}
                  </span>
                </div>
                <p className="text-gray-400 mt-1">Échéance: {selectedProject.deadline}</p>
              </div>
              <button 
                onClick={closeProjectDetails}
                className="text-gray-400 hover:text-white"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
              <p className="text-gray-300">{selectedProject.description}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Progression</h4>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-400">
                  {selectedProject.tasks.filter(task => task.completed).length}/{selectedProject.tasks.length} tâches complétées
                </span>
                <span className="text-white font-medium">
                  {selectedProject.tasks.length > 0
                    ? Math.round((selectedProject.tasks.filter(task => task.completed).length / selectedProject.tasks.length) * 100)
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ 
                    width: `${selectedProject.tasks.length > 0
                      ? Math.round((selectedProject.tasks.filter(task => task.completed).length / selectedProject.tasks.length) * 100)
                      : 0}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Équipe</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.team.map((member, index) => (
                  <div 
                    key={index}
                    className="flex items-center bg-dark-darker px-3 py-2 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white mr-2">
                      {member.name.charAt(0)}
                    </div>
                    <span className="text-gray-300">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Tâches</h4>
              <div className="space-y-2">
                {selectedProject.tasks.map((task, index) => (
                  <div 
                    key={index}
                    className="flex items-center bg-dark-darker p-3 rounded-lg"
                  >
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                      task.completed ? 'bg-green-500' : 'border-2 border-gray-600'
                    }`}>
                      {task.completed && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={closeProjectDetails}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardProjects;
