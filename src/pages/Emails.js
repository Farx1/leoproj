import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import EmailList from '../components/Emails/EmailList';
import EmailCompose from '../components/Emails/EmailCompose';
import EmailService from '../services/email';
import { useAuth } from '../contexts/AuthContext';

const Emails = () => {
  const { hasRole } = useAuth();
  const [activeView, setActiveView] = useState('inbox');
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showComposeForm, setShowComposeForm] = useState(false);

  useEffect(() => {
    fetchEmails(activeView);
  }, [activeView]);

  const fetchEmails = async (folder) => {
    try {
      setLoading(true);
      const response = await EmailService.getByFolder(folder);
      setEmails(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setSelectedEmail(null);
  };

  const handleEmailSelect = async (email) => {
    try {
      if (!email.read) {
        await EmailService.markAsRead(email.id);
      }
      setSelectedEmail(email);
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'email:', error);
    }
  };

  const handleComposeEmail = () => {
    setShowComposeForm(true);
    setSelectedEmail(null);
  };

  const handleSendEmail = async (emailData) => {
    try {
      setLoading(true);
      await EmailService.send(emailData);
      setShowComposeForm(false);
      if (activeView === 'sent') {
        fetchEmails('sent');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmail = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet email ?')) {
      try {
        setLoading(true);
        await EmailService.delete(id);
        if (selectedEmail && selectedEmail.id === id) {
          setSelectedEmail(null);
        }
        fetchEmails(activeView);
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'email:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Emails</h1>
        
        {hasRole('user') && (
          <button
            onClick={handleComposeEmail}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
          >
            <span className="material-icons mr-2">edit</span>
            Nouveau message
          </button>
        )}
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-dark rounded-lg overflow-hidden h-full">
            <div className="p-4">
              <button
                onClick={handleComposeEmail}
                className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg flex items-center justify-center mb-4"
              >
                <span className="material-icons mr-2">edit</span>
                Nouveau message
              </button>
              
              <nav>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => handleViewChange('inbox')}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        activeView === 'inbox'
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <span className="material-icons mr-3">inbox</span>
                      Boîte de réception
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleViewChange('sent')}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        activeView === 'sent'
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <span className="material-icons mr-3">send</span>
                      Messages envoyés
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleViewChange('drafts')}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        activeView === 'drafts'
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <span className="material-icons mr-3">drafts</span>
                      Brouillons
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleViewChange('trash')}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        activeView === 'trash'
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <span className="material-icons mr-3">delete</span>
                      Corbeille
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Liste des emails et détails */}
        <div className="lg:col-span-3 h-full">
          {showComposeForm ? (
            <div className="bg-dark rounded-lg overflow-hidden h-full">
              <EmailCompose 
                onCancel={() => setShowComposeForm(false)} 
                onSubmit={handleSendEmail}
              />
            </div>
          ) : (
            <div className="bg-dark rounded-lg overflow-hidden h-full flex flex-col md:flex-row">
              {/* Liste des emails */}
              <div className={`w-full ${selectedEmail ? 'hidden md:block md:w-2/5' : ''} border-r border-gray-800`}>
                <EmailList 
                  emails={emails} 
                  onEmailSelect={handleEmailSelect} 
                  loading={loading}
                />
              </div>
              
              {/* Détails de l'email */}
              {selectedEmail ? (
                <div className="w-full md:w-3/5 flex flex-col h-full">
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <button
                      onClick={() => setSelectedEmail(null)}
                      className="md:hidden bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
                    >
                      <span className="material-icons">arrow_back</span>
                    </button>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteEmail(selectedEmail.id)}
                        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
                        title="Supprimer"
                      >
                        <span className="material-icons">delete</span>
                      </button>
                      
                      <button
                        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
                        title="Archiver"
                      >
                        <span className="material-icons">archive</span>
                      </button>
                      
                      <button
                        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
                        title="Marquer comme non lu"
                      >
                        <span className="material-icons">mark_email_unread</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 overflow-y-auto flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">{selectedEmail.subject}</h2>
                    
                    <div className="flex items-center mb-6">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-700 mr-3">
                        {selectedEmail.from.avatar ? (
                          <img src={selectedEmail.from.avatar} alt={selectedEmail.from.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-primary text-white">
                            {selectedEmail.from.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="text-white font-medium">{selectedEmail.from.name}</div>
                        <div className="text-gray-400 text-sm flex items-center">
                          <span>{selectedEmail.from.email}</span>
                          <span className="mx-2">•</span>
                          <span>{format(new Date(selectedEmail.date), 'dd MMMM yyyy à HH:mm', { locale: fr })}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-white whitespace-pre-line mb-6">
                      {selectedEmail.body}
                    </div>
                    
                    {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-white mb-3">Pièces jointes</h3>
                        
                        <div className="space-y-2">
                          {selectedEmail.attachments.map((attachment, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg p-3 flex items-center">
                              <span className="material-icons text-gray-400 mr-3">attachment</span>
                              <div>
                                <div className="text-white">{attachment.name}</div>
                                <div className="text-gray-400 text-sm">{attachment.size}</div>
                              </div>
                              <button className="ml-auto bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg">
                                <span className="material-icons">download</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {hasRole('user') && (
                    <div className="p-4 border-t border-gray-800">
                      <button
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
                      >
                        <span className="material-icons mr-2">reply</span>
                        Répondre
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full md:w-3/5 flex items-center justify-center p-6 text-gray-400">
                  <div className="text-center">
                    <span className="material-icons text-6xl mb-4">email</span>
                    <p>Sélectionnez un email pour afficher son contenu</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Emails;
