import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? '❮' : '❯'} {/* Flèche vers la gauche ou la droite */}
      </button>
      <div className="sidebar-content">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/Images/logoRond.png`} alt="Logo Rond" className="logo" />
        </div>
        {isOpen && (
          <>
            <div className="menu-item">Onglet 1</div>
            <div className="menu-item">Onglet 2</div>
            <div className="menu-item">Onglet 3</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;