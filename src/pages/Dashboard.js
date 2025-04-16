import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import TabButton from '../components/Dashboard/TabButton';
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import DashboardPerformance from '../components/Dashboard/DashboardPerformance';
import DashboardActivity from '../components/Dashboard/DashboardActivity';
import DashboardProjects from '../components/Dashboard/DashboardProjects';
import { mockDashboardData } from '../data/mockDashboardData';

// Composants
import DashboardStats from '../components/Dashboard/DashboardStats';
import LineChart from '../components/Dashboard/LineChart';
import BarChart from '../components/Dashboard/BarChart';
import PieChart from '../components/Dashboard/PieChart';
import RecentTasks from '../components/Dashboard/RecentTasks';
import DeadlineCalendar from '../components/Dashboard/DeadlineCalendar';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [userActivityData, setUserActivityData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [dashboardLayout, setDashboardLayout] = useState(null);
  const [activeTab, setActiveTab] = useState('aperçu');
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    // Charger la configuration du tableau de bord personnalisé
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
      try {
        setDashboardLayout(JSON.parse(savedLayout));
      } catch (e) {
        console.error('Erreur lors du chargement de la configuration du tableau de bord:', e);
      }
    }
  }, []);
  
  useEffect(() => {
    // Simuler un appel API
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Utiliser les données mockées
        setStats(mockDashboardData.stats);
        setRevenueData(mockDashboardData.revenueData);
        setUserActivityData(mockDashboardData.userActivityData);
        setDepartmentData(mockDashboardData.departmentData);
        setTasks(mockDashboardData.tasks);
        setPerformanceData(mockDashboardData.performanceData);
        setActivities(mockDashboardData.activities);
        setProjects(mockDashboardData.projects);
        
      } catch (error) {
        console.error('Erreur lors du chargement des données du dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [refreshing]);
  
  // Fonction pour actualiser les données du tableau de bord
  const handleRefresh = async () => {
    setLoading(true);
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Réutiliser les mêmes données mockées (dans une vraie application, on ferait un nouvel appel API)
    setStats([...mockDashboardData.stats]);
    setRevenueData([...mockDashboardData.revenueData]);
    setUserActivityData([...mockDashboardData.userActivityData]);
    setDepartmentData([...mockDashboardData.departmentData]);
    setTasks([...mockDashboardData.tasks]);
    setPerformanceData([...mockDashboardData.performanceData]);
    setActivities([...mockDashboardData.activities]);
    setProjects([...mockDashboardData.projects]);
    
    setLoading(false);
  };
  
  // Fonction pour rafraîchir les données
  const refreshData = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };
  
  // Sauvegarder la configuration du tableau de bord
  const saveDashboardLayout = (layout) => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    setDashboardLayout(layout);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pb-8"
    >
      {/* En-tête du tableau de bord avec date et actions */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-xl mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Tableau de bord</h1>
            <p className="text-gray-400">
              {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })} • 
              <span className="ml-2 text-primary font-medium">Bienvenue, {currentUser?.name}</span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-dark-light hover:bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-md"
              onClick={refreshData}
              disabled={refreshing}
            >
              <span className={`material-icons text-sm ${refreshing ? 'animate-spin' : ''}`}>refresh</span>
              {refreshing ? 'Actualisation...' : 'Actualiser'}
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-md"
              onClick={() => {
                // Logique pour personnaliser le tableau de bord
                const newLayout = dashboardLayout ? null : {
                  leftColumn: ['stats', 'revenueChart', 'departmentChart'],
                  rightColumn: ['calendar', 'tasks', 'userActivityChart']
                };
                saveDashboardLayout(newLayout);
              }}
            >
              <span className="material-icons text-sm">dashboard_customize</span>
              {dashboardLayout ? 'Réinitialiser' : 'Personnaliser'}
            </motion.button>
          </div>
        </div>
        
        {/* Onglets de navigation */}
        <div className="flex flex-wrap mt-6 border-b border-gray-700 overflow-x-auto pb-1 hide-scrollbar">
          <TabButton 
            label="Aperçu"
            icon="dashboard"
            isActive={activeTab === 'aperçu'}
            onClick={() => setActiveTab('aperçu')}
          />
          <TabButton 
            label="Performance"
            icon="trending_up"
            isActive={activeTab === 'performance'}
            onClick={() => setActiveTab('performance')}
          />
          <TabButton 
            label="Activité"
            icon="history"
            isActive={activeTab === 'activité'}
            onClick={() => setActiveTab('activité')}
          />
          <TabButton 
            label="Projets"
            icon="folder"
            isActive={activeTab === 'projets'}
            onClick={() => setActiveTab('projets')}
          />
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center h-64 gap-4"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-gray-400">Chargement des données...</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'aperçu' && (
              <DashboardOverview 
                stats={stats}
                revenueData={revenueData}
                userActivityData={userActivityData}
                departmentData={departmentData}
                tasks={tasks}
                onRefresh={handleRefresh}
              />
            )}

            {activeTab === 'performance' && (
              <DashboardPerformance 
                performanceData={performanceData}
                onRefresh={handleRefresh}
              />
            )}

            {activeTab === 'activité' && (
              <DashboardActivity 
                activities={activities}
                onRefresh={handleRefresh}
              />
            )}

            {activeTab === 'projets' && (
              <DashboardProjects 
                projects={projects}
                onRefresh={handleRefresh}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
