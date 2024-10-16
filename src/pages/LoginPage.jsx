// pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // React Router navigation

  const validateForm = () => {
    if (!email.includes('@')) return 'Please enter a valid email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
    } else {
      console.log('Logging in with:', { email, password });
      const userProfile = {
        username: email.split('@')[0],  // Simple username logic
        email,
        photoUrl: 'https://via.placeholder.com/100',  // Default profile photo
      };
      localStorage.setItem('profile', JSON.stringify(userProfile));  // Save profile
      navigate('/home');  // Redirect to HomePage after login
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
