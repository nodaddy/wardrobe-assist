import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { AppstoreOutlined, BoxPlotOutlined, CiOutlined, HomeFilled, HomeOutlined, MessageOutlined, PlusCircleOutlined, SettingOutlined, ShopOutlined, SunOutlined } from '@ant-design/icons';

function Navbar({onChange, currentView}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar-bottom">
         <div className="navbar-item">
    <span onClick={() => {
      onChange('home');
    }} style={{outline:'none', color: `${currentView === 'home' ? '#946d4c' : 'grey'}`}} href="/" className="navbar-link">
      <HomeOutlined style={{ fontSize: '18px'}}/>
      <span style={{ fontSize: '10px', marginTop: '5px' }}>Home</span>
    </span>
  </div>
  <div className="navbar-item">
    <span onClick={() => {
      onChange('wardrobe');
    }} href="/wardrobe" style={{color: currentView === 'wardrobe' ? '#946d4c' : 'grey'}} className="navbar-link">
      <AppstoreOutlined style={{  fontSize: '18px'}} />
      <span style={{ fontSize: '10px', marginTop: '5px' }}>Wardrobe</span>
    </span>
  </div>
  <div className="navbar-item">
    <span 
    onClick={() => {
      onChange('outfitadvice');
    }}
    href="/outfitadvice" style={{color: currentView === 'outfitadvice' ? '#946d4c' : 'grey'}} className="navbar-link">
      <MessageOutlined style={{ fontSize: '18px'}} />
      <span style={{  fontSize: '10px', marginTop: '5px'  }}>Assistant</span>
    </span>
  </div>
  <div className="navbar-item">
    <span
    onClick={() => {
      onChange('additions');
    }}
    href="/additions" style={{color: currentView === 'additions' ? '#946d4c' : 'grey'}} className="navbar-link">
      <ShopOutlined style={{ fontSize: '18px'}} />
      <span style={{ fontSize: '10px', marginTop: '5px'  }}>Shop assist</span>
    </span>
  </div>
    <div className="navbar-item">
    <span onClick={() => {
      onChange('settings');
    }} href="/settings" style={{color: currentView === 'settings' ? '#946d4c' : 'grey'}} className="navbar-link">
      <SettingOutlined style={{ fontSize: '18px'}}/>
      <span style={{ fontSize: '10px', marginTop: '5px'  }}>Settings</span>
    </span>
  </div> 
</nav>
  );
}

export default Navbar;