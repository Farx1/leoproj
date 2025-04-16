// Données mockées pour le tableau de bord
export const mockDashboardData = {
  // Statistiques générales
  stats: [
    {
      title: "Chiffre d'affaires",
      value: "124 500 €",
      change: "+12.5%",
      changeType: "positive",
      icon: "payments"
    },
    {
      title: "Nouveaux clients",
      value: "45",
      change: "+8.2%",
      changeType: "positive",
      icon: "person_add"
    },
    {
      title: "Taux de conversion",
      value: "3.2%",
      change: "-0.4%",
      changeType: "negative",
      icon: "trending_up"
    },
    {
      title: "Tickets ouverts",
      value: "12",
      change: "-25%",
      changeType: "positive",
      icon: "confirmation_number"
    }
  ],
  
  // Données pour le graphique de revenus
  revenueData: [
    { label: "Jan", value: 12500 },
    { label: "Fév", value: 18200 },
    { label: "Mar", value: 15800 },
    { label: "Avr", value: 21300 },
    { label: "Mai", value: 19700 },
    { label: "Juin", value: 24500 },
    { label: "Juil", value: 28100 },
    { label: "Août", value: 25600 },
    { label: "Sep", value: 29800 },
    { label: "Oct", value: 31200 },
    { label: "Nov", value: 27900 },
    { label: "Déc", value: 34500 }
  ],
  
  // Données pour le graphique d'activité utilisateur
  userActivityData: [
    { label: "Lun", value: 120 },
    { label: "Mar", value: 145 },
    { label: "Mer", value: 132 },
    { label: "Jeu", value: 158 },
    { label: "Ven", value: 167 },
    { label: "Sam", value: 78 },
    { label: "Dim", value: 42 }
  ],
  
  // Données pour le graphique de répartition par département
  departmentData: [
    { label: "Marketing", value: 28 },
    { label: "Ventes", value: 35 },
    { label: "Support", value: 17 },
    { label: "R&D", value: 20 }
  ],
  
  // Tâches récentes
  tasks: [
    {
      id: 1,
      title: "Finaliser la présentation client",
      description: "Préparer les slides pour la réunion avec le client XYZ",
      status: "En cours",
      priority: "Haute",
      assignee: "Jean Dupont",
      dueDate: "2023-07-15T14:00:00",
      tags: ["Présentation", "Client"]
    },
    {
      id: 2,
      title: "Corriger le bug d'affichage",
      description: "Résoudre le problème d'affichage sur la page d'accueil",
      status: "À faire",
      priority: "Critique",
      assignee: "Marie Martin",
      dueDate: "2023-07-12T18:00:00",
      tags: ["Bug", "Frontend"]
    },
    {
      id: 3,
      title: "Mettre à jour la documentation API",
      description: "Ajouter les nouveaux endpoints à la documentation",
      status: "Terminé",
      priority: "Moyenne",
      assignee: "Paul Bernard",
      dueDate: "2023-07-10T12:00:00",
      tags: ["Documentation", "API"]
    },
    {
      id: 4,
      title: "Préparer la facture mensuelle",
      description: "Générer les factures pour les clients premium",
      status: "À faire",
      priority: "Haute",
      assignee: "Sophie Dubois",
      dueDate: "2023-07-31T17:00:00",
      tags: ["Facturation", "Finance"]
    },
    {
      id: 5,
      title: "Réunion d'équipe hebdomadaire",
      description: "Discuter des avancées et des blocages",
      status: "À faire",
      priority: "Normale",
      assignee: "Jean Dupont",
      dueDate: "2023-07-14T10:00:00",
      tags: ["Réunion", "Équipe"]
    }
  ],
  
  // Données de performance
  performanceData: [
    // Données hebdomadaires
    { period: 'week', label: 'Lundi', sales: 42, revenue: 4200, customers: 8, conversion: 2.8 },
    { period: 'week', label: 'Mardi', sales: 38, revenue: 3800, customers: 6, conversion: 2.5 },
    { period: 'week', label: 'Mercredi', sales: 45, revenue: 4500, customers: 9, conversion: 3.0 },
    { period: 'week', label: 'Jeudi', sales: 50, revenue: 5000, customers: 10, conversion: 3.2 },
    { period: 'week', label: 'Vendredi', sales: 55, revenue: 5500, customers: 12, conversion: 3.5 },
    { period: 'week', label: 'Samedi', sales: 30, revenue: 3000, customers: 5, conversion: 2.0 },
    { period: 'week', label: 'Dimanche', sales: 20, revenue: 2000, customers: 3, conversion: 1.5 },
    
    // Données mensuelles
    { period: 'month', label: 'Jan', sales: 320, revenue: 32000, customers: 65, conversion: 2.8 },
    { period: 'month', label: 'Fév', sales: 350, revenue: 35000, customers: 70, conversion: 3.0 },
    { period: 'month', label: 'Mar', sales: 380, revenue: 38000, customers: 75, conversion: 3.2 },
    { period: 'month', label: 'Avr', sales: 420, revenue: 42000, customers: 85, conversion: 3.5 },
    { period: 'month', label: 'Mai', sales: 450, revenue: 45000, customers: 90, conversion: 3.8 },
    { period: 'month', label: 'Juin', sales: 480, revenue: 48000, customers: 95, conversion: 4.0 },
    
    // Données trimestrielles
    { period: 'quarter', label: 'T1', sales: 1050, revenue: 105000, customers: 210, conversion: 3.0 },
    { period: 'quarter', label: 'T2', sales: 1350, revenue: 135000, customers: 270, conversion: 3.8 },
    { period: 'quarter', label: 'T3', sales: 1200, revenue: 120000, customers: 240, conversion: 3.5 },
    { period: 'quarter', label: 'T4', sales: 1500, revenue: 150000, customers: 300, conversion: 4.2 },
    
    // Données annuelles
    { period: 'year', label: '2020', sales: 4200, revenue: 420000, customers: 840, conversion: 3.2 },
    { period: 'year', label: '2021', sales: 4800, revenue: 480000, customers: 960, conversion: 3.5 },
    { period: 'year', label: '2022', sales: 5400, revenue: 540000, customers: 1080, conversion: 3.8 },
    { period: 'year', label: '2023', sales: 6000, revenue: 600000, customers: 1200, conversion: 4.0 }
  ],
  
  // Données d'activité
  activities: [
    {
      id: 1,
      type: 'email',
      title: 'Email envoyé à Client XYZ',
      description: 'Proposition commerciale pour le projet de refonte du site web',
      time: 'Il y a 10 minutes',
      users: [{ id: 1, name: 'Jean Dupont' }]
    },
    {
      id: 2,
      type: 'task',
      title: 'Tâche terminée',
      description: 'Mise à jour de la documentation API',
      time: 'Il y a 45 minutes',
      users: [{ id: 3, name: 'Paul Bernard' }]
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Réunion planifiée',
      description: 'Réunion d\'équipe hebdomadaire',
      time: 'Il y a 1 heure',
      users: [
        { id: 1, name: 'Jean Dupont' },
        { id: 2, name: 'Marie Martin' },
        { id: 3, name: 'Paul Bernard' }
      ]
    },
    {
      id: 4,
      type: 'call',
      title: 'Appel avec Client ABC',
      description: 'Discussion sur les nouvelles fonctionnalités',
      time: 'Il y a 3 heures',
      users: [{ id: 2, name: 'Marie Martin' }]
    },
    {
      id: 5,
      type: 'document',
      title: 'Document créé',
      description: 'Cahier des charges pour le projet DEF',
      time: 'Il y a 5 heures',
      users: [{ id: 4, name: 'Sophie Dubois' }]
    },
    {
      id: 6,
      type: 'email',
      title: 'Email reçu de Fournisseur GHI',
      description: 'Confirmation de commande de matériel',
      time: 'Hier à 16:30',
      users: [{ id: 5, name: 'Thomas Petit' }]
    },
    {
      id: 7,
      type: 'task',
      title: 'Nouvelle tâche assignée',
      description: 'Corriger le bug d\'affichage sur la page d\'accueil',
      time: 'Hier à 14:15',
      users: [{ id: 2, name: 'Marie Martin' }]
    },
    {
      id: 8,
      type: 'meeting',
      title: 'Réunion terminée',
      description: 'Présentation du prototype au client JKL',
      time: 'Hier à 11:00',
      users: [
        { id: 1, name: 'Jean Dupont' },
        { id: 4, name: 'Sophie Dubois' }
      ]
    }
  ],
  
  // Données de projets
  projects: [
    {
      id: 1,
      name: 'Refonte du site web',
      description: 'Modernisation de l\'interface utilisateur et amélioration de l\'expérience utilisateur',
      status: 'En cours',
      deadline: '15 août 2023',
      deadlineDate: '2023-08-15',
      team: [
        { id: 1, name: 'Jean Dupont' },
        { id: 2, name: 'Marie Martin' },
        { id: 3, name: 'Paul Bernard' }
      ],
      tasks: [
        { id: 101, title: 'Maquettes UI/UX', completed: true },
        { id: 102, title: 'Développement frontend', completed: true },
        { id: 103, title: 'Intégration backend', completed: false },
        { id: 104, title: 'Tests utilisateurs', completed: false },
        { id: 105, title: 'Déploiement', completed: false }
      ]
    },
    {
      id: 2,
      name: 'Application mobile',
      description: 'Développement d\'une application mobile pour les clients existants',
      status: 'Planifié',
      deadline: '30 septembre 2023',
      deadlineDate: '2023-09-30',
      team: [
        { id: 2, name: 'Marie Martin' },
        { id: 4, name: 'Sophie Dubois' },
        { id: 5, name: 'Thomas Petit' }
      ],
      tasks: [
        { id: 201, title: 'Analyse des besoins', completed: true },
        { id: 202, title: 'Conception de l\'architecture', completed: false },
        { id: 203, title: 'Développement iOS', completed: false },
        { id: 204, title: 'Développement Android', completed: false },
        { id: 205, title: 'Tests et déploiement', completed: false }
      ]
    },
    {
      id: 3,
      name: 'Migration vers le cloud',
      description: 'Migration de l\'infrastructure vers AWS pour améliorer la scalabilité',
      status: 'Terminé',
      deadline: '1 juillet 2023',
      deadlineDate: '2023-07-01',
      team: [
        { id: 3, name: 'Paul Bernard' },
        { id: 6, name: 'Lucas Moreau' }
      ],
      tasks: [
        { id: 301, title: 'Audit de l\'infrastructure actuelle', completed: true },
        { id: 302, title: 'Planification de la migration', completed: true },
        { id: 303, title: 'Configuration des services AWS', completed: true },
        { id: 304, title: 'Migration des données', completed: true },
        { id: 305, title: 'Tests et validation', completed: true }
      ]
    },
    {
      id: 4,
      name: 'Système de gestion des stocks',
      description: 'Développement d\'un système de gestion des stocks en temps réel',
      status: 'En retard',
      deadline: '10 juillet 2023',
      deadlineDate: '2023-07-10',
      team: [
        { id: 1, name: 'Jean Dupont' },
        { id: 5, name: 'Thomas Petit' },
        { id: 7, name: 'Emma Leroy' }
      ],
      tasks: [
        { id: 401, title: 'Analyse des processus actuels', completed: true },
        { id: 402, title: 'Conception de la base de données', completed: true },
        { id: 403, title: 'Développement du backend', completed: true },
        { id: 404, title: 'Développement de l\'interface', completed: false },
        { id: 405, title: 'Intégration avec l\'ERP', completed: false },
        { id: 406, title: 'Formation des utilisateurs', completed: false }
      ]
    },
    {
      id: 5,
      name: 'Campagne marketing Q3',
      description: 'Planification et exécution de la campagne marketing pour le troisième trimestre',
      status: 'En cours',
      deadline: '31 août 2023',
      deadlineDate: '2023-08-31',
      team: [
        { id: 4, name: 'Sophie Dubois' },
        { id: 7, name: 'Emma Leroy' },
        { id: 8, name: 'Hugo Martin' }
      ],
      tasks: [
        { id: 501, title: 'Analyse du marché', completed: true },
        { id: 502, title: 'Définition des objectifs', completed: true },
        { id: 503, title: 'Création des contenus', completed: true },
        { id: 504, title: 'Planification des canaux', completed: false },
        { id: 505, title: 'Exécution de la campagne', completed: false },
        { id: 506, title: 'Analyse des résultats', completed: false }
      ]
    },
    {
      id: 6,
      name: 'Formation des employés',
      description: 'Programme de formation sur les nouvelles technologies pour les employés',
      status: 'En pause',
      deadline: '15 octobre 2023',
      deadlineDate: '2023-10-15',
      team: [
        { id: 6, name: 'Lucas Moreau' },
        { id: 9, name: 'Camille Dubois' }
      ],
      tasks: [
        { id: 601, title: 'Identification des besoins', completed: true },
        { id: 602, title: 'Création du matériel de formation', completed: true },
        { id: 603, title: 'Planification des sessions', completed: false },
        { id: 604, title: 'Exécution des formations', completed: false },
        { id: 605, title: 'Évaluation et feedback', completed: false }
      ]
    }
  ]
};
