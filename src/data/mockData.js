// Mock data for the entire application

// Mock Users
export const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    roles: ['admin'],
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Manager User',
    roles: ['manager'],
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    roles: ['user'],
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

// Mock Employees
export const mockEmployees = [
  {
    id: 'EMP001',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    position: 'Développeur Senior',
    department: 'IT',
    status: 'Actif',
    joinDate: '2020-03-15',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 'EMP002',
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    position: 'Chef de Projet',
    department: 'IT',
    status: 'Actif',
    joinDate: '2019-06-22',
    phone: '+33 6 23 45 67 89',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 'EMP003',
    name: 'Pierre Durand',
    email: 'pierre.durand@example.com',
    position: 'Responsable Marketing',
    department: 'Marketing',
    status: 'Actif',
    joinDate: '2021-01-10',
    phone: '+33 6 34 56 78 90',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 'EMP004',
    name: 'Sophie Leroy',
    email: 'sophie.leroy@example.com',
    position: 'Analyste Financier',
    department: 'Finance',
    status: 'Actif',
    joinDate: '2018-11-05',
    phone: '+33 6 45 67 89 01',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: 'EMP005',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@example.com',
    position: 'Responsable RH',
    department: 'RH',
    status: 'En congé',
    joinDate: '2017-08-30',
    phone: '+33 6 56 78 90 12',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
];

// Mock Emails
export const mockEmails = [
  {
    id: 'email001',
    from: {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    to: 'moi@example.com',
    subject: 'Réunion de projet',
    body: 'Bonjour,\n\nJe vous invite à une réunion de projet demain à 14h dans la salle de conférence.\n\nCordialement,\nJean',
    date: '2023-04-05T10:30:00',
    read: true,
    folder: 'inbox',
    attachments: []
  },
  {
    id: 'email002',
    from: {
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    to: 'moi@example.com',
    subject: 'Rapport trimestriel',
    body: 'Bonjour,\n\nVeuillez trouver ci-joint le rapport trimestriel.\n\nBien cordialement,\nMarie',
    date: '2023-04-04T15:45:00',
    read: false,
    folder: 'inbox',
    attachments: [
      { name: 'rapport_q1_2023.pdf', size: '2.4 MB' }
    ]
  },
  {
    id: 'email003',
    from: {
      name: 'Pierre Durand',
      email: 'pierre.durand@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    to: 'moi@example.com',
    subject: 'Nouvelle campagne marketing',
    body: 'Bonjour,\n\nJ\'aimerais discuter avec vous de la nouvelle campagne marketing.\n\nÀ bientôt,\nPierre',
    date: '2023-04-03T09:15:00',
    read: true,
    folder: 'inbox',
    attachments: []
  },
  {
    id: 'email004',
    from: {
      name: 'moi@example.com',
      email: 'moi@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    to: 'sophie.leroy@example.com',
    subject: 'Demande de congés',
    body: 'Bonjour Sophie,\n\nJe souhaiterais poser des congés du 15 au 20 mai.\n\nMerci d\'avance,\nMoi',
    date: '2023-04-02T11:20:00',
    read: true,
    folder: 'sent',
    attachments: []
  },
  {
    id: 'email005',
    from: {
      name: 'Thomas Bernard',
      email: 'thomas.bernard@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    to: 'moi@example.com',
    subject: 'Entretien annuel',
    body: 'Bonjour,\n\nJe vous rappelle que votre entretien annuel est prévu le 10 avril à 10h.\n\nCordialement,\nThomas',
    date: '2023-04-01T14:00:00',
    read: true,
    folder: 'inbox',
    attachments: [
      { name: 'formulaire_entretien.docx', size: '1.2 MB' }
    ]
  }
];

// Mock Dashboard Data
export const mockDashboardData = {
  stats: [
    { 
      title: 'Total Employés', 
      value: '124', 
      change: '+12%', 
      changeType: 'positive',
      icon: 'group'
    },
    { 
      title: 'Projets Actifs', 
      value: '42', 
      change: '+7%', 
      changeType: 'positive',
      icon: 'assignment'
    },
    { 
      title: 'Taux de Complétion', 
      value: '78%', 
      change: '+5%', 
      changeType: 'positive',
      icon: 'check_circle'
    },
    { 
      title: 'Budget Utilisé', 
      value: '68%', 
      change: '-3%', 
      changeType: 'negative',
      icon: 'account_balance'
    }
  ],
  revenueData: [
    { month: 'Jan', value: 65000 },
    { month: 'Fév', value: 78000 },
    { month: 'Mar', value: 92000 },
    { month: 'Avr', value: 85000 },
    { month: 'Mai', value: 110000 },
    { month: 'Juin', value: 125000 },
    { month: 'Juil', value: 105000 },
    { month: 'Août', value: 130000 },
    { month: 'Sep', value: 118000 },
    { month: 'Oct', value: 145000 },
    { month: 'Nov', value: 140000 },
    { month: 'Déc', value: 160000 }
  ],
  userActivityData: [
    { day: 'Lun', value: 120 },
    { day: 'Mar', value: 145 },
    { day: 'Mer', value: 135 },
    { day: 'Jeu', value: 160 },
    { day: 'Ven', value: 180 },
    { day: 'Sam', value: 80 },
    { day: 'Dim', value: 60 }
  ],
  departmentData: [
    { name: 'IT', value: 35 },
    { name: 'Marketing', value: 25 },
    { name: 'Finance', value: 20 },
    { name: 'RH', value: 15 },
    { name: 'Autres', value: 5 }
  ],
  tasks: [
    {
      id: 1,
      title: 'Mise à jour du site web',
      status: 'En cours',
      assignee: 'Jean Dupont',
      dueDate: '2025-04-20'
    },
    {
      id: 2,
      title: 'Rapport financier mensuel',
      status: 'Terminé',
      assignee: 'Marie Martin',
      dueDate: '2025-04-10'
    },
    {
      id: 3,
      title: 'Recrutement développeur frontend',
      status: 'En attente',
      assignee: 'Sophie Lefebvre',
      dueDate: '2025-04-25'
    },
    {
      id: 4,
      title: 'Préparation réunion clients',
      status: 'Retard',
      assignee: 'Pierre Dubois',
      dueDate: '2025-04-12'
    },
    {
      id: 5,
      title: 'Mise à jour logiciel comptabilité',
      status: 'En cours',
      assignee: 'Jean Dupont',
      dueDate: '2025-04-30'
    }
  ]
};
