import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

// Composants
import DashboardStats from '../components/Dashboard/DashboardStats';
import LineChart from '../components/Dashboard/LineChart';
import BarChart from '../components/Dashboard/BarChart';
import PieChart from '../components/Dashboard/PieChart';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [userActivityData, setUserActivityData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  
  useEffect(() => {
    // Simuler un appel API
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Dans une vraie application, ce serait un appel API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Données mockées
        setStats([
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
        ]);
        
        setRevenueData([
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
        ]);
        
        setUserActivityData([
          { day: 'Lun', value: 120 },
          { day: 'Mar', value: 145 },
          { day: 'Mer', value: 135 },
          { day: 'Jeu', value: 160 },
          { day: 'Ven', value: 180 },
          { day: 'Sam', value: 80 },
          { day: 'Dim', value: 60 }
        ]);
        
        setDepartmentData([
          { name: 'IT', value: 35 },
          { name: 'Marketing', value: 25 },
          { name: 'Finance', value: 20 },
          { name: 'RH', value: 15 },
          { name: 'Autres', value: 5 }
        ]);
        
      } catch (error) {
        console.error('Erreur lors du chargement des données du dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-gray-400">
          Bienvenue, {currentUser?.name || 'Utilisateur'} ! Voici un aperçu de votre activité.
        </p>
      </motion.div>
      
      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-dashboard"
        >
          <h2 className="text-xl font-semibold mb-4">Revenus Mensuels</h2>
          <LineChart data={revenueData} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card-dashboard"
        >
          <h2 className="text-xl font-semibold mb-4">Activité Utilisateurs</h2>
          <BarChart data={userActivityData} />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card-dashboard lg:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4">Tâches Récentes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-3">Tâche</th>
                  <th className="pb-3">Assigné à</th>
                  <th className="pb-3">Statut</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-3">Mise à jour du site web</td>
                  <td className="py-3">Jean Dupont</td>
                  <td className="py-3"><span className="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs">Terminé</span></td>
                  <td className="py-3">12/06/2023</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3">Intégration API paiement</td>
                  <td className="py-3">Marie Martin</td>
                  <td className="py-3"><span className="px-2 py-1 bg-yellow-900 text-yellow-300 rounded-full text-xs">En cours</span></td>
                  <td className="py-3">15/06/2023</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3">Rapport financier Q2</td>
                  <td className="py-3">Pierre Dubois</td>
                  <td className="py-3"><span className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs">En attente</span></td>
                  <td className="py-3">20/06/2023</td>
                </tr>
                <tr>
                  <td className="py-3">Recrutement développeur</td>
                  <td className="py-3">Sophie Lefebvre</td>
                  <td className="py-3"><span className="px-2 py-1 bg-red-900 text-red-300 rounded-full text-xs">Retard</span></td>
                  <td className="py-3">10/06/2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card-dashboard"
        >
          <h2 className="text-xl font-semibold mb-4">Répartition par Département</h2>
          <PieChart data={departmentData} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
