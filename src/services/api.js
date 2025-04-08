import axios from 'axios';

// Création d'une instance axios avec la configuration de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Vérifier si l'erreur est due à un problème réseau
    if (!error.response) {
      console.log('Problème de connexion réseau détecté');
      return Promise.reject(error);
    }
    
    if (error.response.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  }
);

export default api;
