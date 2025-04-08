import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de données
    setTimeout(() => {
      const foundEmployee = mockEmployees.find(emp => emp.id === id);
      setEmployee(foundEmployee || null);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleBack = () => {
    navigate('/employees');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader">Chargement...</div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="bg-dark rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Employé non trouvé</h2>
        <p className="text-gray-300 mb-6">L'employé avec l'ID {id} n'existe pas ou a été supprimé.</p>
        <button 
          className="btn btn-primary"
          onClick={handleBack}
        >
          <span className="material-icons mr-2">arrow_back</span>
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Détails de l'employé</h1>
        <button 
          className="btn btn-outline"
          onClick={handleBack}
        >
          <span className="material-icons mr-2">arrow_back</span>
          Retour
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-dark rounded-lg shadow-lg p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <span className="text-primary text-4xl font-bold">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
            <p className="text-gray-400">{employee.position}</p>
            <div className="mt-3">
              <span className={`px-3 py-1 rounded-full text-sm ${
                employee.status === 'Actif' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
              }`}>
                {employee.status}
              </span>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center mb-3">
              <span className="material-icons text-gray-400 mr-2">email</span>
              <span className="text-gray-300">{employee.email}</span>
            </div>
            <div className="flex items-center mb-3">
              <span className="material-icons text-gray-400 mr-2">business</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                employee.department === 'IT' ? 'bg-blue-900 text-blue-300' :
                employee.department === 'Marketing' ? 'bg-purple-900 text-purple-300' :
                employee.department === 'Finance' ? 'bg-green-900 text-green-300' :
                employee.department === 'RH' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {employee.department}
              </span>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-gray-400 mr-2">badge</span>
              <span className="text-gray-300">ID: {employee.id}</span>
            </div>
          </div>
        </div>

        <div className="bg-dark rounded-lg shadow-lg p-6 lg:col-span-2">
          <h3 className="text-xl font-bold mb-4 text-white">Informations professionnelles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-gray-400 text-sm mb-1">Date d'embauche</h4>
              <p className="text-white">01/06/2020</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-gray-400 text-sm mb-1">Supérieur hiérarchique</h4>
              <p className="text-white">Thomas Bernard</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-gray-400 text-sm mb-1">Type de contrat</h4>
              <p className="text-white">CDI</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-gray-400 text-sm mb-1">Salaire annuel</h4>
              <p className="text-white">45 000 €</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-white">Compétences</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {getSkillsByDepartment(employee.department).map((skill, index) => (
              <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-gray-300 text-sm">
                {skill}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4 text-white">Projets récents</h3>
          <div className="space-y-3">
            {getProjectsByDepartment(employee.department).map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between">
                  <h4 className="font-medium text-white">{project.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'En cours' ? 'bg-blue-900 text-blue-300' :
                    project.status === 'Terminé' ? 'bg-green-900 text-green-300' :
                    'bg-yellow-900 text-yellow-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Fonction pour obtenir des compétences en fonction du département
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
    case 'Direction':
      return ['Leadership', 'Stratégie', 'Management', 'Communication', 'Négociation'];
    default:
      return [];
  }
};

// Fonction pour obtenir des projets en fonction du département
const getProjectsByDepartment = (department) => {
  switch (department) {
    case 'IT':
      return [
        { name: 'Refonte du site web', status: 'En cours', description: 'Modernisation de l\'interface utilisateur et amélioration des performances.' },
        { name: 'Migration vers le cloud', status: 'Terminé', description: 'Migration de l\'infrastructure vers AWS.' },
        { name: 'Application mobile', status: 'Planifié', description: 'Développement d\'une application mobile pour les clients.' }
      ];
    case 'Marketing':
      return [
        { name: 'Campagne Q4', status: 'En cours', description: 'Campagne marketing pour le lancement du nouveau produit.' },
        { name: 'Refonte de la marque', status: 'Terminé', description: 'Mise à jour de l\'identité visuelle de l\'entreprise.' },
        { name: 'Étude de marché', status: 'Planifié', description: 'Analyse des tendances du marché et de la concurrence.' }
      ];
    case 'Finance':
      return [
        { name: 'Audit annuel', status: 'En cours', description: 'Préparation des documents pour l\'audit annuel.' },
        { name: 'Optimisation fiscale', status: 'Terminé', description: 'Recherche de solutions pour optimiser la fiscalité de l\'entreprise.' },
        { name: 'Budget 2023', status: 'Planifié', description: 'Élaboration du budget pour l\'année prochaine.' }
      ];
    case 'RH':
      return [
        { name: 'Recrutement IT', status: 'En cours', description: 'Recrutement de 3 développeurs pour l\'équipe IT.' },
        { name: 'Formation RGPD', status: 'Terminé', description: 'Formation des employés sur les nouvelles réglementations RGPD.' },
        { name: 'Plan de carrière', status: 'Planifié', description: 'Élaboration de plans de carrière pour les employés.' }
      ];
    case 'Direction':
      return [
        { name: 'Expansion internationale', status: 'En cours', description: 'Étude de faisabilité pour l\'expansion vers de nouveaux marchés.' },
        { name: 'Restructuration', status: 'Terminé', description: 'Réorganisation des équipes pour améliorer l\'efficacité.' },
        { name: 'Partenariat stratégique', status: 'Planifié', description: 'Négociation d\'un partenariat avec une entreprise leader du secteur.' }
      ];
    default:
      return [];
  }
};

// Données fictives pour les employés (même que dans Employees.js)
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

export default EmployeeDetails;
