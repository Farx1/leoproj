import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Rediriger vers une page de résultats de recherche (à implémenter)
      // Pour l'instant, on peut rediriger vers une page existante
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <div className="relative">
      <div 
        className={`flex items-center transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-10'
        }`}
      >
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute left-0 top-0 h-full flex items-center justify-center text-gray-400 hover:text-white z-10"
        >
          <span className="material-icons">search</span>
        </button>
        
        <form onSubmit={handleSearch} className="w-full">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`bg-dark-light text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
              isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
