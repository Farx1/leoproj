import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import DashboardStats from '../components/Dashboard/DashboardStats';
import BarChart from '../components/Dashboard/BarChart';
import LineChart from '../components/Dashboard/LineChart';
import PieChart from '../components/Dashboard/PieChart';
import { useAuth } from '../contexts/AuthContext';

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
            value: '125', 
            change: 5, 
            icon: 'group'
          },
          { 
            title: 'Emails non lus', 
            value: '42', 
            change: 12, 
            icon: 'email'
          },
          { 
            title: 'Fichiers stockés', 
            value: '1,254', 
            change: 8, 
            icon: 'folder'
          },
          { 
            title: 'Espace utilisé', 
            value: '45.8 GB', 
            change: 3, 
            icon: 'storage'
          }
        ]);
        
        // Générer les 7 derniers jours pour le graphique de revenus
        const today = new Date();
        const revenueData = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - (6 - i));
          return {
            label: format(date, 'dd/MM'),
            value: Math.floor(Math.random() * 5000) + 10000
          };
        });
        setRevenueData(revenueData);
        
        // Données d'activité utilisateur (12 derniers mois)
        const months = Array.from({ length: 12 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (11 - i));
          return {
            label: format(date, 'MMM', { locale: fr }),
            value: Math.floor(Math.random() * 500) + 100
          };
        });
        setUserActivityData(months);
        
        // Répartition par département
        setDepartmentData([
          { label: 'IT', value: 42 },
          { label: 'Marketing', value: 28 },
          { label: 'Finance', value: 18 },
          { label: 'RH', value: 12 },
          { label: 'Autres', value: 8 }
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-0">Dashboard</h1>
          <div className="text-gray-400">
            <span className="material-icons align-middle mr-1">today</span>
            {format(new Date(), 'EEEE dd MMMM yyyy', { locale: fr })}
          </div>
        </div>
        
        {/* Cartes statistiques */}
        <DashboardStats stats={stats} />
        
        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <LineChart 
            data={userActivityData} 
            title="Activité des utilisateurs (12 derniers mois)" 
          />
          <BarChart 
            data={revenueData} 
            title="Revenus (7 derniers jours)" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <PieChart 
            data={departmentData} 
            title="Répartition par département" 
          />
          
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Activité récente</h2>
            <div className="bg-dark rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start border-b border-gray-700 pb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <span className="material-icons text-primary">
                        {['person', 'email', 'folder', 'edit', 'delete'][item % 5]}
                      </span>
                    </div>
                    <div>
                      <p className="text-white">
                        {[
                          'Jean Dupont a mis à jour son profil',
                          'Nouveau message de Marie Martin',
                          'Pierre Durand a partagé un fichier',
                          'Sophie Petit a modifié un document',
                          'Un fichier a été supprimé par l\'administrateur'
                        ][item % 5]}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {`Il y a ${item * 10} minutes`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
