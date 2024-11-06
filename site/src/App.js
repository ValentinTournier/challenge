// Dans App.js ou votre composant principal
import React from 'react';
import './App.css';
import ChatBar from './ChatBar';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/Images/logoNom.png" alt="Logo" className="logo" />
      </header>
      {
        <ChatBar />
      }
    </div>
  );
}

export default App;
