import api from './api';

const AuthService = {
  // Connexion utilisateur
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Récupérer l'utilisateur actuel
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Vérifier si l'utilisateur a un rôle spécifique
  hasRole: (role) => {
    const user = AuthService.getCurrentUser();
    if (!user) return false;
    return user.roles.includes(role);
  },

  // Vérifier si l'utilisateur a l'un des rôles spécifiés
  hasAnyRole: (roles) => {
    const user = AuthService.getCurrentUser();
    if (!user) return false;
    return user.roles.some(role => roles.includes(role));
  }
};

export default AuthService;
