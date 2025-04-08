import { jwtDecode } from 'jwt-decode';

// Simulation d'une base de données utilisateurs pour le développement
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    roles: ['admin'],
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Manager User',
    roles: ['manager'],
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    roles: ['user'],
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

// Afficher les informations de connexion en mode développement
if (process.env.NODE_ENV === 'development') {
  console.log('Mode développement activé');
  console.log('Utilisateurs disponibles pour les tests:');
  mockUsers.forEach(user => {
    console.log(`- ${user.name} (${user.email} / ${user.password}) - Rôles: ${user.roles.join(', ')}`);
  });
}

// Génération d'un JWT pour le développement
const generateJWT = (user) => {
  // Créer le header et payload JWT
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const payload = {
    sub: user.id.toString(),
    name: user.name,
    email: user.email,
    roles: user.roles,
    avatar: user.avatar,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 // Expire dans 1 heure
  };
  
  // En développement, nous simulons un JWT sans signature réelle
  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(payload));
  const signature = 'MOCK_SIGNATURE_FOR_DEV'; // En production, ce serait une vraie signature
  
  return `${base64Header}.${base64Payload}.${signature}`;
};

const AuthService = {
  // Connexion utilisateur
  login: async (email, password) => {
    try {
      // Toujours utiliser les utilisateurs mockés pour la démo
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw { response: { data: { message: 'Identifiants invalides' } } };
      }
      
      // Générer un JWT
      const token = generateJWT(user);
      
      // Stocker uniquement le token dans localStorage
      localStorage.setItem('token', token);
      
      // Créer une version sécurisée de l'utilisateur (sans mot de passe)
      const safeUser = { ...user };
      delete safeUser.password;
      
      return { user: safeUser, token };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    // Rediriger vers la page de connexion avec HashRouter
    const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/#/';
    window.location.href = `${baseUrl}login`;
  },

  // Récupérer l'utilisateur actuel à partir du token JWT
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // Décoder le token JWT
      const decoded = jwtDecode(token);
      
      // Vérifier si le token est expiré
      if (decoded.exp * 1000 < Date.now()) {
        // Token expiré, déconnecter l'utilisateur
        AuthService.logout();
        return null;
      }
      
      // Construire l'objet utilisateur à partir des données du token
      return {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        roles: decoded.roles,
        avatar: decoded.avatar || `https://randomuser.me/api/portraits/men/${decoded.sub}.jpg`
      };
    } catch (e) {
      console.error('Erreur lors du décodage du token:', e);
      localStorage.removeItem('token');
      return null;
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (e) {
      localStorage.removeItem('token');
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
  },
  
  // Obtenir le token JWT
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default AuthService;
