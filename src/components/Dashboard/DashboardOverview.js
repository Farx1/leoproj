import React from 'react';
import { motion } from 'framer-motion';
import DashboardStats from './DashboardStats';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import RecentTasks from './RecentTasks';
import DeadlineCalendar from './DeadlineCalendar';

/**
 * Composant pour l'onglet Aperçu du tableau de bord
 */
const DashboardOverview = ({ 
  stats, 
  revenueData, 
  userActivityData, 
  departmentData, 
  tasks,
  onRefresh
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* En-tête avec bouton d'actualisation */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Aperçu du tableau de bord</h2>
        <button 
          onClick={onRefresh}
          className="flex items-center px-4 py-2 bg-primary rounded-lg hover:bg-primary-dark transition-colors"
        >
          <span className="mr-2">🔄</span>
          <span>Actualiser</span>
        </button>
      </div>

      {/* Statistiques */}
      <DashboardStats stats={stats} />

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800">
          <BarChart data={revenueData} />
        </div>
        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800">
          <LineChart data={userActivityData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 lg:col-span-1">
          <PieChart data={departmentData} />
        </div>
        <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800 lg:col-span-2">
          <RecentTasks tasks={tasks} />
        </div>
      </div>

      {/* Calendrier des échéances */}
      <div className="bg-dark-light p-6 rounded-xl shadow-lg border border-gray-800">
        <DeadlineCalendar tasks={tasks} />
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
