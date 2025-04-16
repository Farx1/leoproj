// Importation du service API sans dépendance à axios
import api from './api';

// Données mockées temporaires (à déplacer dans un fichier séparé plus tard)
const mockEmployees = [
  {
    id: "EMP001",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    position: "Développeur Frontend",
    department: "IT",
    status: "Actif",
    joinDate: "2020-03-15",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de la Paix, Paris",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "EMP002",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    position: "Chef de Projet",
    department: "IT",
    status: "Actif",
    joinDate: "2019-06-22",
    phone: "+33 6 23 45 67 89",
    address: "456 Avenue des Champs-Élysées, Paris",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "EMP003",
    name: "Pierre Bernard",
    email: "pierre.bernard@example.com",
    position: "Responsable Marketing",
    department: "Marketing",
    status: "Actif",
    joinDate: "2021-01-10",
    phone: "+33 6 34 56 78 90",
    address: "789 Boulevard Haussmann, Paris",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "EMP004",
    name: "Sophie Petit",
    email: "sophie.petit@example.com",
    position: "Analyste Financier",
    department: "Finance",
    status: "Congé",
    joinDate: "2018-11-05",
    phone: "+33 6 45 67 89 01",
    address: "101 Rue de Rivoli, Paris",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "EMP005",
    name: "Thomas Leroy",
    email: "thomas.leroy@example.com",
    position: "Développeur Backend",
    department: "IT",
    status: "Actif",
    joinDate: "2020-09-18",
    phone: "+33 6 56 78 90 12",
    address: "202 Rue Saint-Honoré, Paris",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const EmployeeService = {
  // Récupérer tous les employés
  getAll: async () => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      return { data: mockEmployees };
    } catch (error) {
      throw error;
    }
  },

  // Récupérer un employé par son ID
  getById: async (id) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      const employee = mockEmployees.find(emp => emp.id === id);
      if (!employee) {
        throw new Error('Employé non trouvé');
      }
      return { data: employee };
    } catch (error) {
      throw error;
    }
  },

  // Créer un nouvel employé
  create: async (employeeData) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      const newEmployee = {
        ...employeeData,
        id: `EMP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        joinDate: new Date().toISOString().split('T')[0]
      };
      mockEmployees.push(newEmployee);
      return { data: newEmployee };
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour un employé
  update: async (id, employeeData) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockEmployees.findIndex(emp => emp.id === id);
      if (index === -1) {
        throw new Error('Employé non trouvé');
      }
      mockEmployees[index] = { ...mockEmployees[index], ...employeeData };
      return { data: mockEmployees[index] };
    } catch (error) {
      throw error;
    }
  },

  // Supprimer un employé
  delete: async (id) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockEmployees.findIndex(emp => emp.id === id);
      if (index === -1) {
        throw new Error('Employé non trouvé');
      }
      mockEmployees.splice(index, 1);
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  }
};

export default EmployeeService;
