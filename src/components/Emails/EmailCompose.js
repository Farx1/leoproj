import React, { useState } from 'react';

const EmailCompose = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pourriez envoyer l'email à une API
    console.log('Email envoyé:', emailData);
    // Réinitialiser le formulaire
    setEmailData({
      to: '',
      subject: '',
      body: ''
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="material-icons mr-2">edit</span>
        Nouveau message
      </h2>
      <form onSubmit={handleSubmit} className="bg-dark-darker p-4 rounded-lg">
        <div className="mb-4">
          <label htmlFor="to" className="block text-sm font-medium text-gray-400 mb-1">
            Destinataire
          </label>
          <input
            type="email"
            id="to"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            className="w-full bg-dark-darker border border-gray-700 rounded-lg p-2 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
            Objet
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            className="w-full bg-dark-darker border border-gray-700 rounded-lg p-2 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="body" className="block text-sm font-medium text-gray-400 mb-1">
            Message
          </label>
          <textarea
            id="body"
            name="body"
            value={emailData.body}
            onChange={handleChange}
            rows="10"
            className="w-full bg-dark-darker border border-gray-700 rounded-lg p-2 text-white"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            className="bg-dark hover:bg-gray-800 text-gray-300 px-4 py-2 rounded-lg flex items-center"
          >
            <span className="material-icons mr-2">save</span>
            Enregistrer
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
          >
            <span className="material-icons mr-2">send</span>
            Envoyer
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EmailCompose;
