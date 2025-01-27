import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AppstoreAddOutlined, ArrowRightOutlined, DownloadOutlined, EnterOutlined, FacebookOutlined, GoogleOutlined, InstagramOutlined, Loading3QuartersOutlined, XOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import { Wardrobe } from './Wardrobe';
import { OutfitAdvice } from './OutfitAdvice';
import { Additions } from './Additions';
import Navbar from '../components/NavigationBar';
import { Settings } from './Settings';
import { logo } from '../assets';
import DemoSection from '../components/DemoSection';
import PricingPage from '../components/PricingPage';
import { OutfitsCollection } from './OutfitsCollection';

function LandingPage() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = React.useState(`${localStorage.getItem('user') ? 'wardrobe' : 'home'}`);
  const [signingIn, setSigningIn] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState();

  const onChange = (key) => {
    console.log(key);
    setCurrentView(key);
  };

  return (
    <>
      {localStorage.getItem('user') ? <Navbar currentView={currentView} onChange={onChange} /> : <div style={{width: '100vw', height: '66px', backgroundColor: 'whitesmoke', position: 'fixed', bottom: '0px', zIndex: '999'}}></div>}
      {currentView === 'home' ? (
        <div
          style={{
            backgroundImage: 'linear-gradient(to bottom, #fb9a7a, #f78c6b)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            paddingTop: '100px',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          <>
          <div
        style={{
          backgroundColor: 'white',
          position: 'fixed',
          top: '0px',
          color: '#fff',
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Poppins, sans-serif',
          zIndex: 999999
        }}
      >
        <img src={logo} alt="Logo" style={{ width: '90px' }} />
        <div style={{display: 'flex', alignItems: 'center'}}>
        <div>
          <button
            style={{
              backgroundColor: '#fff',
              color: '#fb9a7a',
              padding: '6px 12px',
              border: localStorage.getItem('user') ? '1px solid #fb9a7a': '0px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '10px',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.1)';
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
          >{localStorage.getItem('user') ? (
              `Hi, ${JSON.parse(localStorage.getItem('user')).displayName.split(' ')[0]}`
            ) : (
              <span style={{display: 'flex', alignItems: 'center'}}>
                {/* <GoogleOutlined /> {signingIn ? <>&nbsp;<Spin indicator={<Loading3QuartersOutlined style={{ fontSize: 15, color: 'grey'}} spin />} /></> : <>&nbsp; Sign in with Google &nbsp;</>} */}
              </span>
            )}
          </button>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          &nbsp;
            <span style={{cursor: 'pointer', color: 'grey', fontSize: '20px'}}><InstagramOutlined /></span>
            &nbsp;
            &nbsp;
            <span style={{cursor: 'pointer', color: 'grey', fontSize: '20px'}}><XOutlined /></span>
            &nbsp;
            &nbsp;
            <span style={{cursor: 'pointer', color: 'grey', fontSize: '20px'}}><FacebookOutlined /></span>
            &nbsp;
            &nbsp;
            &nbsp;
            </div>
            </div>
      </div>
          
          <div style={{ textAlign: 'center' }}>
            {/* <img src={logo} alt="Logo" style={{ width: '150px', marginBottom: '-10px' }} /> */}
            <br/>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '500' }}>Personal Stylist for Everyone</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '10px', lineHeight: '1.5' }}>
              Create your digital wardrobe and discover endless outfit possibilities and fashion advices.
            </p>
            
             <div style={{ marginTop: '45px' }}>
               <button
                style={{
                  background: 'whitesmoke',
                  color: '#fb9a7a',
                  padding: '10px 25px',
                  border: 'none',
                  borderRadius: '10px',
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
                    // localStorage.removeItem('user');
                    // navigate('/wardrobe');
                    window.location.reload();
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
                  <span> Explore </span>
                ) : (
                  <span style={{display: 'flex', alignItems: 'center'}}>
                    <img 
                    style={{width: '25px'}}
                    src="data:image/jpeg;base64,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"
                    />
                    &nbsp;
                    &nbsp;
                    
                    {signingIn ? <Spin indicator={<Loading3QuartersOutlined spin />} /> : 'Sign in with Google'}
                  </span>
                )}
              </button> 
            </div>
          </div>
          </>

          <div style={{
            marginTop: '50px',
            backgroundColor: 'white',
            textAlign: 'center',
            boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
          }}>
             {/* <div style={{background: 'white', color: 'red', padding: '20px'}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            An animation to show how the app works or little funky jist of it
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div> */}
          <br/>
          <br/>
          <span style={{color: 'grey', fontSize: '18px'}} onClick={() => {
            setShowDownloadModal(true);
          }}><DownloadOutlined /> Download App </span>
          <Modal open={showDownloadModal}
          footer={[]}
          onCancel={() => {
            setShowDownloadModal(false);
          }}> 
            <br/>
            <br/>
            Open www.neensta.com in chrome, you will see a green button at bottom left of the screen to download the app
           
          </Modal>
            <h6 align="left" style={{paddingLeft: '20px', paddingTop: '0px', color: 'grey', fontSize: '1.3rem', fontWeight: '500', border: '0px solid silver' }}>
              What Our Users Say</h6>
            <div style={{
  display: 'flex',
  overflowX: 'auto',
  paddingLeft: '0px',
  // gap: '10px',
  width: '100vw',
   paddingBottom: '20px',
   marginTop: '-30px'
}}>
  <div style={{
    maxWidth: '300px',
    margin: '10px',
    marginLeft: '20px',
    padding: '13px',
    backgroundColor: '#fef4f2',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    flex: '0 0 auto',
  }}>
    <p style={{ fontStyle: 'italic', color: '#555' }}>
      "Oh this app! It's like totally ending my indecisiveness around what to wear and what to buy next to complement my wardrobe, good investment for personality improvement."
    </p>
    <h4 style={{ color: '#fb9a7a', marginTop: '10px' }}>- Sarah L.</h4>
  </div>
  <div style={{
    maxWidth: '300px',
    margin: '10px',
    padding: '13px',
    backgroundColor: '#fef4f2',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    flex: '0 0 auto',
  }}>
    <p style={{ fontStyle: 'italic', color: '#555' }}>
      "Amazing tool! It helped me decide what to wear for my big presentation. Highly recommend."
    </p>
    <h4 style={{ color: '#fb9a7a', marginTop: '10px' }}>- James Peterson</h4>
  </div>
  <div style={{
    maxWidth: '300px',
    margin: '10px',
    padding: '13px',
    backgroundColor: '#fef4f2',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    flex: '0 0 auto',
  }}>
    <p style={{ fontStyle: 'italic', color: '#555' }}>
      "Drobe is my go-to app for fashion advice. The suggestions are always on point!"
    </p>
    <h4 style={{ color: '#fb9a7a', marginTop: '10px' }}>- Emily Rocher</h4>
  </div>
</div>
          </div>
          <DemoSection />

          <br/>

          {/* <PricingPage /> */}
        </div>
      ) : currentView === 'wardrobe' ? (
        <Wardrobe />
      ) : currentView === 'outfitadvice' ? (
        <OutfitAdvice />
      ) : currentView === 'outfits' ? (
        // <Additions />
        <OutfitsCollection />
      ) : currentView === 'settings' ? (
        <Settings />
      ) : null}
    </>
  );
}

export default LandingPage;