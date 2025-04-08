import api from './api';

// Données mockées pour le développement
const mockEmails = [
  {
    id: 'email001',
    from: {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    to: 'moi@example.com',
    subject: 'Réunion de projet',
    body: 'Bonjour,\n\nJe vous invite à une réunion de projet demain à 14h dans la salle de conférence.\n\nCordialement,\nJean',
    date: '2023-04-05T10:30:00',
    read: true,
    folder: 'inbox',
    attachments: []
  },
  {
    id: 'email002',
    from: {
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    to: 'moi@example.com',
    subject: 'Rapport trimestriel',
    body: 'Bonjour,\n\nVeuillez trouver ci-joint le rapport trimestriel.\n\nBien cordialement,\nMarie',
    date: '2023-04-04T15:45:00',
    read: false,
    folder: 'inbox',
    attachments: [
      { name: 'rapport_q1_2023.pdf', size: '2.4 MB' }
    ]
  },
  {
    id: 'email003',
    from: {
      name: 'Pierre Durand',
      email: 'pierre.durand@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    to: 'moi@example.com',
    subject: 'Nouvelle campagne marketing',
    body: 'Bonjour,\n\nJ\'aimerais discuter avec vous de la nouvelle campagne marketing.\n\nÀ bientôt,\nPierre',
    date: '2023-04-03T09:15:00',
    read: true,
    folder: 'inbox',
    attachments: []
  },
  {
    id: 'email004',
    from: {
      name: 'moi@example.com',
      email: 'moi@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    to: 'sophie.leroy@example.com',
    subject: 'Demande de congés',
    body: 'Bonjour Sophie,\n\nJe souhaiterais poser des congés du 15 au 20 mai.\n\nMerci d\'avance,\nMoi',
    date: '2023-04-02T11:20:00',
    read: true,
    folder: 'sent',
    attachments: []
  },
  {
    id: 'email005',
    from: {
      name: 'Thomas Bernard',
      email: 'thomas.bernard@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    to: 'moi@example.com',
    subject: 'Entretien annuel',
    body: 'Bonjour,\n\nJe vous rappelle que votre entretien annuel est prévu le 10 avril à 10h.\n\nCordialement,\nThomas',
    date: '2023-04-01T14:00:00',
    read: true,
    folder: 'inbox',
    attachments: [
      { name: 'formulaire_entretien.docx', size: '1.2 MB' }
    ]
  }
];

const EmailService = {
  // Récupérer tous les emails d'un dossier spécifique
  getByFolder: async (folder) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500));
        const emails = mockEmails.filter(email => email.folder === folder);
        return { data: emails };
      } else {
        return await api.get(`/emails?folder=${folder}`);
      }
    } catch (error) {
      throw error;
    }
  },

  // Récupérer un email par son ID
  getById: async (id) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 300));
        const email = mockEmails.find(email => email.id === id);
        if (!email) {
          throw new Error('Email non trouvé');
        }
        // Marquer comme lu
        email.read = true;
        return { data: email };
      } else {
        return await api.get(`/emails/${id}`);
      }
    } catch (error) {
      throw error;
    }
  },

  // Envoyer un nouvel email
  send: async (emailData) => {
    try {
      if (process.env.NODE_ENV === 'development') {
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
      } else {
        return await api.post('/emails', emailData);
      }
    } catch (error) {
      throw error;
    }
  },

  // Supprimer un email
  delete: async (id) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockEmails.findIndex(email => email.id === id);
        if (index === -1) {
          throw new Error('Email non trouvé');
        }
        mockEmails.splice(index, 1);
        return { data: { success: true } };
      } else {
        return await api.delete(`/emails/${id}`);
      }
    } catch (error) {
      throw error;
    }
  },

  // Marquer un email comme lu/non lu
  markAsRead: async (id, isRead = true) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 300));
        const email = mockEmails.find(email => email.id === id);
        if (!email) {
          throw new Error('Email non trouvé');
        }
        email.read = isRead;
        return { data: email };
      } else {
        return await api.patch(`/emails/${id}`, { read: isRead });
      }
    } catch (error) {
      throw error;
    }
  }
};

export default EmailService;
