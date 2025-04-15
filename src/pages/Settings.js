import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    bio: currentUser?.bio || ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    marketingEmails: false
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30'
  });
  const [themeSettings, setThemeSettings] = useState({
    theme: 'dark',
    fontSize: 'medium',
    colorScheme: 'blue'
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleThemeChange = (e) => {
    const { name, value } = e.target;
    setThemeSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler la sauvegarde des paramètres
    console.log('Profil mis à jour:', profileForm);
    console.log('Notifications:', notificationSettings);
    console.log('Sécurité:', securitySettings);
    console.log('Thème:', themeSettings);
    
    // Afficher un message de succès
    alert('Paramètres sauvegardés avec succès!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>
      
      <div className="bg-dark rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profil
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'notifications' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'security' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('security')}
          >
            Sécurité
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'appearance' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('appearance')}
          >
            Apparence
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">
                  Nom complet
                </label>
                <input
                  className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-primary"
                  id="name"
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  placeholder="Votre nom"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-primary"
                  id="email"
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  placeholder="Votre email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="phone">
                  Téléphone
                </label>
                <input
                  className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-primary"
                  id="phone"
                  type="tel"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  placeholder="Votre numéro de téléphone"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="bio">
                  Biographie
                </label>
                <textarea
                  className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-primary"
                  id="bio"
                  name="bio"
                  rows="4"
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  placeholder="Quelques mots à propos de vous"
                ></textarea>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
                  type="submit"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'notifications' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="ml-2 text-white">Notifications par email</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onChange={handleNotificationChange}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="ml-2 text-white">Notifications push</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="weeklyDigest"
                    checked={notificationSettings.weeklyDigest}
                    onChange={handleNotificationChange}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="ml-2 text-white">Résumé hebdomadaire</span>
                </label>
              </div>
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onChange={handleNotificationChange}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="ml-2 text-white">Emails marketing et promotions</span>
                </label>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
                  type="submit"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'security' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onChange={handleSecurityChange}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="ml-2 text-white">Authentification à deux facteurs</span>
                </label>
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="sessionTimeout">
                  Délai d'expiration de session (minutes)
                </label>
                <select
                  className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-primary"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  value={securitySettings.sessionTimeout}
                  onChange={handleSecurityChange}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 heure</option>
                  <option value="120">2 heures</option>
                </select>
              </div>
              <div className="mb-6">
                <button
                  type="button"
                  className="text-primary hover:text-primary-light font-medium"
                >
                  Changer le mot de passe
                </button>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
                  type="submit"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'appearance' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="theme">
                  Thème
                </label>
                <select
                  className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-primary"
                  id="theme"
                  name="theme"
                  value={themeSettings.theme}
                  onChange={handleThemeChange}
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="system">Système</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="fontSize">
                  Taille de police
                </label>
                <select
                  className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-primary"
                  id="fontSize"
                  name="fontSize"
                  value={themeSettings.fontSize}
                  onChange={handleThemeChange}
                >
                  <option value="small">Petite</option>
                  <option value="medium">Moyenne</option>
                  <option value="large">Grande</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="colorScheme">
                  Schéma de couleurs
                </label>
                <select
                  className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-primary"
                  id="colorScheme"
                  name="colorScheme"
                  value={themeSettings.colorScheme}
                  onChange={handleThemeChange}
                >
                  <option value="blue">Bleu</option>
                  <option value="green">Vert</option>
                  <option value="purple">Violet</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
                  type="submit"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
