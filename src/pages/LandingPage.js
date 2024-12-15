import React from 'react';
// import './LandingPage.css'; // Import your CSS file
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';


function LandingPage() {
const navigate = useNavigate();
  return (
    <div style={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url("https://images.pexels.com/photos/29775957/pexels-photo-29775957/free-photo-of-artistic-portrait-of-three-women-in-dim-lighting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
      <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '5px 0px'}}>
      <h1 style={{color: ' #946d4c', fontSize: '45px', padding: '0px 30px', marginBottom: '0px'}} align="left">Unlock Your Wardrobe's Potential</h1>
      <h3 style={{color: ' #946d4c', padding: '0px 30px', marginTop: '0px', fontWeight: '500'}} align="left">Discover endless outfit possibilities, end indecisiveness with just a few taps.</h3>
      <br/>
      </div>
      <br/> 
      {/* <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px 0px', display: 'inline'}}>
     
      <h1 style={{color: 'blue', padding: '0px 30px', marginTop: '0px', display: 'inline'}} align="left">Hi, Neelesh</h1>
      <br/>
      </div> */}
      {/* Signup button */}
      <div style={{padding: '0px 20px'}} align="right" onClick={()=>{
        if(localStorage.getItem('user')) {
          localStorage.removeItem('user');
          navigate('/');
        } else {
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
                // ...
            });
        }
      }}>
      {localStorage.getItem('user') && <><div align="left" style={{backgroundColor: ' #946d4c', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontSize: '20px'}}>
        {
             `Hi, ${JSON.parse(localStorage.getItem('user')).displayName.split(' ')[0]}`
        }
        
      </div> 
      <br/></> }
     
      <a style={{ color: '#fff', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold'}}>
        {
            localStorage.getItem('user') ? '' : <span style={{fontSize: '18px'}}><br/><GoogleOutlined /> Sign In  &nbsp; <br/>
            <br/></span>
        }
        
      </a> 
     
      <a style={{ color: '#fff', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '15px'}}>
        App Demo
      </a> 
      <a style={{ color: '#fff', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '15px'}}>
         Trending Looks
      </a> 
      <a style={{ color: '#fff', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '15px'}}>
          Fashion Blog 
      </a> 
      </div>
    </div>
  );
}

export default LandingPage;