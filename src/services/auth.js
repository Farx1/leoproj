import api from './api';

// Simulation d'une base de données utilisateurs pour le développement
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    roles: ['admin']
  },
  {
    id: 2,
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Manager User',
    roles: ['manager']
  },
  {
    id: 3,
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    roles: ['user']
  }
];

// Génération d'un token simple (à remplacer par JWT dans une vraie application)
const generateToken = (user) => {
  return btoa(JSON.stringify({
    id: user.id,
    email: user.email,
    exp: new Date().getTime() + 3600000 // Expire dans 1 heure
  }));
};

const AuthService = {
  // Connexion utilisateur
  login: async (email, password) => {
    try {
      // En environnement de développement, utiliser les utilisateurs mockés
      if (process.env.NODE_ENV === 'development') {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
          throw { response: { data: { message: 'Identifiants invalides' } } };
        }
        
        // Créer une version sécurisée de l'utilisateur (sans mot de passe)
        const safeUser = { ...user };
        delete safeUser.password;
        
        const token = generateToken(user);
        
        // Stocker dans localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(safeUser));
        
        return { user: safeUser, token };
      } else {
        // En production, appeler l'API réelle
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
      }
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
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Vérifier si le token est expiré
    try {
      const tokenData = JSON.parse(atob(token));
      return tokenData.exp > new Date().getTime();
    } catch (e) {
      return false;
    }
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
