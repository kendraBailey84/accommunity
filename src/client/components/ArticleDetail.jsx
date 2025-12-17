import React, { useState, useEffect } from 'react';
import { display, value } from '../utils/fields.js';
import './ArticleDetail.css';

export default function ArticleDetail({ slug, service, navigate, onArticleClick }) {
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const loadArticle = async () => {
    setLoading(true);
    try {
      const articleData = await service.getArticleBySlug(slug);
      if (articleData) {
        setArticle(articleData);
        
        // Load related articles
        const related = await service.getRelatedArticles(
          value(articleData.sys_id),
          value(articleData.category),
          4
        );
        setRelatedArticles(related);
      } else {
        // Article not found
        setArticle(null);
      }
    } catch (error) {
      console.error('Error loading article:', error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (helpful) => {
    if (!article || feedbackSubmitted) return;
    
    try {
      await service.submitFeedback(value(article.sys_id), helpful);
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  if (loading) {
    return (
      <main className="article-main">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="article-main">
        <div className="container">
          <div className="article-not-found">
            <div className="not-found-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h2>Article Not Found</h2>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('list')}
            >
              Back to Knowledge Base
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="article-main">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <button onClick={() => navigate('home')} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-separator">/</span>
            <button onClick={() => navigate('list')} className="breadcrumb-link">Knowledge Base</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{display(article.title)}</span>
          </nav>
        </div>
      </div>

      <div className="container">
        <article className="article-detail">
          <header className="article-header">
            <div className="article-category">
              {display(article.category)}
            </div>
            
            <h1 className="article-title">
              {display(article.title)}
            </h1>
            
            <div className="article-meta">
              <div className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>By {display(article.author) || 'Amoila Team'}</span>
              </div>
              
              <div className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{formatDate(display(article.sys_created_on))}</span>
              </div>
              
              <div className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>{display(article.view_count)} views</span>
              </div>
            </div>
          </header>

          <div className="article-content">
            <div 
              className="content-html"
              dangerouslySetInnerHTML={{ 
                __html: display(article.content) || display(article.short_description) 
              }}
            />
          </div>

          {/* Feedback Section */}
          <div className="article-feedback">
            <h3>Was this article helpful?</h3>
            {feedbackSubmitted ? (
              <div className="feedback-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>Thank you for your feedback!</span>
              </div>
            ) : (
              <div className="feedback-buttons">
                <button
                  className="feedback-btn positive"
                  onClick={() => handleFeedback(true)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  Yes, it was helpful
                </button>
                
                <button
                  className="feedback-btn negative"
                  onClick={() => handleFeedback(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                  </svg>
                  No, I need more help
                </button>
              </div>
            )}
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="related-articles">
            <h2 className="section-title">Related Articles</h2>
            <div className="related-grid">
              {relatedArticles.map(relatedArticle => (
                <article
                  key={value(relatedArticle.sys_id)}
                  className="related-card"
                  onClick={() => onArticleClick(relatedArticle)}
                >
                  <div className="related-category">
                    {display(relatedArticle.category)}
                  </div>
                  
                  <h3 className="related-title">
                    {display(relatedArticle.title)}
                  </h3>
                  
                  <p className="related-description">
                    {stripHtmlTags(display(relatedArticle.short_description))}
                  </p>
                  
                  <div className="related-views">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>{display(relatedArticle.view_count)} views</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <div className="article-cta">
          <div className="cta-card">
            <h3>Still need help?</h3>
            <p>Can't find what you're looking for? Our support team is ready to assist you.</p>
            <div className="cta-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate('support')}
              >
                Contact Support
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate('list')}
              >
                Browse More Articles
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}