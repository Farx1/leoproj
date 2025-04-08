import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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
      <div className="flex justify-center items-center h-64 text-gray-400">
        <div className="text-center">
          <span className="material-icons text-6xl mb-4">inbox</span>
          <p>Aucun email dans cette boîte</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <ul className="divide-y divide-gray-800">
        {emails.map((email) => (
          <li key={email.id}>
            <button
              onClick={() => onEmailSelect(email)}
              className={`w-full text-left p-4 hover:bg-gray-800 transition-colors ${
                !email.read ? 'bg-gray-800/50' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-700 mr-3 flex-shrink-0">
                  {email.from.avatar ? (
                    <img src={email.from.avatar} alt={email.from.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary text-white">
                      {email.from.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className={`text-sm font-medium truncate ${!email.read ? 'text-white' : 'text-gray-400'}`}>
                      {email.from.name}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {format(new Date(email.date), 'dd MMM', { locale: fr })}
                    </span>
                  </div>
                  
                  <p className={`text-sm truncate ${!email.read ? 'text-white font-medium' : 'text-gray-400'}`}>
                    {email.subject}
                  </p>
                  
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {email.body.substring(0, 100)}...
                  </p>
                  
                  {email.attachments && email.attachments.length > 0 && (
                    <div className="flex items-center mt-2">
                      <span className="material-icons text-gray-500 text-xs mr-1">attachment</span>
                      <span className="text-xs text-gray-500">{email.attachments.length} pièce(s) jointe(s)</span>
                    </div>
                  )}
                </div>
                
                {!email.read && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 ml-2 mt-2"></div>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
