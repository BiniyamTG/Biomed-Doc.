// pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Ensure the path is correct

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to Biomedical Doc</h1>
        <p className="landing-description">
          Share your thoughts, photos, videos, audio, and PDFs seamlessly! Stay connected with the community through posts and comments. Enjoy emoji reactions and personalize your profile to reflect who you are. Get started now by logging in or creating an account.
        </p>
        <div className="landing-buttons">
          <button 
            className="landing-button login-button" 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="landing-button signup-button" 
            onClick={() => navigate('/signup')}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
