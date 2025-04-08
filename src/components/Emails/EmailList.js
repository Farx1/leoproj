import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

const EmailList = ({ emails, onEmailSelect, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="text-center text-gray-400 p-6">
        <span className="material-icons text-4xl mb-2">inbox</span>
        <p>Aucun email dans ce dossier</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
      {emails.map((email, index) => (
        <motion.div
          key={email.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`p-4 border-b border-gray-700 hover:bg-dark-darker cursor-pointer ${
            !email.read ? 'bg-dark-darker/50' : ''
          }`}
          onClick={() => onEmailSelect(email)}
        >
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center">
              {!email.read && (
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              )}
              <h3 className={`font-medium ${!email.read ? 'font-bold text-white' : 'text-gray-300'}`}>
                {email.sender}
              </h3>
            </div>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(email.date), { addSuffix: true, locale: fr })}
            </span>
          </div>
          <h4 className={`text-sm mb-1 ${!email.read ? 'font-semibold text-white' : 'text-gray-300'}`}>
            {email.subject}
          </h4>
          <p className="text-xs text-gray-400 truncate">
            {email.body.substring(0, 100)}...
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default EmailList;
