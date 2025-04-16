import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NotificationCenter from '../Notifications/NotificationCenter';

const Header = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="bg-dark-darker text-white shadow-md py-3 px-4 flex justify-between items-center">
      {/* Bouton pour ouvrir/fermer la sidebar sur mobile */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden text-gray-400 hover:text-white"
      >
        <span className="text-xl">☰</span>
      </button>
      
      {/* Barre de recherche */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full bg-dark-light border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>
      
      {/* Actions rapides */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white relative">
          <span className="text-xl">🔍</span>
          <span className="sr-only">Recherche</span>
        </button>
        
        <button 
          className="text-gray-400 hover:text-white relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <span className="text-xl">🔔</span>
          <span className="sr-only">Notifications</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>
        
        {showNotifications && (
          <NotificationCenter onClose={() => setShowNotifications(false)} />
        )}
        
        <Link to="/profile" className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            U
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
