import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const EmailList = ({ emails, onEmailSelect, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader">Chargement...</div>
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
      {emails.map((email) => (
        <div
          key={email.id}
          className={`p-4 border-b border-gray-700 hover:bg-dark-darker cursor-pointer ${
            !email.read ? 'bg-dark-darker/50' : ''
          }`}
          onClick={() => onEmailSelect(email)}
        >
          <div className="flex justify-between items-start mb-1">
            <h3 className={`font-medium ${!email.read ? 'font-bold text-white' : 'text-gray-300'}`}>
              {email.sender}
            </h3>
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
        </div>
      ))}
    </div>
  );
};

export default EmailList;
