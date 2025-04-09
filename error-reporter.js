(function () {
    function sendErrorToParent(errorData) {
      if (window.parent !== window) {
        window.parent.postMessage(
          { type: "runtime-error", error: errorData },
          "*"
        );
      }
    }

    window.onerror = function (message, source, lineno, colno, error) {
      sendErrorToParent({
        message,
        source,
        lineno,
        colno,
        stack: error ? error.stack : null,
      });
    };

    window.addEventListener("error", function (event) {
      sendErrorToParent({
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error ? event.error.stack : null,
      });
    });

    window.addEventListener("unhandledrejection", function (event) {
      sendErrorToParent({
        message: event.reason.message || "Unhandled promise rejection",
        stack: event.reason.stack || null,
      });
    });
  })();// Script de rapport d'erreurs pour le débogage
(function() {
  window.addEventListener('error', function(event) {
    console.error('Erreur globale capturée:', event.error);
    
    // Vous pourriez envoyer ces erreurs à un service de suivi
    if (navigator.onLine) {
      const errorDetails = {
        message: event.error?.message || 'Erreur inconnue',
        stack: event.error?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
      
      console.log('Détails de l\'erreur:', errorDetails);
      
      // Commenté pour l'instant - à activer si vous avez un endpoint de rapport d'erreurs
      /*
      fetch('/api/error-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorDetails)
      }).catch(err => console.error('Échec de l\'envoi du rapport d\'erreur:', err));
      */
    }
  });
  
  console.log('Système de rapport d\'erreurs initialisé');
})();
