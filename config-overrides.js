const path = require('path');

// Configuration principale de webpack
module.exports = function override(config, env) {
  // Aucune modification spécifique à webpack ici
  return config;
};

// Configuration spécifique pour webpack-dev-server
const overrideDevServer = (config) => {
  // Créer une nouvelle configuration sans les options dépréciées
  const newConfig = {};
  
  // Copier toutes les propriétés sauf celles qui sont dépréciées
  for (const key in config) {
    if (key !== 'onBeforeSetupMiddleware' && key !== 'onAfterSetupMiddleware') {
      newConfig[key] = config[key];
    }
  }
  
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

// Ajouter une configuration pour le serveur de développement webpack 5
module.exports.devServer = function(configFunction) {
  return function(proxy, allowedHost) {
    const config = configFunction(proxy, allowedHost);
    
    // Supprimer les options dépréciées
    delete config.onBeforeSetupMiddleware;
    delete config.onAfterSetupMiddleware;
    
    // Ajouter la nouvelle option setupMiddlewares
    config.setupMiddlewares = (middlewares, devServer) => {
      return middlewares;
    };
    
    return config;
  };
};
