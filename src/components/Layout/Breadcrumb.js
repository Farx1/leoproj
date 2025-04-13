import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Mapping des routes vers des noms plus lisibles
  const getPathName = (path) => {
    const pathMap = {
      'employees': 'Employés',
      'emails': 'Emails',
      'dashboard': 'Tableau de bord'
    };
    
    return pathMap[path] || path;
  };

  return (
    <div className="text-sm breadcrumbs mb-4">
      <ul>
        <li>
          <Link to="/" className="text-primary hover:text-primary-focus">
            <span className="material-icons text-sm mr-1">home</span>
            Accueil
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          
          // Si c'est un ID (pour les détails d'employé par exemple)
          if (value.match(/^[A-Z0-9]+$/)) {
            return (
              <li key={index}>
                <span className={isLast ? "font-medium" : ""}>
                  Détails
                </span>
              </li>
            );
          }
          
          return (
            <li key={index}>
              {isLast ? (
                <span className="font-medium">{getPathName(value)}</span>
              ) : (
                <Link to={to} className="text-primary hover:text-primary-focus">
                  {getPathName(value)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
