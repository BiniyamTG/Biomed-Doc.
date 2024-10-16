import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../styles.css'; // Ensure your styles are correctly applied

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle state for mobile menu

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand / Header */}
        <Link to="/" className="navbar-brand">
          <h1 className="navbar-title">Biomedical Doc.</h1>
        </Link>

        {/* Hamburger Menu (visible on smaller screens) */}
        <button className="navbar-hamburger" onClick={toggleMenu}>
          ☰
        </button>

        {/* Navbar Links */}
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="navbar-link">Profile</Link>
              <button onClick={logout} className="navbar-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="navbar-link">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
