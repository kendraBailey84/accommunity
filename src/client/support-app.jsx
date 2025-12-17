import React, { useState, useEffect } from 'react';
import { SupportTicketService } from './services/SupportTicketService.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingChat from './components/FloatingChat.jsx';
import TicketSubmissionForm from './components/TicketSubmissionForm.jsx';
import MyTickets from './components/MyTickets.jsx';
import TicketDetail from './components/TicketDetail.jsx';
import './app.css';

export default function SupportApp() {
  const [currentView, setCurrentView] = useState('submit');
  const [currentTicketNumber, setCurrentTicketNumber] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    checkAuthentication();
    
    // Handle hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('ticket/')) {
        const ticketNumber = hash.replace('ticket/', '');
        setCurrentView('detail');
        setCurrentTicketNumber(ticketNumber);
      } else if (hash === 'my-tickets') {
        setCurrentView('my-tickets');
      } else {
        setCurrentView('submit');
        setCurrentTicketNumber(null);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const checkAuthentication = () => {
    // In a real implementation, this would check actual user authentication
    // For now, we'll simulate it based on whether g_ck token exists
    setIsAuthenticated(!!window.g_ck);
  };

  const navigate = (view, ticketNumber = null) => {
    if (view === 'detail' && ticketNumber) {
      window.location.hash = `ticket/${ticketNumber}`;
    } else if (view === 'my-tickets') {
      window.location.hash = 'my-tickets';
    } else if (view === 'submit') {
      window.location.hash = '';
    } else {
      // Navigate to main portal sections
      window.location.href = `/x_snc_amoila_conne_amoila.do#${view}`;
    }
  };

  const handleTicketSubmitted = (ticketNumber) => {
    // After successful submission, could navigate to ticket detail or show success
    console.log('Ticket submitted:', ticketNumber);
  };

  return (
    <div className="amoila-portal">
      <Header navigate={navigate} currentView="support" />
      
      {currentView === 'submit' && (
        <TicketSubmissionForm
          navigate={navigate}
          onTicketSubmitted={handleTicketSubmitted}
        />
      )}
      
      {currentView === 'my-tickets' && (
        <MyTickets
          navigate={navigate}
          isAuthenticated={isAuthenticated}
        />
      )}
      
      {currentView === 'detail' && (
        <TicketDetail
          ticketNumber={currentTicketNumber}
          navigate={navigate}
          isAuthenticated={isAuthenticated}
        />
      )}
      
      <Footer />
      <FloatingChat />
    </div>
  );
}