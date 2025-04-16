// Version temporaire sans axios pour résoudre les problèmes d'importation
// Cette version utilise fetch au lieu d'axios

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

// Version simplifiée de l'API sans axios
const api = {
  baseURL: getBaseUrl(),
  
  // Méthode GET
  get: async (url, config = {}) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
      
      const response = await fetch(`${api.baseURL}${url}`, {
        method: 'GET',
        headers,
        ...config
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/#/';
          window.location.href = `${baseUrl}login`;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // Méthode POST
  post: async (url, data, config = {}) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
      
      const response = await fetch(`${api.baseURL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        ...config
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/#/';
          window.location.href = `${baseUrl}login`;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // Méthode PUT
  put: async (url, data, config = {}) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
      
      const response = await fetch(`${api.baseURL}${url}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
        ...config
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/#/';
          window.location.href = `${baseUrl}login`;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // Méthode DELETE
  delete: async (url, config = {}) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
      
      const response = await fetch(`${api.baseURL}${url}`, {
        method: 'DELETE',
        headers,
        ...config
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/#/';
          window.location.href = `${baseUrl}login`;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default api;
