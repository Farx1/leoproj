// Service pour gérer les fonctionnalités du tableau de bord
import { mockDashboardData } from '../data/mockDashboardData';

const DashboardService = {
  // Récupérer toutes les données du tableau de bord
  getAllData: async () => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockDashboardData;
  },
  
  // Filtrer les projets par statut
  filterProjects: (projects, status) => {
    if (status === 'all') return projects;
    return projects.filter(project => project.status === status);
  },
  
  // Rechercher des projets
  searchProjects: (projects, term) => {
    if (!term) return projects;
    const searchTerm = term.toLowerCase();
    return projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm) || 
      project.description.toLowerCase().includes(searchTerm)
    );
  },
  
  // Trier les projets
  sortProjects: (projects, sortBy) => {
    return [...projects].sort((a, b) => {
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
  },
  
  // Filtrer les activités
  filterActivities: (activities, type) => {
    if (type === 'all') return activities;
    return activities.filter(activity => activity.type === type);
  },
  
  // Rechercher des activités
  searchActivities: (activities, term) => {
    if (!term) return activities;
    const searchTerm = term.toLowerCase();
    return activities.filter(activity => 
      activity.title.toLowerCase().includes(searchTerm) || 
      activity.description.toLowerCase().includes(searchTerm)
    );
  },
  
  // Filtrer les données de performance par période
  filterPerformanceData: (data, period) => {
    return data.filter(item => item.period === period);
  },
  
  // Créer un nouveau projet
  createProject: async (projectData) => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Dans une vraie application, ce serait un appel API
    const newProject = {
      id: Date.now(),
      ...projectData,
      tasks: [],
      team: []
    };
    
    return { success: true, data: newProject };
  },
  
  // Voir les détails d'un projet
  getProjectDetails: async (projectId) => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Dans une vraie application, ce serait un appel API
    const project = mockDashboardData.projects.find(p => p.id === projectId);
    
    if (!project) {
      return { success: false, error: 'Projet non trouvé' };
    }
    
    return { success: true, data: project };
  }
};

export default DashboardService;
