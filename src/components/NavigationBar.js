import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { AppstoreOutlined, BoxPlotOutlined, CiOutlined, HomeFilled, HomeOutlined, MessageOutlined, PlusCircleOutlined, SettingOutlined, ShopOutlined, SunOutlined } from '@ant-design/icons';

function Navbar() {
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
    <a style={{outline:'none'}} href="/" className="navbar-link">
      <HomeOutlined />
      <span style={{ color: 'grey', fontSize: '10px', marginTop: '5px' }}>Home</span>
    </a>
  </div>
  <div className="navbar-item">
    <a href="/wardrobe" className="navbar-link">
      <AppstoreOutlined />
      <span style={{ color: 'grey', fontSize: '10px', marginTop: '5px' }}>Wardrobe</span>
    </a>
  </div>
  <div className="navbar-item">
    <a href="/outfitadvice" className="navbar-link">
      <MessageOutlined />
      <span style={{ color: 'grey',  fontSize: '10px', marginTop: '5px'  }}>Assistant</span>
    </a>
  </div>
  <div className="navbar-item">
    <a href="/additions" className="navbar-link">
      <ShopOutlined />
      <span style={{ color: 'grey', fontSize: '10px', marginTop: '5px'  }}>Shop assist</span>
    </a>
  </div>
  {/* <div className="navbar-item">
    <a href="/settings" className="navbar-link">
      <SettingOutlined/>
      <span style={{ color: 'grey', fontSize: '14px', marginTop: '5px'  }}>Settings</span>
    </a>
  </div> */}
</nav>
  );
}

export default Navbar;