const path = require('path');

module.exports = function override(config, env) {
  // Mise à jour de la configuration webpack-dev-server
  if (config.devServer) {
    // Remplacer onBeforeSetupMiddleware et onAfterSetupMiddleware par setupMiddlewares
    delete config.devServer.onBeforeSetupMiddleware;
    delete config.devServer.onAfterSetupMiddleware;
    
    config.devServer.setupMiddlewares = (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      
      // Ajouter vos middlewares personnalisés ici si nécessaire
      
      return middlewares;
    };
  }
  
  return config;
};

// Fix for webpack-dev-server deprecation warnings
const overrideDevServer = (config) => {
  return {
    ...config,
    // Remove deprecated options
    onBeforeSetupMiddleware: undefined,
    onAfterSetupMiddleware: undefined,
    // Use the new setupMiddlewares option
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      return middlewares;
    },
  };
};

module.exports.overrideDevServer = overrideDevServer;
