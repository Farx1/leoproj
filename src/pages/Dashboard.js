import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { mockDashboardData } from '../data/mockData';

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
  }, []);
  
  // Sauvegarder la configuration du tableau de bord
  const saveDashboardLayout = (layout) => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    setDashboardLayout(layout);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-400">Bienvenue, {currentUser?.name}</p>
          <button 
            className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-focus transition-colors"
            onClick={() => {
              // Logique pour personnaliser le tableau de bord
              // Pour l'instant, on utilise une configuration simple
              const newLayout = dashboardLayout ? null : {
                leftColumn: ['stats', 'revenueChart', 'departmentChart'],
                rightColumn: ['calendar', 'tasks', 'userActivityChart']
              };
              saveDashboardLayout(newLayout);
            }}
          >
            <span className="material-icons text-sm mr-1">dashboard_customize</span>
            {dashboardLayout ? 'Réinitialiser' : 'Personnaliser'}
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Toujours afficher les statistiques en haut */}
          <DashboardStats stats={stats} />
          
          {dashboardLayout ? (
            // Affichage personnalisé
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="space-y-6">
                {dashboardLayout.leftColumn.map((item, index) => (
                  <React.Fragment key={index}>
                    {item === 'revenueChart' && (
                      <div className="bg-dark-light p-4 rounded-lg shadow-lg">
                        <LineChart data={revenueData} />
                      </div>
                    )}
                    {item === 'userActivityChart' && (
                      <div className="bg-dark-light p-4 rounded-lg shadow-lg">
                        <BarChart data={userActivityData} />
                      </div>
                    )}
                    {item === 'departmentChart' && (
                      <div className="bg-dark-light p-4 rounded-lg shadow-lg">
                        <PieChart data={departmentData} />
                      </div>
                    )}
                    {item === 'tasks' && <RecentTasks tasks={tasks} />}
                    {item === 'calendar' && <DeadlineCalendar tasks={tasks} />}
                  </React.Fragment>
                ))}
              </div>
              <div className="space-y-6">
                {dashboardLayout.rightColumn.map((item, index) => (
                  <React.Fragment key={index}>
                    {item === 'revenueChart' && (
                      <div className="bg-dark-light p-4 rounded-lg shadow-lg">
                        <LineChart data={revenueData} />
                      </div>
                    )}
                    {item === 'userActivityChart' && (
                      <div className="bg-dark-light p-4 rounded-lg shadow-lg">
                        <BarChart data={userActivityData} />
                      </div>
                    )}
                    {item === 'departmentChart' && (
                      <div className="bg-dark-light p-4 rounded-lg shadow-lg">
                        <PieChart data={departmentData} />
                      </div>
                    )}
                    {item === 'tasks' && <RecentTasks tasks={tasks} />}
                    {item === 'calendar' && <DeadlineCalendar tasks={tasks} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            // Affichage par défaut
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-dark-light p-4 rounded-lg shadow-lg">
                <LineChart data={revenueData} />
              </div>
              
              <div className="bg-dark-light p-4 rounded-lg shadow-lg">
                <BarChart data={userActivityData} />
              </div>
              
              <div className="bg-dark-light p-4 rounded-lg shadow-lg">
                <PieChart data={departmentData} />
              </div>
              
              <RecentTasks tasks={tasks} />
              
              <DeadlineCalendar tasks={tasks} className="lg:col-span-2" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
