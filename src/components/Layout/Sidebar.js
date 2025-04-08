import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { currentUser, hasAnyRole, logout } = useAuth();
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard', roles: [] }, // Accessible à tous
    { name: 'Employés', path: '/employees', icon: 'group', roles: ['admin', 'manager'] },
    { name: 'Emails', path: '/emails', icon: 'email', roles: ['admin', 'user'] },
    { name: 'Fichiers', path: '/files', icon: 'folder', roles: ['admin', 'user'] },
    { name: 'Paramètres', path: '/settings', icon: 'settings', roles: ['admin'] },
  ];

  // Filtrer les éléments du menu en fonction des rôles de l'utilisateur
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.length === 0 || hasAnyRole(item.roles)
  );

  return (
    <div className="w-64 bg-dark h-full flex flex-col">
      {/* Logo et titre */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
      </div>
      
      {/* Informations utilisateur */}
      <div className="p-4 border-b border-gray-800 flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
          {currentUser?.name?.charAt(0) || 'U'}
        </div>
        <div className="ml-3">
          <p className="text-white font-medium">{currentUser?.name || 'Utilisateur'}</p>
          <p className="text-gray-500 text-sm">{currentUser?.roles?.join(', ') || 'Aucun rôle'}</p>
        </div>
      </div>
      
      {/* Menu de navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {filteredMenuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:bg-dark-lighter hover:text-white'
                  }`
                }
              >
                <span className="material-icons mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Bouton de déconnexion */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center w-full p-3 rounded-lg text-gray-400 hover:bg-dark-lighter hover:text-white transition-colors"
        >
          <span className="material-icons mr-3">logout</span>
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
