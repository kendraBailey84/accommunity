import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChatService } from '../services/ChatService.js';
import { display, value } from '../utils/fields.js';
import './FloatingChat.css';

export default function FloatingChat() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '' });
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [awaitingFeedback, setAwaitingFeedback] = useState(false);
  const [lastSearchResults, setLastSearchResults] = useState(null);
  const [conversationState, setConversationState] = useState('normal'); // normal, awaiting_feedback, escalating
  const [messageCount, setMessageCount] = useState(0);
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [conversationReset, setConversationReset] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatService = useMemo(() => new ChatService(), []);

  const welcomeMessage = {
    id: 'welcome',
    sender_type: 'bot',
    sender_name: 'Coach AI',
    message: 'Hi! 👋 Welcome to Amoila Connect! I\'m your AI fitness coach.\n\n**I can help you with:**\n• Searching our knowledge base\n• Finding answers in our FAQ\n• Connecting you with support\n• Program and workout questions\n\n**Just ask me anything about your fitness journey!**',
    timestamp: new Date().toISOString(),
    isWelcome: true
  };

  useEffect(() => {
    if (isExpanded && messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, [isExpanded]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Listen for custom event to open chat
    const handleOpenChat = () => {
      handleExpand();
    };
    
    window.addEventListener('openChat', handleOpenChat);
    
    return () => {
      window.removeEventListener('openChat', handleOpenChat);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChat = async () => {
    if (!session) {
      try {
        const newSession = await chatService.createChatSession(
          guestInfo.name || null,
          guestInfo.email || null
        );
        setSession(newSession);
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setIsMinimized(false);
    initializeChat();
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setIsMinimized(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    
    // Loop prevention check
    if (!checkForLoopPrevention(userMessage)) {
      return;
    }
    
    setInputMessage('');
    setIsLoading(true);

    // Add user message to UI
    const newUserMessage = {
      id: Date.now(),
      sender_type: 'user',
      sender_name: guestInfo.name || 'You',
      message: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Save user message to database
      if (session) {
        await chatService.addMessage(
          value(session.sys_id),
          'user',
          guestInfo.name || 'Guest',
          userMessage
        );
      }

      // Handle different conversation states
      if (conversationState === 'awaiting_feedback') {
        await handleFeedbackResponse(userMessage);
        return;
      }

      // Normal conversation flow - search content first
      const searchResults = await chatService.searchContent(userMessage);
      let botResponse = '';
      let shouldAwaitFeedback = false;
      let searchResultsToStore = null;

      if (searchResults && (searchResults.faqs.length > 0 || searchResults.articles.length > 0)) {
        // Found relevant content - present it and ask for feedback
        botResponse = chatService.generateContentBasedResponse(searchResults, userMessage);
        searchResultsToStore = searchResults;
        shouldAwaitFeedback = true;
        setLastSearchResults(searchResults);
        setConversationState('awaiting_feedback');
      } else {
        // No relevant content found - detect intent or use fallback
        const detectedIntent = await chatService.detectIntent(userMessage);
        botResponse = await chatService.generateBotResponse(userMessage, detectedIntent);
        setConversationState('normal');
        setLastSearchResults(null);
      }

      // Add bot response to UI with delay for natural feel
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + Math.random(), // Ensure unique ID
          sender_type: 'bot',
          sender_name: 'Coach AI',
          message: botResponse,
          timestamp: new Date().toISOString(),
          awaitingFeedback: shouldAwaitFeedback,
          searchResults: searchResultsToStore
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);

      // Save bot message to database
      if (session) {
        await chatService.addMessage(
          value(session.sys_id),
          'bot',
          'Coach AI',
          botResponse,
          searchResults && (searchResults.faqs.length > 0 || searchResults.articles.length > 0) ? 'content_search' : null
        );
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + Math.random(),
        sender_type: 'bot',
        sender_name: 'Coach AI',
        message: "I'm sorry, I'm having trouble right now. Would you like me to connect you with our support team?",
        timestamp: new Date().toISOString(),
        awaitingFeedback: false
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      setConversationState('normal');
    }
  };

  const handleFeedbackResponse = async (userMessage) => {
    const message = userMessage.toLowerCase();
    const isPositive = message.includes('yes') || message.includes('helpful') || message.includes('thanks') || message.includes('solved');
    const isNegative = message.includes('no') || message.includes('not') || message.includes('still need') || message.includes('doesn\'t help');

    let responseMessage;

    if (isPositive) {
      // User found the content helpful
      responseMessage = {
        id: Date.now() + Math.random(),
        sender_type: 'bot',
        sender_name: 'Coach AI',
        message: "Wonderful! I'm glad I could help you find the information you needed. 😊\n\nIs there anything else I can help you with today?",
        timestamp: new Date().toISOString()
      };
      
      // Reset state to normal
      setConversationState('normal');
      setLastSearchResults(null);
      
    } else if (isNegative) {
      // User needs more help - offer support ticket
      responseMessage = {
        id: Date.now() + Math.random(),
        sender_type: 'bot',
        sender_name: 'Coach AI',
        message: "No problem! I understand you need more personalized help. Let me connect you with our support team who can provide detailed assistance.\n\n**Would you like me to help you create a support ticket?**",
        timestamp: new Date().toISOString(),
        showSupportOptions: true
      };
      
      setConversationState('escalating');
      
    } else {
      // Unclear response - ask for clarification
      responseMessage = {
        id: Date.now() + Math.random(),
        sender_type: 'bot',
        sender_name: 'Coach AI',
        message: "I want to make sure I'm helping you properly. Please let me know:\n\n• **\"Yes\"** if the information above answered your question\n• **\"No\"** if you need more personalized help",
        timestamp: new Date().toISOString(),
        awaitingFeedback: true
      };
      
      // Keep the state as awaiting_feedback
    }
    
    setMessages(prev => [...prev, responseMessage]);
    setIsLoading(false);
  };

  const handleQuickAction = async (action) => {
    if (isLoading) return; // Prevent multiple rapid clicks
    
    setIsLoading(true);
    
    try {
      if (action === 'yes_helpful') {
        const thankYouMessage = {
          id: Date.now() + Math.random(),
          sender_type: 'bot',
          sender_name: 'Coach AI',
          message: "Excellent! I'm glad I could help you find what you were looking for. 😊\n\nIs there anything else I can help you with today?",
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, thankYouMessage]);
        setConversationState('normal');
        setLastSearchResults(null);
        
      } else if (action === 'need_more_help') {
        const escalationMessage = {
          id: Date.now() + Math.random(),
          sender_type: 'bot',
          sender_name: 'Coach AI',
          message: "No problem! I understand you need more personalized assistance. Our support team specializes in providing detailed help for complex questions.\n\n**Would you like me to help you create a support ticket?**",
          timestamp: new Date().toISOString(),
          showSupportOptions: true
        };
        
        setMessages(prev => [...prev, escalationMessage]);
        setConversationState('escalating');
        
      } else if (action === 'create_ticket') {
        // Navigate to support ticket creation
        const redirectMessage = {
          id: Date.now() + Math.random(),
          sender_type: 'bot',
          sender_name: 'Coach AI',
          message: "Perfect! I'll redirect you to our support ticket form where you can provide detailed information about your question. Our team will get back to you within 24 hours.\n\n**Redirecting you now...**",
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, redirectMessage]);
        setConversationState('normal'); // Reset state
        
        setTimeout(() => {
          window.location.href = '/x_snc_amoila_conne_support.do';
        }, 2000);
        
      } else if (action === 'browse_more') {
        const browseMessage = {
          id: Date.now() + Math.random(),
          sender_type: 'bot',
          sender_name: 'Coach AI',
          message: "Great idea! Our knowledge base has comprehensive guides on all aspects of fitness and training. I'll take you there now.\n\n**Opening Knowledge Base...**",
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, browseMessage]);
        setConversationState('normal'); // Reset state
        
        setTimeout(() => {
          window.location.href = '/x_snc_amoila_conne_kb.do';
        }, 1500);
      }
    } catch (error) {
      console.error('Error handling quick action:', error);
      const errorMessage = {
        id: Date.now() + Math.random(),
        sender_type: 'bot',
        sender_name: 'Coach AI',
        message: "I'm sorry, something went wrong. Let me reset our conversation. How can I help you today?",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setConversationState('normal');
      setLastSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestInfoSubmit = (e) => {
    e.preventDefault();
    setShowGuestForm(false);
    initializeChat();
  };

  const resetConversationState = () => {
    setConversationState('normal');
    setLastSearchResults(null);
    setAwaitingFeedback(false);
    setConversationReset(true);
    
    const resetMessage = {
      id: Date.now() + Math.random(),
      sender_type: 'bot',
      sender_name: 'Coach AI',
      message: "Let me reset our conversation to help you better. What can I help you with today?",
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, resetMessage]);
  };

  const checkForLoopPrevention = (userMessage) => {
    const now = Date.now();
    
    // Prevent rapid message sending (less than 1 second apart)
    if (lastMessageTime && (now - lastMessageTime) < 1000) {
      return false;
    }
    
    // Reset conversation if too many messages without resolution
    if (messageCount > 8 && conversationState !== 'normal') {
      resetConversationState();
      return false;
    }
    
    setLastMessageTime(now);
    setMessageCount(prev => prev + 1);
    return true;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`floating-chat ${isExpanded ? 'expanded' : ''}`}>
      {isExpanded && !isMinimized && (
        <div className="chat-window">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-title">
              <div className="coach-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="chat-info">
                <h4>Chat with Coach AI</h4>
                <span className="status">Online • Instant responses</span>
              </div>
            </div>
            <div className="chat-controls">
              <button className="chat-minimize" onClick={handleMinimize} title="Minimize">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"></path>
                </svg>
              </button>
              <button className="chat-close" onClick={handleClose} title="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {showGuestForm ? (
            <div className="guest-form-container">
              <form onSubmit={handleGuestInfoSubmit} className="guest-form">
                <h4>Let's get started!</h4>
                <p>Help us provide better assistance:</p>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={guestInfo.name}
                  onChange={(e) => setGuestInfo({...guestInfo, name: e.target.value})}
                  className="guest-input"
                />
                <input
                  type="email"
                  placeholder="Your email (optional)"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                  className="guest-input"
                />
                <div className="guest-actions">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Start Chat
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-sm"
                    onClick={() => setShowGuestForm(false)}
                  >
                    Skip
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div className="chat-messages">
                {messages.map(message => (
                  <div key={message.id} className={`message ${message.sender_type}`}>
                    <div className="message-avatar">
                      {message.sender_type === 'bot' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="8" r="5"></circle>
                          <path d="M20.59 13.41L13.42 20.58a2 2 0 01-2.83 0L3.41 13.41a2 2 0 010-2.83L10.58 3.41a2 2 0 012.83 0l7.17 7.17a2 2 0 010 2.83z"></path>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      )}
                    </div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-sender">{message.sender_name}</span>
                        <span className="message-time">{formatTime(message.timestamp)}</span>
                      </div>
                      <div 
                        className="message-text"
                        dangerouslySetInnerHTML={{ __html: message.message.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                      />
                      
                      {/* Interactive Elements */}
                      {message.awaitingFeedback && conversationState === 'awaiting_feedback' && (
                        <div className="chat-actions">
                          <button 
                            className="chat-action-btn positive"
                            onClick={() => handleQuickAction('yes_helpful')}
                            disabled={isLoading}
                          >
                            ✅ Yes, this helped!
                          </button>
                          <button 
                            className="chat-action-btn negative"
                            onClick={() => handleQuickAction('need_more_help')}
                            disabled={isLoading}
                          >
                            ❌ I need more help
                          </button>
                        </div>
                      )}
                      
                      {message.showSupportOptions && conversationState === 'escalating' && (
                        <div className="chat-actions">
                          <button 
                            className="chat-action-btn primary"
                            onClick={() => handleQuickAction('create_ticket')}
                            disabled={isLoading}
                          >
                            🎫 Create Support Ticket
                          </button>
                          <button 
                            className="chat-action-btn secondary"
                            onClick={() => handleQuickAction('browse_more')}
                            disabled={isLoading}
                          >
                            📚 Browse Knowledge Base
                          </button>
                        </div>
                      )}
                      
                      {/* Content Links */}
                      {message.searchResults && (
                        <div className="content-links">
                          {message.searchResults.faqs.map(faq => (
                            <button
                              key={value(faq.sys_id)}
                              className="content-link faq-link"
                              onClick={() => handleViewContent('faq', faq)}
                            >
                              <span className="link-icon">❓</span>
                              <span className="link-text">{display(faq.question)}</span>
                            </button>
                          ))}
                          
                          {message.searchResults.articles.map(article => (
                            <button
                              key={value(article.sys_id)}
                              className="content-link article-link"
                              onClick={() => handleViewContent('article', article)}
                            >
                              <span className="link-icon">📖</span>
                              <span className="link-text">{display(article.title)}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="message bot">
                    <div className="message-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="5"></circle>
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2.41 12.41a2 2 0 010-2.83L10.59 1.4a2 2 0 012.83 0l7.17 7.17a2 2 0 010 2.84z"></path>
                      </svg>
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area */}
              <div className="chat-input-container">
                <form onSubmit={handleSendMessage} className="chat-form">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    className="chat-send"
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Chat Button */}
      <button 
        className={`chat-button ${isExpanded && !isMinimized ? 'hidden' : ''} ${isMinimized ? 'minimized' : ''}`}
        onClick={isMinimized ? () => setIsMinimized(false) : handleExpand}
        aria-label={isMinimized ? "Open chat" : "Start chat"}
      >
        {isMinimized ? (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {messages.length > 1 && (
              <span className="message-badge">{messages.length - 1}</span>
            )}
          </>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <path d="M8 10h.01M12 10h.01M16 10h.01"></path>
          </svg>
        )}
      </button>
    </div>
  );
}