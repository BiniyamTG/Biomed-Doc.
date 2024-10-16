// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import App from './App';
import { AuthProvider } from './AuthContext';
import './styles.css'; // Make sure this is correct

const container = document.getElementById('root'); // Get the root element
const root = ReactDOM.createRoot(container); // Create a root

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
