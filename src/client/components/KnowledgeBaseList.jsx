import React from 'react';
import { display, value } from '../utils/fields.js';
import './KnowledgeBaseList.css';

export default function KnowledgeBaseList({
  articles,
  categories,
  loading,
  searchQuery,
  selectedCategory,
  currentPage,
  totalCount,
  articlesPerPage,
  onSearch,
  onCategoryFilter,
  onPageChange,
  onArticleClick,
  navigate
}) {
  
  const totalPages = Math.ceil(totalCount / articlesPerPage);

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

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      );
    }

    return (
      <div className="pagination">
        <div className="pagination-info">
          Showing {((currentPage - 1) * articlesPerPage) + 1}-{Math.min(currentPage * articlesPerPage, totalCount)} of {totalCount} articles
        </div>
        <div className="pagination-controls">
          {pages}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <main className="kb-main">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading knowledge base...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="kb-main">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <button onClick={() => navigate('home')} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Knowledge Base</span>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="kb-header">
          <h1 className="kb-title">Knowledge Base</h1>
          <p className="kb-subtitle">
            Comprehensive guides and resources to help you succeed in your fitness journey
          </p>
          
          {/* Search Bar */}
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-container">
              <input
                type="text"
                name="search"
                placeholder="Search articles..."
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

        <div className="kb-content">
          {/* Sidebar */}
          <aside className="kb-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Categories</h3>
              
              <button
                className={`category-filter ${!selectedCategory ? 'active' : ''}`}
                onClick={() => handleCategoryClick('')}
              >
                All Categories
                {!selectedCategory && <span className="count">({totalCount})</span>}
              </button>
              
              {categories.map(category => (
                <button
                  key={value(category.sys_id)}
                  className={`category-filter ${selectedCategory === value(category.sys_id) ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(value(category.sys_id))}
                >
                  {display(category.name)}
                </button>
              ))}
            </div>

            {(searchQuery || selectedCategory) && (
              <div className="sidebar-section">
                <h3 className="sidebar-title">Active Filters</h3>
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
          </aside>

          {/* Main Content */}
          <div className="kb-articles">
            {articles.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="21 21l-4.35-4.35"></path>
                  </svg>
                </div>
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                {(searchQuery || selectedCategory) && (
                  <button className="btn btn-outline" onClick={handleClearFilters}>
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="articles-grid">
                  {articles.map(article => (
                    <article
                      key={value(article.sys_id)}
                      className="article-card"
                      onClick={() => onArticleClick(article)}
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

                {renderPagination()}
              </>
            )}

            {/* CTA Section */}
            <div className="kb-cta">
              <div className="cta-card">
                <h3>Can't find what you're looking for?</h3>
                <p>Our support team is here to help with personalized assistance.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('support')}
                >
                  Get Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}