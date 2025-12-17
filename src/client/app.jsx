import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import QuickActions from './components/QuickActions.jsx';
import FeaturedArticles from './components/FeaturedArticles.jsx';
import FaqPreview from './components/FaqPreview.jsx';
import Footer from './components/Footer.jsx';
import FloatingChat from './components/FloatingChat.jsx';
import './app.css';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  
  // Handle hash-based routing for future expansion
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentView(hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view) => {
    if (view === 'knowledge-base') {
      window.location.href = '/x_snc_amoila_conne_kb.do';
    } else if (view === 'faqs') {
      window.location.href = '/x_snc_amoila_conne_faq.do';
    } else if (view === 'support') {
      window.location.href = '/x_snc_amoila_conne_support.do';
    } else {
      setCurrentView(view);
      window.location.hash = view;
    }
  };

  return (
    <div className="amoila-portal">
      <Header navigate={navigate} currentView={currentView} />
      
      {currentView === 'home' && (
        <>
          <Hero navigate={navigate} />
          <QuickActions navigate={navigate} />
          <FeaturedArticles />
          <FaqPreview navigate={navigate} />
        </>
      )}
      
      <Footer />
      <FloatingChat />
    </div>
  );
}