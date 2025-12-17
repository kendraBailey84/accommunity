import React from 'react';
import './Hero.css';

export default function Hero({ navigate }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <h1 className="hero-title">
                GET STRONGER
                <br />
                <span className="hero-title-accent">TOGETHER</span>
              </h1>
              
              <p className="hero-subtitle">
                Your support hub for Amoila's fitness community
              </p>
              
              <div className="hero-cta">
                <button 
                  className="btn btn-large btn-secondary"
                  onClick={() => navigate('knowledge-base')}
                >
                  Browse Knowledge Base
                </button>
                <button 
                  className="btn btn-large btn-outline"
                  onClick={() => navigate('support')}
                >
                  Get Support
                </button>
              </div>
            </div>
            
            <div className="hero-quote">
              <blockquote className="quote">
                <span className="quote-text">"Movement is medicine."</span>
                <cite className="quote-author">— Amoila Cesar</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </section>
  );
}