import React from 'react';
import '../../styles/features.css';

const Features = () => {
  const features = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Advanced Protection',
      description: 'Q-Learning algorithms detect evolving threats in real-time'
    },
    {
      icon: 'fas fa-bolt',
      title: 'Fast Scanning',
      description: 'Quick analysis with average response under 200ms'
    },
    {
      icon: 'fas fa-history',
      title: 'Continuous Learning',
      description: 'Improves detection accuracy through feedback'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Responsive Design',
      description: 'Works seamlessly on all devices'
    }
  ];

  return (
    <section className="features-section">
      <h2 className="section-title">Why Choose Our System</h2>
      <p className="section-subtitle">
        Powerful security features designed to protect your digital assets
      </p>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;