import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const EmailCompose = ({ onCancel, onSubmit }) => {
  const { hasRole } = useAuth();
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: ''
  });
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      file
    }));
    
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailData.to || !emailData.subject) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setLoading(true);
    
    try {
      await onSubmit({
        ...emailData,
        attachments
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      alert('Une erreur est survenue lors de l\'envoi de l\'email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Nouveau message</h2>
        
        <button
          onClick={onCancel}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
        >
          <span className="material-icons">close</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">À:</label>
          <input
            type="email"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Sujet:</label>
          <input
            type="text"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            required
          />
        </div>
        
        <div className="flex-1 mb-4">
          <label className="block text-gray-400 mb-2">Message:</label>
          <textarea
            name="body"
            value={emailData.body}
            onChange={handleChange}
            className="w-full h-64 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white resize-none"
          ></textarea>
        </div>
        
        {/* Pièces jointes */}
        {attachments.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Pièces jointes:</label>
            
            <div className="space-y-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3 flex items-center">
                  <span className="material-icons text-gray-400 mr-3">attachment</span>
                  <div>
                    <div className="text-white">{attachment.name}</div>
                    <div className="text-gray-400 text-sm">{attachment.size}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="ml-auto text-red-500 hover:text-red-400 p-1"
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-auto">
          <div>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <label
              htmlFor="file-upload"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center"
            >
              <span className="material-icons mr-2">attach_file</span>
              Joindre un fichier
            </label>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              disabled={loading}
            >
              Annuler
            </button>
            
            {hasRole('user') && (
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2">send</span>
                    Envoyer
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailCompose;
