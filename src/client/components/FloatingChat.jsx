import React, { useState } from 'react';
import './FloatingChat.css';

export default function FloatingChat() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChatClick = () => {
    if (isExpanded) {
      // Start chat session
      console.log('Starting chat session...');
      // In a real implementation, this would open the chat interface
    } else {
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <div className="floating-chat">
      {isExpanded && (
        <div className="chat-preview">
          <div className="chat-header">
            <div className="chat-title">
              <div className="chat-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="chat-info">
                <h4>Amoila Support</h4>
                <span className="status">Online - Avg response 2 min</span>
              </div>
            </div>
            <button className="chat-close" onClick={handleClose}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="chat-body">
            <div className="chat-message bot-message">
              <div className="message-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="message-content">
                <p>Hi! 👋 I'm here to help you with your fitness journey. How can I assist you today?</p>
              </div>
            </div>
          </div>
          
          <div className="chat-footer">
            <button className="btn btn-primary chat-start" onClick={handleChatClick}>
              Start Conversation
            </button>
          </div>
        </div>
      )}
      
      <button 
        className={`chat-button ${isExpanded ? 'expanded' : ''}`}
        onClick={handleChatClick}
        aria-label="Open chat support"
      >
        {isExpanded ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <polyline points="10,9 15,9"></polyline>
            <polyline points="10,13 15,13"></polyline>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <polyline points="10,9 15,9"></polyline>
            <polyline points="10,13 15,13"></polyline>
          </svg>
        )}
      </button>
    </div>
  );
}