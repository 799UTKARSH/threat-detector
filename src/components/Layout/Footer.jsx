import React from 'react';
import './layout.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Web-Based Multiple Threat Detection System</p>
        <p>Powered by Q-Learning and Reinforcement Learning</p>
      </div>
    </footer>
  );
};

export default Footer;