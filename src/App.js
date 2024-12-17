import logo from './logo.svg';
import './App.css';
import Navbar from './components/NavigationBar';
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Wardrobe } from './pages/Wardrobe';
import { OutfitAdvice } from './pages/OutfitAdvice';
import { Additions } from './pages/Additions';
import { Settings } from './pages/Settings';
import React, { useEffect, useState } from 'react';
import { getUserProfile } from './services/profileService';
import UserDetailsForm from './components/UserDetailsForm';
import { AppstoreAddOutlined, MobileOutlined } from '@ant-design/icons';

function App() {
  const [userProfile, setUserProfile] = useState({});
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    getUserProfile().then((data) => {
      if(data == null){
        localStorage.removeItem('userProfile');
        setUserProfile(null);
      }
      localStorage.setItem('userProfile', JSON.stringify(data));
    }).catch((error) => {
      console.log(error);
    })
  })


  //pwa
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the browser's default install prompt
      event.preventDefault();
      // Save the event for triggering later
      setDeferredPrompt(event);
      // Show the install button
      setShowInstallButton(true);
    };

    // Listen for the `beforeinstallprompt` event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      // Hide the install button after the prompt
      setShowInstallButton(false);
      setDeferredPrompt(null);
    }
  };


  return (
    <div className="App">
      {showInstallButton && (
        <button onClick={handleInstallClick} className='install-button'>
         <AppstoreAddOutlined /> Install App
        </button>
      )}
      {
        !userProfile && localStorage.getItem('user') && <div style={{
          height: '100vh',
          overflowY: 'auto',
          width: '100%', 
        }}>
          <UserDetailsForm />

        </div>
      } 
        <BrowserRouter>
        {/* <Navbar/> */}
        {
          !localStorage.getItem('user') ? 
          <Routes>
            <Route path="/*" element={<><LandingPage /></>} />
          </Routes> :
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/outfitadvice" element={<OutfitAdvice />} />
            <Route path="/additions" element={<Additions />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        }
        </BrowserRouter>
    </div>
  );
}

export default App;
