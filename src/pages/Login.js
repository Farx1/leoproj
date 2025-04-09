import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, loading, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Rediriger si déjà connecté
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  const from = location.state?.from?.pathname || '/';
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(credentials.email, credentials.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants invalides');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-darker p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-dark rounded-lg shadow-xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Connectez-vous pour accéder à votre espace</p>
        </div>
        
        {error && (
          <div className="bg-red-900/50 text-red-300 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-darker border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="votre@email.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-darker border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </span>
            ) : 'Se connecter'}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Utilisateurs de démonstration :</p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="text-xs bg-dark-darker p-2 rounded">
              admin@example.com / admin123
            </div>
            <div className="text-xs bg-dark-darker p-2 rounded">
              manager@example.com / manager123
            </div>
            <div className="text-xs bg-dark-darker p-2 rounded">
              user@example.com / user123
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
