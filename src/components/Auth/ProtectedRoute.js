import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ requiredRoles }) => {
  const { currentUser, isAuthenticated, hasAnyRole } = useAuth();
  
  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Si des rôles sont requis et que l'utilisateur n'a pas les rôles nécessaires
  if (requiredRoles && requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    // Rediriger vers une page d'accès refusé ou la page d'accueil
    return <Navigate to="/access-denied" replace />;
  }
  
  // Si tout est OK, afficher le contenu de la route
  return <Outlet />;
};

export default ProtectedRoute;
