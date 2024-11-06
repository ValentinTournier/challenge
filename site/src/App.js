import React from 'react';
import './App.css';
import ChatBar from './ChatBar';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar /> {/* Barre latérale affichée à gauche */}
      <div className="main-content">
        <ChatBar /> {/* Contenu principal de l'application */}
      </div>
    </div>
  );
}

export default App;
