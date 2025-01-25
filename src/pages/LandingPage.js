import React, { useState } from 'react';
// import './LandingPage.css'; // Import your CSS file
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin, Tag } from 'antd';
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

const onChange  = (key) => {
  console.log(key);
  setCurrentView(key);
};

  return (<>
    { localStorage.getItem('user') && <Navbar currentView={currentView} onChange={onChange} /> }
    {currentView === 'home' ?
    <><div style={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url("https://im ages.pexels.com/photos/29808412/pexels-photo-29808412/free-photo-of-cozy-candlelit-scene-with-rose-and-cat-art.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
     
      <div style={{backgroundColor: '#946d4c', padding: '5px 0px'}} align="left">
      {/* <img src={logo} style={{width:'150px', marginLeft: '30px', marginTop: '30px'}} /> */}
      <div style={{color: '#3C9CA0', backgroundColor: 'white', paddingLeft: '30px'}}>
        <h1 style={{marginBottom: '0px'}}>Drobe</h1>
        <sup>Wardrobe & Fashion Assist</sup>
      </div>
      <h3 style={{color: ' white', padding: '0px 30px', marginBottom: '10px', fontWeight: '600'}} align="left">Unlock Your Fashion Potential</h3>
      <h3 style={{color: ' whitesmoke', padding: '0px 30px', marginTop: '0px', fontWeight: '400'}} align="left">Discover endless outfit possibilities and fashion advices, end indecisiveness with just a few taps.</h3>
      </div>
      <br/> 
      {/* <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px 0px', display: 'inline'}}>
     
      <h1 style={{color: 'blue', padding: '0px 30px', marginTop: '0px', display: 'inline'}} align="left">Hi, Neelesh</h1>
      <br/>
      </div> */}
      {/* Signup button */}
      <div style={{padding: '0px 20px'}} align="left" onClick={()=>{
        if(localStorage.getItem('user')) {
          localStorage.removeItem('user');
          navigate('/');
        } else {
          setSigningIn(true);
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                localStorage.setItem('user', JSON.stringify(user));
                console.log(user);
                // navigate to /wardrobe
                // navigate('/wardrobe');
                window.location.reload();
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                setSigningIn(false);
                // ...
            });
        }
      }}>
      {/* {localStorage.getItem('user') && <><div align="left" style={{backgroundColor: ' #946d4c', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontSize: '20px'}}>
        {
             `Hi, ${JSON.parse(localStorage.getItem('user')).displayName.split(' ')[0]}`
        }
        
      </div> 
      <br/></> } */}
     
      <a style={{   padding: '5px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '15px', fontWeight: ''}}>
        {
            localStorage.getItem('user') ? <span style={{fontSize: '18px'}}>Hi, {JSON.parse(localStorage.getItem('user')).displayName.split(' ')[0]} &nbsp; <br/>
            <br/></span> : <span style={{fontSize: '18px'}}> <GoogleOutlined /> &nbsp;{signingIn ? <Spin indicator={<Loading3QuartersOutlined spin style={{color: 'black', fontSize: '18px'}} />} size='small' /> : 'Sign in' } &nbsp; <br/>
            <br/></span>
        }
        
      </a> 
      </div>
      <div>
        <DemoSection />
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      {/* <div align="right" style={{paddingRight: '20px'}}>
        <a style={{ color: '#fff', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '16px'}}>
          App Demo
        </a> 
        <a style={{ color: '#fff', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '16px'}}>
          Trending Looks
        </a> 
        <a style={{ color: '#fff', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '16px'}}>
            Fashion Blog 
        </a>
      </div> */}
    </div>
    </>
    :
    currentView === 'wardrobe' ? <Wardrobe /> 
    :
    currentView === 'outfitadvice' ? <OutfitAdvice />
    :
    currentView === 'additions' ? <Additions />
    :
    currentView === 'settings' ? <Settings />
    :
    null}
    </>
  );
}

export default LandingPage;