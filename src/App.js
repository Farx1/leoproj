import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Composants de mise en page
import Layout from './components/Layout/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AccessDenied from './pages/AccessDenied';

// Composant de route protégée
const ProtectedRoute = ({ element, roles = [] }) => {
  const { currentUser, hasAnyRole } = useAuth();
  
  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Si des rôles sont requis et que l'utilisateur n'a pas les rôles nécessaires
  if (roles.length > 0 && !hasAnyRole(roles)) {
    return <Navigate to="/access-denied" replace />;
  }
  
  return element;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      
      <Route path="/" element={<Layout />}>
        <Route index element={<ProtectedRoute element={<Dashboard />} />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
