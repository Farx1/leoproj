import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import EmployeeService from '../services/employee';
import { useAuth } from '../contexts/AuthContext';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await EmployeeService.getById(id);
      setEmployee(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des détails de l\'employé:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/employees');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="bg-dark rounded-lg p-8 text-center">
        <p className="text-gray-400 text-lg">Employé non trouvé</p>
        <button
          onClick={handleBack}
          className="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  // Obtenir les compétences et projets en fonction du département
  const skills = getSkillsByDepartment(employee.department);
  const projects = getProjectsByDepartment(employee.department);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="material-icons mr-2">arrow_back</span>
          Retour
        </button>
        
        {hasRole('admin') && (
          <button
            onClick={() => navigate(`/employees/edit/${employee.id}`)}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
          >
            <span className="material-icons mr-2">edit</span>
            Modifier
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-1">
          <div className="bg-dark rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden mx-auto bg-gray-700">
                {employee.avatar ? (
                  <img src={employee.avatar} alt={employee.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary text-white text-4xl">
                    {employee.name.charAt(0)}
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold mt-4 text-white">{employee.name}</h2>
              <p className="text-gray-400">{employee.position}</p>
              
              <div className="mt-4">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  employee.status === 'Actif' ? 'bg-green-900 text-green-300' : 
                  employee.status === 'En congé' ? 'bg-yellow-900 text-yellow-300' : 
                  'bg-red-900 text-red-300'
                }`}>
                  {employee.status}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-800 p-6">
              <h3 className="text-lg font-medium text-white mb-4">Informations de contact</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="material-icons text-gray-400 mr-3">email</span>
                  <span className="text-white">{employee.email}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="material-icons text-gray-400 mr-3">phone</span>
                  <span className="text-white">{employee.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="material-icons text-gray-400 mr-3">business</span>
                  <span className="text-white">{employee.department}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="material-icons text-gray-400 mr-3">event</span>
                  <span className="text-white">
                    {employee.joinDate ? format(new Date(employee.joinDate), 'dd MMMM yyyy', { locale: fr }) : 'Non spécifié'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Compétences */}
          <div className="bg-dark rounded-lg overflow-hidden mt-6">
            <div className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">Compétences</h3>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Projets et activités */}
        <div className="lg:col-span-2">
          <div className="bg-dark rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">Projets</h3>
              
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-medium">{project.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'En cours' ? 'bg-blue-900 text-blue-300' : 
                        project.status === 'Terminé' ? 'bg-green-900 text-green-300' : 
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mt-2">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Statistiques */}
          <div className="bg-dark rounded-lg overflow-hidden mt-6">
            <div className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">Statistiques</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{Math.floor(Math.random() * 20) + 5}</div>
                  <div className="text-gray-400 mt-1">Projets complétés</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-500">{Math.floor(Math.random() * 100) + 80}%</div>
                  <div className="text-gray-400 mt-1">Taux de réussite</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-500">{Math.floor(Math.random() * 5) + 1}</div>
                  <div className="text-gray-400 mt-1">Projets en cours</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notes */}
          {hasRole('admin') && (
            <div className="bg-dark rounded-lg overflow-hidden mt-6">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">Notes (Visible uniquement par les administrateurs)</h3>
                
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                  rows="4"
                  placeholder="Ajouter des notes sur cet employé..."
                ></textarea>
                
                <button className="mt-3 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg">
                  Enregistrer les notes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Fonctions utilitaires pour générer des données en fonction du département
const getSkillsByDepartment = (department) => {
  switch (department) {
    case 'IT':
      return ['JavaScript', 'React', 'Node.js', 'Python', 'DevOps', 'AWS'];
    case 'Marketing':
      return ['SEO', 'Content Marketing', 'Social Media', 'Analytics', 'Branding'];
    case 'Finance':
      return ['Comptabilité', 'Analyse financière', 'Budgétisation', 'Fiscalité'];
    case 'RH':
      return ['Recrutement', 'Formation', 'Gestion des talents', 'Droit du travail'];
    default:
      return ['Communication', 'Gestion de projet', 'Analyse', 'Résolution de problèmes'];
  }
};

const getProjectsByDepartment = (department) => {
  switch (department) {
    case 'IT':
      return [
        { name: 'Refonte du site web', status: 'En cours', description: 'Modernisation de l\'interface utilisateur et amélioration des performances.' },
        { name: 'Migration vers le cloud', status: 'Terminé', description: 'Migration de l\'infrastructure vers AWS pour améliorer la scalabilité.' },
        { name: 'Application mobile', status: 'Planifié', description: 'Développement d\'une application mobile pour les clients.' }
      ];
    case 'Marketing':
      return [
        { name: 'Campagne réseaux sociaux', status: 'En cours', description: 'Campagne de promotion sur Instagram, Facebook et Twitter.' },
        { name: 'Refonte de la marque', status: 'Terminé', description: 'Mise à jour du logo, des couleurs et du message de la marque.' },
        { name: 'Étude de marché', status: 'Planifié', description: 'Analyse des tendances et des concurrents.' }
      ];
    case 'Finance':
      return [
        { name: 'Audit annuel', status: 'En cours', description: 'Préparation et coordination de l\'audit financier annuel.' },
        { name: 'Optimisation fiscale', status: 'Terminé', description: 'Identification des opportunités d\'économies fiscales.' },
        { name: 'Prévisions budgétaires', status: 'Planifié', description: 'Élaboration des prévisions pour l\'année à venir.' }
      ];
    case 'RH':
      return [
        { name: 'Recrutement développeurs', status: 'En cours', description: 'Recrutement de 5 développeurs pour l\'équipe produit.' },
        { name: 'Programme de formation', status: 'Terminé', description: 'Mise en place d\'un programme de formation continue.' },
        { name: 'Révision des avantages', status: 'Planifié', description: 'Analyse et mise à jour des avantages sociaux.' }
      ];
    default:
      return [
        { name: 'Projet A', status: 'En cours', description: 'Description du projet A.' },
        { name: 'Projet B', status: 'Terminé', description: 'Description du projet B.' },
        { name: 'Projet C', status: 'Planifié', description: 'Description du projet C.' }
      ];
  }
};

export default EmployeeDetails;
