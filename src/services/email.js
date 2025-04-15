import api from './api';
import { mockEmails } from '../data/mockData';

const EmailService = {
  // Récupérer tous les emails d'un dossier spécifique
  getByFolder: async (folder) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      const emails = mockEmails.filter(email => email.folder === folder);
      return { data: emails };
    } catch (error) {
      throw error;
    }
  },

  // Récupérer un email par son ID
  getById: async (id) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      const email = mockEmails.find(email => email.id === id);
      if (!email) {
        throw new Error('Email non trouvé');
      }
      // Marquer comme lu
      email.read = true;
      return { data: email };
    } catch (error) {
      throw error;
    }
  },

  // Envoyer un nouvel email
  send: async (emailData) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 800));
      const newEmail = {
        id: `email${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        from: {
          name: 'moi@example.com',
          email: 'moi@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
        date: new Date().toISOString(),
        read: true,
        folder: 'sent',
        attachments: emailData.attachments || []
      };
      mockEmails.push(newEmail);
      return { data: newEmail };
    } catch (error) {
      throw error;
    }
  },

  // Supprimer un email
  delete: async (id) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockEmails.findIndex(email => email.id === id);
      if (index === -1) {
        throw new Error('Email non trouvé');
      }
      mockEmails.splice(index, 1);
      return { data: { success: true } };
    } catch (error) {
      throw error;
    }
  },

  // Marquer un email comme lu/non lu
  markAsRead: async (id, isRead = true) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      const email = mockEmails.find(email => email.id === id);
      if (!email) {
        throw new Error('Email non trouvé');
      }
      email.read = isRead;
      return { data: email };
    } catch (error) {
      throw error;
    }
  }
};

export default EmailService;
