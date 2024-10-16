// pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import '../styles.css'; // Import styles

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    photoUrl: '',
  });
  const [error, setError] = useState('');

  // Load profile from localStorage (or initialize with some default values)
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile')) || {
      username: 'John Doe', // Default username
      email: 'john@example.com', // Default email
      photoUrl: 'https://via.placeholder.com/100', // Default photo
    };
    setProfile(savedProfile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!profile.username || !profile.email) {
      setError('Please fill in all fields.');
      return;
    }

    // Save profile to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
    setError('');
    alert('Profile updated successfully!'); // Simple alert for feedback
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">{profile.username}'s Profile</h2>
      <img src={profile.photoUrl} alt="Profile" className="profile-photo" />
      <form onSubmit={handleUpdateProfile} className="profile-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={profile.username}
          onChange={handleChange}
          required
          className="profile-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          required
          className="profile-input"
        />
        <input
          type="text"
          name="photoUrl"
          placeholder="Profile Photo URL"
          value={profile.photoUrl}
          onChange={handleChange}
          className="profile-input"
        />
        {error && <p className="profile-error">{error}</p>}
        <button type="submit" className="profile-button">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
