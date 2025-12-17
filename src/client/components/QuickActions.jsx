import React from 'react';
import './QuickActions.css';

export default function QuickActions({ navigate }) {
  const actions = [
    {
      title: 'Knowledge Base',
      description: 'Browse comprehensive guides, workout blueprints, and fitness resources.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
      action: () => window.location.href = '/x_snc_amoila_conne_kb.do',
      color: '#4A90E2'
    },
    {
      title: 'Submit Ticket',
      description: 'Get personalized support for technical issues or account questions.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      ),
      action: () => window.location.href = '/x_snc_amoila_conne_support.do',
      color: '#F39C12'
    },
    {
      title: 'Chat with Us',
      description: 'Start an instant conversation with our support team for quick help.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
          <path d="M12 8v4"></path>
          <path d="M12 16h.01"></path>
        </svg>
      ),
      action: () => {
        // Trigger the floating chat widget
        const event = new CustomEvent('openChat');
        window.dispatchEvent(event);
      },
      color: '#27AE60'
    }
  ];

  return (
    <section className="quick-actions section-sm">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How can we help you today?</h2>
          <p className="section-subtitle">
            Choose from our most popular support options to get the help you need quickly.
          </p>
        </div>
        
        <div className="actions-grid">
          {actions.map((action, index) => (
            <div key={index} className="action-card" onClick={action.action}>
              <div className="action-icon" style={{ color: action.color }}>
                {action.icon}
              </div>
              <div className="action-content">
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
              </div>
              <div className="action-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}