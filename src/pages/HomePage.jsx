// pages/HomePage.jsx
import React from 'react';
import Feed from '../components/Feed';  // Display feed of posts
import '../styles.css';

const HomePage = () => {
  return (
    <div className="home-page">
      
      <Feed />  {/* Render the feed with posts */}
    </div>
  );
};

export default HomePage;
