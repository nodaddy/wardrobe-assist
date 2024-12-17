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

function App() {
  const [userProfile, setUserProfile] = useState({});
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
  return (
    <div className="App">
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
            <Route path="/*" element={<LandingPage />} />
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
