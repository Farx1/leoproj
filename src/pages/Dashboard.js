import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDashboardData } from '../data/mockData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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
        
      } catch (error) {
        console.error('Erreur lors du chargement des données du dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [refreshing]);
  
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
        <div className="flex mt-6 border-b border-gray-700 overflow-x-auto pb-1 hide-scrollbar">
          {['aperçu', 'performance', 'activité', 'projets'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
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
            {/* Statistiques en haut avec animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <DashboardStats stats={stats} />
            </motion.div>
            
            {dashboardLayout ? (
              // Affichage personnalisé
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="space-y-6">
                  {dashboardLayout.leftColumn.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                    >
                      {item === 'revenueChart' && (
                        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-colors">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Chiffre d'affaires</h3>
                            <div className="flex gap-2">
                              <button className="text-gray-400 hover:text-white">
                                <span className="material-icons text-sm">more_horiz</span>
                              </button>
                            </div>
                          </div>
                          <LineChart data={revenueData} />
                        </div>
                      )}
                      {item === 'userActivityChart' && (
                        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-colors">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Activité utilisateurs</h3>
                            <div className="flex gap-2">
                              <button className="text-gray-400 hover:text-white">
                                <span className="material-icons text-sm">more_horiz</span>
                              </button>
                            </div>
                          </div>
                          <BarChart data={userActivityData} />
                        </div>
                      )}
                      {item === 'departmentChart' && (
                        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-colors">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Répartition par département</h3>
                            <div className="flex gap-2">
                              <button className="text-gray-400 hover:text-white">
                                <span className="material-icons text-sm">more_horiz</span>
                              </button>
                            </div>
                          </div>
                          <PieChart data={departmentData} />
                        </div>
                      )}
                      {item === 'tasks' && <RecentTasks tasks={tasks} />}
                      {item === 'calendar' && <DeadlineCalendar tasks={tasks} />}
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-6">
                  {dashboardLayout.rightColumn.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                    >
                      {item === 'revenueChart' && (
                        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-colors">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Chiffre d'affaires</h3>
                            <div className="flex gap-2">
                              <button className="text-gray-400 hover:text-white">
                                <span className="material-icons text-sm">more_horiz</span>
                              </button>
                            </div>
                          </div>
                          <LineChart data={revenueData} />
                        </div>
                      )}
                      {item === 'userActivityChart' && (
                        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-colors">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Activité utilisateurs</h3>
                            <div className="flex gap-2">
                              <button className="text-gray-400 hover:text-white">
                                <span className="material-icons text-sm">more_horiz</span>
                              </button>
                            </div>
                          </div>
                          <BarChart data={userActivityData} />
                        </div>
                      )}
                      {item === 'departmentChart' && (
                        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-colors">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Répartition par département</h3>
                            <div className="flex gap-2">
                              <button className="text-gray-400 hover:text-white">
                                <span className="material-icons text-sm">more_horiz</span>
                              </button>
                            </div>
                          </div>
                          <PieChart data={departmentData} />
                        </div>
                      )}
                      {item === 'tasks' && <RecentTasks tasks={tasks} />}
                      {item === 'calendar' && <DeadlineCalendar tasks={tasks} />}
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Affichage par défaut avec animations séquentielles
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <motion.div 
                  className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-colors lg:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Chiffre d'affaires mensuel</h3>
                    <div className="flex gap-2">
                      <select className="bg-dark border border-gray-700 text-gray-300 text-sm rounded-lg px-2 py-1">
                        <option>Cette année</option>
                        <option>Année précédente</option>
                      </select>
                      <button className="text-gray-400 hover:text-white">
                        <span className="material-icons text-sm">more_horiz</span>
                      </button>
                    </div>
                  </div>
                  <LineChart data={revenueData} />
                </motion.div>
                
                <motion.div 
                  className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Répartition par département</h3>
                    <button className="text-gray-400 hover:text-white">
                      <span className="material-icons text-sm">more_horiz</span>
                    </button>
                  </div>
                  <PieChart data={departmentData} />
                </motion.div>
                
                <motion.div 
                  className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 hover:border-primary/30 transition-colors lg:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Activité utilisateurs</h3>
                    <div className="flex gap-2">
                      <select className="bg-dark border border-gray-700 text-gray-300 text-sm rounded-lg px-2 py-1">
                        <option>7 derniers jours</option>
                        <option>30 derniers jours</option>
                      </select>
                      <button className="text-gray-400 hover:text-white">
                        <span className="material-icons text-sm">more_horiz</span>
                      </button>
                    </div>
                  </div>
                  <BarChart data={userActivityData} />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="lg:col-span-3"
                >
                  <RecentTasks tasks={tasks} />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="lg:col-span-3"
                >
                  <DeadlineCalendar tasks={tasks} />
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
