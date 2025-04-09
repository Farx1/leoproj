import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="flex h-screen bg-dark-darker text-light">
      <Sidebar />
      <motion.main 
        className="flex-1 overflow-auto p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default Layout;
