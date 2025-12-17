import React, { useState } from 'react';
import './Header.css';

export default function Header({ navigate, currentView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, just navigate to knowledge base with search
      navigate('knowledge-base');
      console.log('Search query:', searchQuery);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    if (section === 'knowledge-base') {
      window.location.href = '/x_snc_amoila_conne_kb.do';
    } else if (section === 'support') {
      window.location.href = '/x_snc_amoila_conne_support.do';
    } else if (section === 'dashboard') {
      window.location.href = '/x_snc_amoila_conne_dashboard.do';
    } else if (section === 'profile') {
      // Navigate to profile page (if exists) or home with profile hash
      window.location.href = '/x_snc_amoila_conne_amoila.do#profile';
    } else if (section === 'home') {
      window.location.href = '/x_snc_amoila_conne_amoila.do';
    } else if (section === 'faqs') {
      window.location.href = '/x_snc_amoila_conne_faq.do';
    } else if (section === 'my-tickets') {
      window.location.href = '/x_snc_amoila_conne_support.do#my-tickets';
    } else {
      navigate(section);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo" onClick={() => handleNavClick('home')}>
            <span className="logo-text">AMOILA CONNECT</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              <li>
                <button 
                  className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${currentView === 'knowledge-base' ? 'active' : ''}`}
                  onClick={() => handleNavClick('knowledge-base')}
                >
                  Knowledge Base
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${currentView === 'support' ? 'active' : ''}`}
                  onClick={() => handleNavClick('support')}
                >
                  Support
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${currentView === 'profile' ? 'active' : ''}`}
                  onClick={() => handleNavClick('profile')}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
                  onClick={() => handleNavClick('dashboard')}
                >
                  Dashboard
                </button>
              </li>
            </ul>
          </nav>

          {/* Search Bar */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button" aria-label="Search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="21 21l-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </form>

          {/* Login Button */}
          <button className="btn btn-primary login-btn">
            Login
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="nav-mobile">
            <ul className="mobile-nav-links">
              <li>
                <button 
                  className={`mobile-nav-link ${currentView === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className={`mobile-nav-link ${currentView === 'knowledge-base' ? 'active' : ''}`}
                  onClick={() => handleNavClick('knowledge-base')}
                >
                  Knowledge Base
                </button>
              </li>
              <li>
                <button 
                  className={`mobile-nav-link ${currentView === 'support' ? 'active' : ''}`}
                  onClick={() => handleNavClick('support')}
                >
                  Support
                </button>
              </li>
              <li>
                <button 
                  className={`mobile-nav-link ${currentView === 'profile' ? 'active' : ''}`}
                  onClick={() => handleNavClick('profile')}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button 
                  className={`mobile-nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
                  onClick={() => handleNavClick('dashboard')}
                >
                  Dashboard
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}