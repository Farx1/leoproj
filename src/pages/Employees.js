import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EmployeeForm from '../components/Employees/EmployeeForm';
import EmployeeService from '../services/employee';
import { useAuth } from '../contexts/AuthContext';

const Employees = () => {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await EmployeeService.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des employés:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = () => {
    setCurrentEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setShowForm(true);
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      setLoading(true);
      if (currentEmployee) {
        // Mise à jour d'un employé existant
        await EmployeeService.update(employeeData.id, employeeData);
      } else {
        // Ajout d'un nouvel employé
        await EmployeeService.create(employeeData);
      }
      fetchEmployees();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'employé:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      try {
        setLoading(true);
        await EmployeeService.delete(id);
        fetchEmployees();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/employees/${id}`);
  };

  // Filtrer les employés en fonction de la recherche et du département
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Obtenir la liste unique des départements
  const departments = ['all', ...new Set(employees.map(emp => emp.department))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Employés</h1>
        
        {hasRole('admin') && (
          <button
            onClick={handleAddEmployee}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
          >
            <span className="material-icons mr-2">add</span>
            Ajouter un employé
          </button>
        )}
      </div>
      
      {/* Filtres */}
      <div className="bg-dark rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-400 mb-2">Recherche</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <span className="material-icons">search</span>
              </span>
              <input
                type="text"
                placeholder="Rechercher par nom, email, poste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 p-3 text-white"
              />
            </div>
          </div>
          
          <div className="md:w-64">
            <label className="block text-gray-400 mb-2">Département</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'Tous les départements' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Liste des employés */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {filteredEmployees.length === 0 ? (
            <div className="bg-dark rounded-lg p-8 text-center">
              <p className="text-gray-400 text-lg">Aucun employé trouvé</p>
            </div>
          ) : (
            <div className="bg-dark rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-dark-lighter">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employé</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Poste</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Département</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-dark-lighter">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-700">
                            {employee.avatar ? (
                              <img src={employee.avatar} alt={employee.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-primary text-white">
                                {employee.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{employee.name}</div>
                            <div className="text-sm text-gray-400">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{employee.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{employee.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.status === 'Actif' ? 'bg-green-900 text-green-300' : 
                          employee.status === 'En congé' ? 'bg-yellow-900 text-yellow-300' : 
                          'bg-red-900 text-red-300'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(employee.id)}
                          className="text-primary hover:text-primary-light mr-3"
                        >
                          <span className="material-icons">visibility</span>
                        </button>
                        
                        {hasRole('admin') && (
                          <>
                            <button
                              onClick={() => handleEditEmployee(employee)}
                              className="text-blue-500 hover:text-blue-400 mr-3"
                            >
                              <span className="material-icons">edit</span>
                            </button>
                            
                            <button
                              onClick={() => handleDeleteEmployee(employee.id)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <span className="material-icons">delete</span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      
      {/* Modal pour ajouter/modifier un employé */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-dark rounded-lg w-full max-w-2xl">
            <EmployeeForm
              employee={currentEmployee}
              onClose={() => setShowForm(false)}
              onSave={handleSaveEmployee}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Employees;
