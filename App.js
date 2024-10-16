// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';  // Import HomePage
import PostPage from './pages/PostPage'; // Import PostPage if needed
import './styles.css';  // Ensure this contains both dark and bright mode styles

const App = () => {
  // State to track the current theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between dark and bright mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      {/* Apply theme class based on the state */}
      <div className={isDarkMode ? 'dark-mode' : 'bright-mode'}>
        <Navbar />
        {/* Use <i> tags for icons */}
        <button onClick={toggleTheme} className="toggle-theme-button">
          <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
        </button>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<HomePage />} />  {/* Home route */}
          <Route path="/post/:postId" element={<PostPage />} /> {/* Add PostPage route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
