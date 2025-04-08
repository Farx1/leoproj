import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EmailList from '../components/Emails/EmailList';
import EmailCompose from '../components/Emails/EmailCompose';

const Emails = () => {
  const [activeView, setActiveView] = useState('inbox');
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    // Simuler un chargement de données
    setTimeout(() => {
      setEmails(mockEmails);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewChange = (view) => {
    setActiveView(view);
    setSelectedEmail(null);
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div className="lg:col-span-1 bg-dark rounded-lg shadow-lg">
        <div className="border-b border-gray-700 p-4">
          <div className="flex space-x-4">
            {['inbox', 'sent', 'draft', 'trash'].map((view) => (
              <button
                key={view}
                className={`px-4 py-2 rounded-lg text-sm capitalize ${
                  activeView === view 
                    ? 'bg-primary text-white' 
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
                onClick={() => handleViewChange(view)}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
        
        <EmailList 
          emails={emails.filter(email => email.folder === activeView)}
          onEmailSelect={handleEmailSelect}
          loading={loading}
        />
      </div>

      <div className="lg:col-span-2 bg-dark rounded-lg shadow-lg">
        {selectedEmail ? (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedEmail(null)}
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <span className="text-primary font-bold">
                  {selectedEmail.sender.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-white">{selectedEmail.sender}</p>
                <p className="text-sm text-gray-400">{selectedEmail.email}</p>
              </div>
            </div>
            <div className="text-gray-300 leading-relaxed">
              {selectedEmail.body}
            </div>
          </div>
        ) : (
          <EmailCompose />
        )}
      </div>
    </motion.div>
  );
};

// Données fictives pour les emails
const mockEmails = [
  {
    id: 'EMAIL001',
    sender: 'Jean Dupont',
    email: 'jean.dupont@entreprise.fr',
    subject: 'Rapport mensuel',
    body: 'Voici le rapport mensuel pour le département IT. Merci de le consulter et de me faire part de vos commentaires.',
    date: '2023-06-15T10:30:00',
    folder: 'inbox',
    read: false
  },
  {
    id: 'EMAIL002',
    sender: 'Marie Martin',
    email: 'marie.martin@entreprise.fr',
    subject: 'Réunion de projet',
    body: 'Bonjour, je vous propose un point sur l\'avancement du projet de migration cloud. Pouvons-nous nous réunir cette semaine ?',
    date: '2023-06-14T15:45:00',
    folder: 'inbox',
    read: true
  },
  {
    id: 'EMAIL003',
    sender: 'Pierre Durand',
    email: 'pierre.durand@entreprise.fr',
    subject: 'Proposition marketing',
    body: 'J\'ai finalisé la proposition de campagne marketing pour le prochain trimestre. Merci de la consulter et de me donner votre avis.',
    date: '2023-06-13T09:15:00',
    folder: 'sent',
    read: true
  },
  {
    id: 'EMAIL004',
    sender: 'Sophie Petit',
    email: 'sophie.petit@entreprise.fr',
    subject: 'Rapport financier',
    body: 'Voici le rapport financier trimestriel. Quelques points importants à noter concernant nos dépenses et revenus.',
    date: '2023-06-12T14:20:00',
    folder: 'draft',
    read: false
  },
  {
    id: 'EMAIL005',
    sender: 'Thomas Bernard',
    email: 'thomas.bernard@entreprise.fr',
    subject: 'Stratégie de développement',
    body: 'Document de réflexion sur notre stratégie de développement pour les prochains mois. Vos commentaires sont les bienvenus.',
    date: '2023-06-11T11:00:00',
    folder: 'trash',
    read: true
  }
];

export default Emails;
