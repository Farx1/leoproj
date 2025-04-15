const path = require('path');

// Configuration principale de webpack
module.exports = function override(config, env) {
  // Aucune modification spécifique à webpack ici
  return config;
};

// Configuration spécifique pour webpack-dev-server
const overrideDevServer = (config) => {
  // Créer une nouvelle configuration sans les options dépréciées
  const newConfig = { ...config };
  
  // Supprimer explicitement les options dépréciées
  delete newConfig.onBeforeSetupMiddleware;
  delete newConfig.onAfterSetupMiddleware;
  
  // Ajouter la nouvelle option setupMiddlewares
  newConfig.setupMiddlewares = (middlewares, devServer) => {
    // Préserver la fonctionnalité des anciennes options si elles existaient
    if (config.onBeforeSetupMiddleware) {
      config.onBeforeSetupMiddleware(devServer);
    }
    
    // Ici, vous pouvez ajouter des middlewares personnalisés si nécessaire
    
    if (config.onAfterSetupMiddleware) {
      config.onAfterSetupMiddleware(devServer);
    }
    
    return middlewares;
  };
  
  return newConfig;
};

// Exporter la configuration du serveur de développement
module.exports.overrideDevServer = overrideDevServer;
