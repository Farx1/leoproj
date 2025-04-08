import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'Employés', path: '/employees', icon: 'group' },
    { name: 'Emails', path: '/emails', icon: 'email' },
    { name: 'Fichiers', path: '/files', icon: 'folder' },
    { name: 'Paramètres', path: '/settings', icon: 'settings' },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-dark shadow-lg"
    >
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-primary">
          <span className="text-white">Admin</span>Portal
        </h1>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="px-2 py-1">
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
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
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="material-icons">person</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
