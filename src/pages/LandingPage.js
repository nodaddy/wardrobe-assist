import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Wardrobe } from './Wardrobe';
import { OutfitAdvice } from './OutfitAdvice';
import { Additions } from './Additions';
import Navbar from '../components/NavigationBar';
import { Settings } from './Settings';
import { logo } from '../assets';
import DemoSection from '../components/DemoSection';

function LandingPage() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = React.useState(`${localStorage.getItem('user') ? 'wardrobe' : 'home'}`);
  const [signingIn, setSigningIn] = useState(false);

  const onChange = (key) => {
    console.log(key);
    setCurrentView(key);
  };

  return (
    <>
      {localStorage.getItem('user') && <Navbar currentView={currentView} onChange={onChange} />}
      {currentView === 'home' ? (
        <div
          style={{
            backgroundImage: 'linear-gradient(to bottom, #fb9a7a, #f78c6b)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <br/>
            <img src={logo} alt="Logo" style={{ width: '150px', marginBottom: '-10px' }} />
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Unlock Your Fashion Potential</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '10px', lineHeight: '1.5' }}>
              Discover endless outfit possibilities and fashion advice.
              <br /> End indecisiveness with just a few taps.
            </p>
            <div style={{ marginTop: '30px' }}>
              <button
                style={{
                  background: '#ffffff',
                  color: '#fb9a7a',
                  padding: '12px 25px',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
                onClick={() => {
                  if (localStorage.getItem('user')) {
                    localStorage.removeItem('user');
                    navigate('/');
                  } else {
                    setSigningIn(true);
                    signInWithPopup(auth, provider)
                      .then((result) => {
                        const user = result.user;
                        localStorage.setItem('user', JSON.stringify(user));
                        console.log(user);
                        window.location.reload();
                      })
                      .catch((error) => {
                        console.error(error);
                        setSigningIn(false);
                      });
                  }
                }}
              >
                {localStorage.getItem('user') ? (
                  `Hi, ${JSON.parse(localStorage.getItem('user')).displayName.split(' ')[0]}`
                ) : (
                  <span>
                    <GoogleOutlined /> {signingIn ? <Spin indicator={<Loading3QuartersOutlined spin />} /> : 'Sign in with Google'}
                  </span>
                )}
              </button>
              <br/> 
            </div>
          </div>
          
          <div style={{
            marginTop: '50px',
            backgroundColor: '#fff',
            padding: '40px 20px',
            borderRadius: '15px 15px 0 0',
            textAlign: 'center',
            boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
          }}>
            <h2 style={{ color: '#fb9a7a', fontSize: '1.7rem', fontWeight: '500' }}>What Our Users Say</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '30px',
              flexWrap: 'wrap',
            }}>
              <div style={{
                maxWidth: '300px',
                margin: '10px',
                padding: '20px',
                backgroundColor: '#fef4f2',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}>
                <p style={{ fontStyle: 'italic', color: '#555' }}>
                  "This app has completely transformed my wardrobe. I never run out of ideas for outfits anymore!"
                </p>
                <h4 style={{ color: '#fb9a7a', marginTop: '10px' }}>- Sarah L.</h4>
              </div>
              <div style={{
                maxWidth: '300px',
                margin: '10px',
                padding: '20px',
                backgroundColor: '#fef4f2',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}>
                <p style={{ fontStyle: 'italic', color: '#555' }}>
                  "Amazing tool! It helped me decide what to wear for my big presentation. Highly recommend."
                </p>
                <h4 style={{ color: '#fb9a7a', marginTop: '10px' }}>- James P.</h4>
              </div>
              <div style={{
                maxWidth: '300px',
                margin: '10px',
                padding: '20px',
                backgroundColor: '#fef4f2',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}>
                <p style={{ fontStyle: 'italic', color: '#555' }}>
                  "Drobe is my go-to app for fashion advice. The suggestions are always on point!"
                </p>
                <h4 style={{ color: '#fb9a7a', marginTop: '10px' }}>- Emily R.</h4>
              </div>
            </div>
          </div>
          <DemoSection />
        </div>
      ) : currentView === 'wardrobe' ? (
        <Wardrobe />
      ) : currentView === 'outfitadvice' ? (
        <OutfitAdvice />
      ) : currentView === 'additions' ? (
        <Additions />
      ) : currentView === 'settings' ? (
        <Settings />
      ) : null}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  );
}

export default LandingPage;