import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simuler le chargement des notifications
  useEffect(() => {
    // Dans une vraie application, ce serait un appel API
    const mockNotifications = [
      {
        id: 1,
        title: 'Tâche urgente',
        message: 'La tâche "Mise à jour du site" est en retard',
        type: 'urgent',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false
      },
      {
        id: 2,
        title: 'Nouvelle tâche assignée',
        message: 'Vous avez été assigné à la tâche "Préparation du rapport mensuel"',
        type: 'task',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false
      },
      {
        id: 3,
        title: 'Réunion à venir',
        message: 'Réunion d\'équipe dans 30 minutes',
        type: 'meeting',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  // Marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };

  // Supprimer une notification
  const removeNotification = (id) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(notifications.filter(n => n.id !== id));
    if (!notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  // Formater la date relative
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) return 'à l\'instant';
    if (diffMin < 60) return `il y a ${diffMin} min`;
    if (diffHour < 24) return `il y a ${diffHour} h`;
    return `il y a ${diffDay} j`;
  };

  // Obtenir l'icône en fonction du type
  const getIcon = (type) => {
    switch (type) {
      case 'urgent':
        return '⚠️';
      case 'task':
        return '✅';
      case 'meeting':
        return '📅';
      default:
        return '🔔';
    }
  };

  // Obtenir la couleur en fonction du type
  const getColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'text-red-500';
      case 'task':
        return 'text-blue-500';
      case 'meeting':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="relative">
      <button 
        className="relative p-2 rounded-full hover:bg-dark-light transition-colors"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      <AnimatePresence>
        {showNotifications && (
          <motion.div 
            className="absolute right-0 mt-2 w-80 bg-dark-light rounded-lg shadow-lg z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 border-b border-dark-darker flex justify-between items-center">
              <h3 className="font-bold">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  className="text-xs text-primary hover:text-primary-focus"
                  onClick={markAllAsRead}
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-400">
                  Aucune notification
                </div>
              ) : (
                notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 border-b border-dark-darker hover:bg-dark-darker transition-colors ${!notification.read ? 'bg-dark-darker bg-opacity-50' : ''}`}
                  >
                    <div className="flex">
                      <div className={`mr-3 ${getColor(notification.type)}`}>
                        <span className="text-xl">{getIcon(notification.type)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex space-x-1">
                            {!notification.read && (
                              <button 
                                className="text-primary hover:text-primary-focus"
                                onClick={() => markAsRead(notification.id)}
                                title="Marquer comme lu"
                              >
                                <span className="text-sm">✓</span>
                              </button>
                            )}
                            <button 
                              className="text-gray-400 hover:text-gray-300"
                              onClick={() => removeNotification(notification.id)}
                              title="Supprimer"
                            >
                              <span className="text-sm">✕</span>
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                        <div className="text-xs text-gray-400 mt-1">
                          {formatRelativeTime(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-2 text-center border-t border-dark-darker">
              <button className="text-sm text-primary hover:text-primary-focus">
                Voir toutes les Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
