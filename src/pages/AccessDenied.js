import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AccessDenied = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-dark-darker text-white p-4"
    >
      <div className="text-red-500 text-9xl mb-6">
        <span className="material-icons" style={{ fontSize: '150px' }}>gpp_bad</span>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">Accès Refusé</h1>
      
      <p className="text-xl text-gray-400 mb-8 text-center max-w-md">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      
      <div className="flex gap-4">
        <Link 
          to="/"
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
        >
          Retour au Dashboard
        </Link>
      </div>
    </motion.div>
  );
};

export default AccessDenied;
