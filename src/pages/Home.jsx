import React from 'react';
import ThreatBoxes from '../components/Home/ThreatBoxes';
import Features from '../components/Home/Features';
import './home.css';
import img from './Security_Illustration.jpg'

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Advanced Threat Detection System</h1>
          <p className="hero-subtitle">
            Protect your digital assets with our AI-powered security scanner
          </p>
          <div className="hero-cta">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={img} alt="Security Illustration" />
        </div>
      </section>

      {/* Scanner Tools Section */}
      <section className="scanner-section">
        <h2 className="section-title">Scan for Threats</h2>
        <p className="section-subtitle">
          Quickly identify security risks with our specialized tools
        </p>
        <ThreatBoxes />
      </section>

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>99.9%</h3>
          <p>Detection Accuracy</p>
        </div>
        <div className="stat-card">
          <h3>10,000+</h3>
          <p>Threats Identified</p>
        </div>
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Real-time Protection</p>
        </div>
      </section>
    </div>
  );
};

export default Home;