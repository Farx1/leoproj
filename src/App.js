import React, { useState } from 'react';

function App() {
  const [clicked, setClicked] = useState(false);
  
  return (
    <div style={{
      textAlign: 'center',
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#f5f5f5',
      padding: '20px'
    }}>
      <h1 style={{ color: '#ff6b00', marginBottom: '20px' }}>Admin Dashboard</h1>
      <p>L'application fonctionne correctement !</p>
      {clicked && (
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '15px', 
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <p>✅ Tout fonctionne parfaitement !</p>
        </div>
      )}
      <button 
        style={{
          backgroundColor: '#ff6b00',
          color: '#f5f5f5',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
        onClick={() => setClicked(true)}
      >
        Tester
      </button>
    </div>
  );
}

export default App;
