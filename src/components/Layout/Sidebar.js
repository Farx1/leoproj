import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { currentUser, logout, hasAnyRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard', roles: [] }, // Accessible à tous
    { name: 'Employés', path: '/employees', icon: 'group', roles: ['admin', 'manager'] },
    { name: 'Emails', path: '/emails', icon: 'email', roles: ['admin', 'user'] },
    { name: 'Paramètres', path: '/settings', icon: 'settings', roles: ['admin'] },
  ];

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <motion.div 
      className={`bg-dark h-screen ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 shadow-lg`}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center">
            <span className="text-primary font-bold text-xl">Admin</span>
            <span className="text-white font-bold">Panel</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white"
        >
          <span className="material-icons">
            {isCollapsed ? 'menu_open' : 'menu'}
          </span>
        </button>
      </div>
      
      {currentUser && (
        <div className={`p-4 border-b border-gray-700 ${isCollapsed ? 'text-center' : 'flex items-center'}`}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className={`rounded-full ${isCollapsed ? 'w-10 h-10 mx-auto' : 'w-12 h-12 mr-3'}`}
          />
          {!isCollapsed && (
            <div>
              <div className="font-medium text-white">{currentUser.name}</div>
              <div className="text-xs text-gray-400">{currentUser.roles.join(', ')}</div>
            </div>
          )}
        </div>
      )}
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => {
            // Vérifier si l'utilisateur a les rôles nécessaires
            if (item.roles.length > 0 && !hasAnyRole(item.roles)) {
              return null;
            }
            
            const isActive = location.pathname === item.path || 
                            (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path} className="px-2 py-1">
                <Link 
                  to={item.path} 
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="material-icons">{item.icon}</span>
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className={`text-gray-400 hover:text-white ${isCollapsed ? 'mx-auto block' : 'flex items-center'}`}
        >
          <span className="material-icons">logout</span>
          {!isCollapsed && <span className="ml-2">Déconnexion</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
