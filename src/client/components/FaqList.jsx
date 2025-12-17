import React, { useState } from 'react';
import { display, value } from '../utils/fields.js';
import './FaqList.css';

export default function FaqList({
  faqs,
  categories,
  loading,
  searchQuery,
  selectedCategory,
  service,
  onSearch,
  onCategoryFilter,
  navigate
}) {
  const [openFaq, setOpenFaq] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState({});

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    onSearch(query);
  };

  const handleCategoryClick = (categoryId) => {
    onCategoryFilter(categoryId);
  };

  const handleClearFilters = () => {
    onSearch('');
    onCategoryFilter('');
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

  // Separate featured and regular FAQs
  const featuredFaqs = faqs.filter(faq => display(faq.featured) === 'true');
  const regularFaqs = faqs.filter(faq => display(faq.featured) !== 'true');

  const renderFaqItem = (faq, isFeatured = false) => {
    const faqId = value(faq.sys_id);
    const isOpen = openFaq === faqId;

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
  };

  if (loading) {
    return (
      <main className="faq-main">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading FAQs...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="faq-main">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <button onClick={() => navigate('home')} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">FAQ</span>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="faq-header">
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">
            Find quick answers to common questions about programs, account management, and technical support
          </p>
          
          {/* Search Bar */}
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-container">
              <input
                type="text"
                name="search"
                placeholder="Search FAQs..."
                defaultValue={searchQuery}
                className="search-input"
              />
              <button type="submit" className="search-button" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="21 21l-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          <button
            className={`category-tab ${!selectedCategory ? 'active' : ''}`}
            onClick={() => handleCategoryClick('')}
          >
            All Categories
          </button>
          
          {categories.map(category => (
            <button
              key={value(category.sys_id)}
              className={`category-tab ${selectedCategory === value(category.sys_id) ? 'active' : ''}`}
              onClick={() => handleCategoryClick(value(category.sys_id))}
            >
              {display(category.name)}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory) && (
          <div className="active-filters">
            {searchQuery && (
              <div className="filter-tag">
                Search: "{searchQuery}"
              </div>
            )}
            {selectedCategory && (
              <div className="filter-tag">
                Category: {display(categories.find(c => value(c.sys_id) === selectedCategory)?.name)}
              </div>
            )}
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Clear All Filters
            </button>
          </div>
        )}

        <div className="faq-content">
          {faqs.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="21 21l-4.35-4.35"></path>
                </svg>
              </div>
              <h3>No FAQs found</h3>
              <p>Try adjusting your search terms or category filter to find what you're looking for.</p>
              {(searchQuery || selectedCategory) && (
                <button className="btn btn-outline" onClick={handleClearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Featured FAQs */}
              {featuredFaqs.length > 0 && !searchQuery && !selectedCategory && (
                <section className="featured-section">
                  <h2 className="section-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26"></polygon>
                    </svg>
                    Featured FAQs
                  </h2>
                  <div className="faq-list">
                    {featuredFaqs.map(faq => renderFaqItem(faq, true))}
                  </div>
                </section>
              )}

              {/* Regular FAQs */}
              {regularFaqs.length > 0 && (
                <section className="regular-section">
                  {featuredFaqs.length > 0 && !searchQuery && !selectedCategory && (
                    <h2 className="section-title">All FAQs</h2>
                  )}
                  <div className="faq-list">
                    {regularFaqs.map(faq => renderFaqItem(faq, false))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* CTA Section */}
          <div className="faq-cta">
            <div className="cta-card">
              <h3>Still have questions?</h3>
              <p>Explore our comprehensive knowledge base for detailed guides and resources.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('knowledge-base')}
              >
                Browse Knowledge Base
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}