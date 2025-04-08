import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/Employees/EmployeeForm';

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    // Simuler un chargement de données
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddEmployee = () => {
    setCurrentEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setShowForm(true);
  };

  const handleSaveEmployee = (employeeData) => {
    if (currentEmployee) {
      // Mise à jour d'un employé existant
      setEmployees(employees.map(emp => 
        emp.id === employeeData.id ? employeeData : emp
      ));
    } else {
      // Ajout d'un nouvel employé
      setEmployees([...employees, employeeData]);
    }
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const departments = ['Marketing', 'IT', 'Finance', 'RH', 'Direction'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Employés</h1>
        <button 
          className="btn btn-primary"
          onClick={handleAddEmployee}
        >
          <span className="material-icons mr-2">add</span>
          Nouvel Employé
        </button>
      </div>

      <div className="bg-dark rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <span className="material-icons">search</span>
              </span>
              <input
                type="text"
                placeholder="Rechercher un employé..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full md:w-48 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">Tous les services</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader">Chargement...</div>
        </div>
      ) : (
        <div className="bg-dark rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Poste</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <span className="text-primary font-bold">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{employee.name}</p>
                          <p className="text-sm text-gray-400">ID: {employee.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{employee.email}</td>
                    <td className="px-6 py-4 text-gray-300">{employee.position}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        employee.department === 'IT' ? 'bg-blue-900 text-blue-300' :
                        employee.department === 'Marketing' ? 'bg-purple-900 text-purple-300' :
                        employee.department === 'Finance' ? 'bg-green-900 text-green-300' :
                        employee.department === 'RH' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-red-900 text-red-300'
                      }`}>
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        employee.status === 'Actif' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 rounded hover:bg-gray-700"
                          onClick={() => navigate(`/employees/${employee.id}`)}
                        >
                          <span className="material-icons text-green-400">visibility</span>
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-gray-700"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          <span className="material-icons text-blue-400">edit</span>
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-gray-700"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <span className="material-icons text-red-400">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Affichage de {filteredEmployees.length} sur {employees.length} employés
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600">Précédent</button>
                <button className="px-3 py-1 rounded bg-primary text-white hover:bg-primary-dark">Suivant</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <EmployeeForm 
          employee={currentEmployee}
          onClose={() => setShowForm(false)}
          onSave={handleSaveEmployee}
        />
      )}
    </motion.div>
  );
};

// Données fictives pour les employés
const mockEmployees = [
  { id: 'EMP001', name: 'Jean Dupont', email: 'jean.dupont@entreprise.fr', position: 'Développeur Senior', department: 'IT', status: 'Actif' },
  { id: 'EMP002', name: 'Marie Martin', email: 'marie.martin@entreprise.fr', position: 'Chef de Projet', department: 'IT', status: 'Actif' },
  { id: 'EMP003', name: 'Pierre Durand', email: 'pierre.durand@entreprise.fr', position: 'Responsable Marketing', department: 'Marketing', status: 'Actif' },
  { id: 'EMP004', name: 'Sophie Petit', email: 'sophie.petit@entreprise.fr', position: 'Comptable', department: 'Finance', status: 'Actif' },
  { id: 'EMP005', name: 'Thomas Bernard', email: 'thomas.bernard@entreprise.fr', position: 'Directeur Technique', department: 'Direction', status: 'Actif' },
  { id: 'EMP006', name: 'Julie Leroy', email: 'julie.leroy@entreprise.fr', position: 'Responsable RH', department: 'RH', status: 'Actif' },
  { id: 'EMP007', name: 'Nicolas Moreau', email: 'nicolas.moreau@entreprise.fr', position: 'Développeur Frontend', department: 'IT', status: 'Actif' },
  { id: 'EMP008', name: 'Camille Dubois', email: 'camille.dubois@entreprise.fr', position: 'Designer UI/UX', department: 'Marketing', status: 'Inactif' },
  { id: 'EMP009', name: 'Alexandre Blanc', email: 'alexandre.blanc@entreprise.fr', position: 'Analyste Financier', department: 'Finance', status: 'Actif' },
  { id: 'EMP010', name: 'Émilie Rousseau', email: 'emilie.rousseau@entreprise.fr', position: 'Assistante RH', department: 'RH', status: 'Actif' },
];

export default Employees;
