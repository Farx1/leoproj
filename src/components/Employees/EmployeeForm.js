import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onClose, onSave }) => {
  const isEditing = !!employee;
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    position: '',
    department: '',
    status: 'Actif',
    phone: '',
    joinDate: '',
    avatar: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation de base
    if (!formData.name || !formData.email || !formData.position || !formData.department) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    onSave(formData);
  };

  const departments = ['IT', 'Marketing', 'Finance', 'RH', 'Opérations', 'Ventes'];
  const statuses = ['Actif', 'En congé', 'Inactif'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {isEditing ? 'Modifier un employé' : 'Ajouter un employé'}
        </h2>
        
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <span className="material-icons">close</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-2">Nom complet *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Poste *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Département *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
              required
            >
              <option value="">Sélectionner un département</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Statut</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Date d'embauche</label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">URL de l'avatar</label>
            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Annuler
          </button>
          
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
