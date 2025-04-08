import axios from 'axios';

// Déterminer l'URL de base en fonction de l'environnement
const getBaseUrl = () => {
  // En développement, utiliser localhost
  if (process.env.NODE_ENV === 'development') {
    console.log('API en mode développement: utilisation de données mockées');
    return 'http://localhost:3001/api';
  }
  
  // En production, utiliser l'URL configurée ou une URL par défaut
  return process.env.REACT_APP_API_URL || 'https://api.example.com';
};

// Création d'une instance axios avec la configuration de base
const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
  // Ajouter un timeout pour éviter les attentes infinies
  timeout: 10000
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
      // En développement, afficher plus de détails sur l'erreur
      if (process.env.NODE_ENV === 'development') {
        console.error('Détails de l\'erreur:', error);
      }
      return Promise.reject(error);
    }
    
    if (error.response.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/#/';
      window.location.href = `${baseUrl}login`;
    }
    
    // En développement, afficher les erreurs dans la console
    if (process.env.NODE_ENV === 'development') {
      console.error(`Erreur API ${error.response.status}:`, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
