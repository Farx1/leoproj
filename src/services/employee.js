import api from './api';
import { mockEmployees } from '../data/mockData';

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
