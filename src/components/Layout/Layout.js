import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import Breadcrumb from './Breadcrumb';
import SearchBar from './SearchBar';
import NotificationCenter from '../Notifications/NotificationCenter';

const Layout = () => {
  return (
    <div className="flex h-screen bg-dark-darker text-light">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-dark-light p-4 flex justify-between items-center">
          <Breadcrumb />
          <div className="flex items-center space-x-4">
            <SearchBar />
            <NotificationCenter />
          </div>
        </header>
        <motion.main 
          className="flex-1 overflow-auto p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
