import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant de bouton d'onglet réutilisable pour le tableau de bord
 * @param {string} label - Texte du bouton
 * @param {string} icon - Nom de l'icône Material Icons
 * @param {boolean} isActive - Si l'onglet est actif
 * @param {function} onClick - Fonction à exécuter lors du clic
 */
const TabButton = ({ label, icon, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-dark-light text-gray-300 hover:bg-gray-700'
      }`}
    >
      {icon && <span className="material-icons mb-1 text-xl">{icon}</span>}
      <span className="text-sm">{label}</span>
    </motion.button>
  );
};

export default TabButton;
