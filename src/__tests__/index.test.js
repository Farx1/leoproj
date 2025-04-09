import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import App from '../App';

// Mock ReactDOM
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe('Index.js', () => {
  test('renders without crashing', () => {
    // Créer un élément div pour simuler le root
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    
    // Importer index.js pour déclencher son exécution
    require('../index');
    
    // Vérifier que createRoot a été appelé avec l'élément root
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(div);
    
    // Nettoyer
    document.body.removeChild(div);
  });
});
