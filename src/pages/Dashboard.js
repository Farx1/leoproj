import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Carte statistique - Employés */}
          <div className="bg-dark rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Total Employés</p>
                <h3 className="text-2xl font-bold text-white">125</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-icons text-primary">group</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm">+5% </span>
              <span className="text-gray-400 text-sm">depuis le mois dernier</span>
            </div>
          </div>
          
          {/* Carte statistique - Emails */}
          <div className="bg-dark rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Emails non lus</p>
                <h3 className="text-2xl font-bold text-white">42</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-icons text-primary">email</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-red-500 text-sm">+12% </span>
              <span className="text-gray-400 text-sm">depuis hier</span>
            </div>
          </div>
          
          {/* Carte statistique - Fichiers */}
          <div className="bg-dark rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Fichiers stockés</p>
                <h3 className="text-2xl font-bold text-white">1,254</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-icons text-primary">folder</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm">+8% </span>
              <span className="text-gray-400 text-sm">depuis la semaine dernière</span>
            </div>
          </div>
          
          {/* Carte statistique - Espace disque */}
          <div className="bg-dark rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Espace utilisé</p>
                <h3 className="text-2xl font-bold text-white">45.8 GB</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-icons text-primary">storage</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-gray-400 text-sm mt-1">65% de l'espace total</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Activité récente</h2>
          <div className="bg-dark rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start border-b border-gray-700 pb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="material-icons text-primary">
                      {['person', 'email', 'folder', 'edit', 'delete'][item % 5]}
                    </span>
                  </div>
                  <div>
                    <p className="text-white">
                      {[
                        'Jean Dupont a mis à jour son profil',
                        'Nouveau message de Marie Martin',
                        'Pierre Durand a partagé un fichier',
                        'Sophie Petit a modifié un document',
                        'Un fichier a été supprimé par l\'administrateur'
                      ][item % 5]}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {`Il y a ${item * 10} minutes`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
