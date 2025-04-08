import api from './api';

// Données mockées pour le développement
const mockEmployees = [
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

const EmployeeService = {
  // Récupérer tous les employés
  getAll: async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockEmployees };
      } else {
        return await api.get('/employees');
      }
    } catch (error) {
      throw error;
    }
  },

  // Récupérer un employé par son ID
  getById: async (id) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 300));
        const employee = mockEmployees.find(emp => emp.id === id);
        if (!employee) {
          throw new Error('Employé non trouvé');
        }
        return { data: employee };
      } else {
        return await api.get(`/employees/${id}`);
      }
    } catch (error) {
      throw error;
    }
  },

  // Créer un nouvel employé
  create: async (employeeData) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newEmployee = {
          ...employeeData,
          id: `EMP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          joinDate: new Date().toISOString().split('T')[0]
        };
        mockEmployees.push(newEmployee);
        return { data: newEmployee };
      } else {
        return await api.post('/employees', employeeData);
      }
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour un employé
  update: async (id, employeeData) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockEmployees.findIndex(emp => emp.id === id);
        if (index === -1) {
          throw new Error('Employé non trouvé');
        }
        mockEmployees[index] = { ...mockEmployees[index], ...employeeData };
        return { data: mockEmployees[index] };
      } else {
        return await api.put(`/employees/${id}`, employeeData);
      }
    } catch (error) {
      throw error;
    }
  },

  // Supprimer un employé
  delete: async (id) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockEmployees.findIndex(emp => emp.id === id);
        if (index === -1) {
          throw new Error('Employé non trouvé');
        }
        mockEmployees.splice(index, 1);
        return { data: { success: true } };
      } else {
        return await api.delete(`/employees/${id}`);
      }
    } catch (error) {
      throw error;
    }
  }
};

export default EmployeeService;
