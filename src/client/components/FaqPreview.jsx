import React, { useState, useEffect } from 'react';
import { display, value } from '../utils/fields.js';
import './FaqPreview.css';

export default function FaqPreview({ navigate }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchTopFaqs();
  }, []);

  const fetchTopFaqs = async () => {
    try {
      const response = await fetch(
        '/api/now/table/x_snc_amoila_conne_faq?sysparm_display_value=all&sysparm_limit=5&sysparm_query=active=true^ORDERBYview_count',
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      
      const data = await response.json();
      setFaqs(data.result || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      // Set some mock data for fallback
      setFaqs([
        {
          sys_id: { value: '1', display_value: '1' },
          question: { value: 'How do I create an account?', display_value: 'How do I create an account?' },
          answer: { value: 'Visit the registration page and follow the simple steps to create your account.', display_value: 'Visit the registration page and follow the simple steps to create your account.' },
          view_count: { value: '1250', display_value: '1250' }
        },
        {
          sys_id: { value: '2', display_value: '2' },
          question: { value: 'What programs are available?', display_value: 'What programs are available?' },
          answer: { value: 'We offer 645, THE WORK, CHOP WOOD CARRY WATER, and Free Workouts for all fitness levels.', display_value: 'We offer 645, THE WORK, CHOP WOOD CARRY WATER, and Free Workouts for all fitness levels.' },
          view_count: { value: '2100', display_value: '2100' }
        },
        {
          sys_id: { value: '3', display_value: '3' },
          question: { value: 'How do I reset my password?', display_value: 'How do I reset my password?' },
          answer: { value: 'Click "Forgot Password" on the login page and follow the email instructions.', display_value: 'Click "Forgot Password" on the login page and follow the email instructions.' },
          view_count: { value: '1800', display_value: '1800' }
        },
        {
          sys_id: { value: '4', display_value: '4' },
          question: { value: 'What equipment do I need?', display_value: 'What equipment do I need?' },
          answer: { value: 'Equipment varies by program. Check your program guide for specific requirements.', display_value: 'Equipment varies by program. Check your program guide for specific requirements.' },
          view_count: { value: '1650', display_value: '1650' }
        },
        {
          sys_id: { value: '5', display_value: '5' },
          question: { value: 'How do I contact support?', display_value: 'How do I contact support?' },
          answer: { value: 'You can reach us via email, live chat, or phone. All contact options are available 24/7.', display_value: 'You can reach us via email, live chat, or phone. All contact options are available 24/7.' },
          view_count: { value: '980', display_value: '980' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
            {faqs.map((faq, index) => (
              <div key={value(faq.sys_id)} className="faq-item">
                <button 
                  className={`faq-question ${openIndex === index ? 'open' : ''}`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="question-text">
                    {display(faq.question)}
                  </span>
                  <span className="question-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </span>
                </button>
                
                <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                  <div className="answer-content">
                    <p>{display(faq.answer)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="section-footer">
          <button 
            className="btn btn-outline"
            onClick={() => navigate('faqs')}
          >
            View All FAQs
          </button>
        </div>
      </div>
    </section>
  );
}