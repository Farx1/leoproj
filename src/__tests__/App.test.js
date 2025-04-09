import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Admin Dashboard/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the status message', () => {
    render(<App />);
    const statusElement = screen.getByText(/L'application fonctionne correctement/i);
    expect(statusElement).toBeInTheDocument();
  });

  test('button click shows success message', () => {
    render(<App />);
    
    // Le message de succès ne devrait pas être visible initialement
    const successMessageBefore = screen.queryByText(/Tout fonctionne parfaitement/i);
    expect(successMessageBefore).not.toBeInTheDocument();
    
    // Cliquer sur le bouton
    const button = screen.getByText(/Tester/i);
    fireEvent.click(button);
    
    // Le message de succès devrait maintenant être visible
    const successMessageAfter = screen.getByText(/Tout fonctionne parfaitement/i);
    expect(successMessageAfter).toBeInTheDocument();
  });
});
