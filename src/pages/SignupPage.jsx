// pages/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // React Router navigation

  const validateForm = () => {
    if (username.length < 3) return 'Username must be at least 3 characters.';
    if (!email.includes('@')) return 'Please enter a valid email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
    } else {
      console.log('Signing up with:', { username, email, password });
      const newUserProfile = {
        username,
        email,
        photoUrl: 'https://via.placeholder.com/100',
      };
      localStorage.setItem('profile', JSON.stringify(newUserProfile));  // Save profile
      navigate('/home');  // Redirect to HomePage after signup
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Signup</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit" className="auth-button">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
