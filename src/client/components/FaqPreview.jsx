import React, { useState, useEffect, useMemo } from 'react';
import { FaqService } from '../services/FaqService.js';
import { display, value } from '../utils/fields.js';
import './FaqPreview.css';

export default function FaqPreview({ navigate }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState({});

  const service = useMemo(() => new FaqService(), []);

  useEffect(() => {
    fetchTopFaqs();
  }, []);

  const fetchTopFaqs = async () => {
    try {
      const faqsData = await service.getFaqs();
      // Get top 5 FAQs, prioritizing featured ones
      const sortedFaqs = faqsData
        .sort((a, b) => {
          const aFeatured = display(a.featured) === 'true' ? 1 : 0;
          const bFeatured = display(b.featured) === 'true' ? 1 : 0;
          if (aFeatured !== bFeatured) return bFeatured - aFeatured;
          return parseInt(display(b.view_count) || '0') - parseInt(display(a.view_count) || '0');
        })
        .slice(0, 5);
      
      setFaqs(sortedFaqs);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      // Set some mock data for fallback
      setFaqs([
        {
          sys_id: { value: '1', display_value: '1' },
          question: { value: 'How do I create an account?', display_value: 'How do I create an account?' },
          answer: { value: 'Visit the registration page and follow the simple steps to create your account.', display_value: 'Visit the registration page and follow the simple steps to create your account.' },
          view_count: { value: '1250', display_value: '1250' },
          featured: { value: 'true', display_value: 'true' }
        },
        {
          sys_id: { value: '2', display_value: '2' },
          question: { value: 'What programs are available?', display_value: 'What programs are available?' },
          answer: { value: 'We offer 645, THE WORK, CHOP WOOD CARRY WATER, and Free Workouts for all fitness levels.', display_value: 'We offer 645, THE WORK, CHOP WOOD CARRY WATER, and Free Workouts for all fitness levels.' },
          view_count: { value: '2100', display_value: '2100' },
          featured: { value: 'false', display_value: 'false' }
        },
        {
          sys_id: { value: '3', display_value: '3' },
          question: { value: 'How do I reset my password?', display_value: 'How do I reset my password?' },
          answer: { value: 'Click "Forgot Password" on the login page and follow the email instructions.', display_value: 'Click "Forgot Password" on the login page and follow the email instructions.' },
          view_count: { value: '1800', display_value: '1800' },
          featured: { value: 'false', display_value: 'false' }
        },
        {
          sys_id: { value: '4', display_value: '4' },
          question: { value: 'What equipment do I need?', display_value: 'What equipment do I need?' },
          answer: { value: 'Equipment varies by program. Check your program guide for specific requirements.', display_value: 'Equipment varies by program. Check your program guide for specific requirements.' },
          view_count: { value: '1650', display_value: '1650' },
          featured: { value: 'false', display_value: 'false' }
        },
        {
          sys_id: { value: '5', display_value: '5' },
          question: { value: 'How do I contact support?', display_value: 'How do I contact support?' },
          answer: { value: 'You can reach us via email, live chat, or phone. All contact options are available 24/7.', display_value: 'You can reach us via email, live chat, or phone. All contact options are available 24/7.' },
          view_count: { value: '980', display_value: '980' },
          featured: { value: 'false', display_value: 'false' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = async (faqId) => {
    if (openFaq === faqId) {
      setOpenFaq(null);
    } else {
      setOpenFaq(faqId);
      // Increment view count when FAQ is opened
      await service.incrementViewCount(faqId);
    }
  };

  const handleFeedback = async (faqId, helpful) => {
    if (feedbackSubmitted[faqId]) return;
    
    try {
      await service.submitFeedback(faqId, helpful);
      setFeedbackSubmitted({ ...feedbackSubmitted, [faqId]: true });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (loading) {
    return (
      <section className="faq-preview section">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading frequently asked questions...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="faq-preview section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Quick answers to the most common questions from our community
          </p>
        </div>
        
        <div className="faq-container">
          <div className="faq-accordion">
            {faqs.map((faq) => {
              const faqId = value(faq.sys_id);
              const isOpen = openFaq === faqId;
              const isFeatured = display(faq.featured) === 'true';

              return (
                <div key={faqId} className={`faq-item ${isFeatured ? 'featured' : ''}`}>
                  <button 
                    className={`faq-question ${isOpen ? 'open' : ''}`}
                    onClick={() => toggleFaq(faqId)}
                    aria-expanded={isOpen}
                  >
                    <div className="question-content">
                      {isFeatured && (
                        <div className="featured-badge">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26"></polygon>
                          </svg>
                        </div>
                      )}
                      <span className="question-text">
                        {display(faq.question)}
                      </span>
                    </div>
                    <span className="question-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9"></polyline>
                      </svg>
                    </span>
                  </button>
                  
                  <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                    <div className="answer-content">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: display(faq.answer) 
                        }}
                      />
                      
                      {isOpen && (
                        <div className="answer-feedback">
                          <span className="feedback-label">Was this helpful?</span>
                          {feedbackSubmitted[faqId] ? (
                            <div className="feedback-success">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20,6 9,17 4,12"></polyline>
                              </svg>
                              <span>Thank you!</span>
                            </div>
                          ) : (
                            <div className="feedback-buttons">
                              <button
                                className="feedback-btn thumbs-up"
                                onClick={() => handleFeedback(faqId, true)}
                                aria-label="Yes, this was helpful"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                </svg>
                              </button>
                              
                              <button
                                className="feedback-btn thumbs-down"
                                onClick={() => handleFeedback(faqId, false)}
                                aria-label="No, this wasn't helpful"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="section-footer">
          <button 
            className="btn btn-outline"
            onClick={() => window.location.href = '/x_snc_amoila_conne_faq.do'}
          >
            View All FAQs
          </button>
        </div>
      </div>
    </section>
  );
}