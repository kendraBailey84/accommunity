import React, { useState, useEffect } from 'react';
import { display, value } from '../utils/fields.js';
import './FeaturedArticles.css';

export default function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  const fetchFeaturedArticles = async () => {
    try {
      const response = await fetch(
        '/api/now/table/x_snc_amoila_conne_kb_article?sysparm_display_value=all&sysparm_limit=4&sysparm_query=published=true^ORDERBYDESCview_count',
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      
      const data = await response.json();
      setArticles(data.result || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Set some mock data for fallback
      setArticles([
        {
          sys_id: { value: '1', display_value: '1' },
          title: { value: 'Welcome to Amoila Connect', display_value: 'Welcome to Amoila Connect' },
          short_description: { value: 'Get started with your fitness journey', display_value: 'Get started with your fitness journey' },
          category: { value: 'getting_started', display_value: 'Getting Started' },
          view_count: { value: '1250', display_value: '1250' }
        },
        {
          sys_id: { value: '2', display_value: '2' },
          title: { value: '645 Program Overview', display_value: '645 Program Overview' },
          short_description: { value: 'Complete guide to our flagship program', display_value: 'Complete guide to our flagship program' },
          category: { value: 'programs', display_value: 'Programs & Workouts' },
          view_count: { value: '2100', display_value: '2100' }
        },
        {
          sys_id: { value: '3', display_value: '3' },
          title: { value: 'Recovery Guidelines', display_value: 'Recovery Guidelines' },
          short_description: { value: 'Master the art of proper recovery', display_value: 'Master the art of proper recovery' },
          category: { value: 'nutrition', display_value: 'Nutrition & Recovery' },
          view_count: { value: '1456', display_value: '1456' }
        },
        {
          sys_id: { value: '4', display_value: '4' },
          title: { value: 'Community Guidelines', display_value: 'Community Guidelines' },
          short_description: { value: 'Be part of our fitness family', display_value: 'Be part of our fitness family' },
          category: { value: 'community', display_value: 'Community' },
          view_count: { value: '742', display_value: '742' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (articleId) => {
    // Navigate to article detail view
    console.log('Opening article:', articleId);
    // In a real implementation, this would navigate to the article detail
  };

  if (loading) {
    return (
      <section className="featured-articles section">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading popular articles...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-articles section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Articles</h2>
          <p className="section-subtitle">
            Discover the most helpful resources from our knowledge base
          </p>
        </div>
        
        <div className="articles-grid">
          {articles.map((article) => (
            <article 
              key={value(article.sys_id)}
              className="article-card"
              onClick={() => handleArticleClick(value(article.sys_id))}
            >
              <div className="article-category">
                {display(article.category)}
              </div>
              
              <h3 className="article-title">
                {display(article.title)}
              </h3>
              
              <p className="article-description">
                {display(article.short_description)}
              </p>
              
              <div className="article-meta">
                <div className="article-views">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>{display(article.view_count)} views</span>
                </div>
                
                <div className="article-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="section-footer">
          <button className="btn btn-outline">
            Browse All Articles
          </button>
        </div>
      </div>
    </section>
  );
}