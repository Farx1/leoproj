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
      
      <h1 className="text-4xl font-bold mb-4">Accès refusé</h1>
      
      <p className="text-xl text-gray-400 mb-8 text-center max-w-md">
        Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
      </p>
      
      <div className="flex space-x-4">
        <Link
          to="/"
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium"
        >
          Retour à l'accueil
        </Link>
        
        <button
          onClick={() => window.history.back()}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Retour à la page précédente
        </button>
      </div>
    </motion.div>
  );
};

export default AccessDenied;
