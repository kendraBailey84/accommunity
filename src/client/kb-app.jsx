import React, { useState, useEffect, useMemo } from 'react';
import { KnowledgeBaseService } from './services/KnowledgeBaseService.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingChat from './components/FloatingChat.jsx';
import KnowledgeBaseList from './components/KnowledgeBaseList.jsx';
import ArticleDetail from './components/ArticleDetail.jsx';
import { display, value } from './utils/fields.js';
import './app.css';

export default function KnowledgeBaseApp() {
  const [currentView, setCurrentView] = useState('list');
  const [currentArticleSlug, setCurrentArticleSlug] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const service = useMemo(() => new KnowledgeBaseService(), []);
  const articlesPerPage = 10;

  useEffect(() => {
    initializePage();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('article/')) {
        const slug = hash.replace('article/', '');
        setCurrentView('detail');
        setCurrentArticleSlug(slug);
      } else {
        setCurrentView('list');
        setCurrentArticleSlug(null);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentView === 'list') {
      loadArticles();
    }
  }, [currentView, searchQuery, selectedCategory, currentPage]);

  const initializePage = async () => {
    try {
      const categoriesData = await service.getCategories();
      setCategories(categoriesData);
      
      await loadArticles();
    } catch (error) {
      console.error('Error initializing page:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadArticles = async () => {
    if (currentView !== 'list') return;
    
    setLoading(true);
    try {
      const offset = (currentPage - 1) * articlesPerPage;
      const { articles: articlesData, totalCount: total } = await service.getArticles({
        search: searchQuery,
        category: selectedCategory,
        offset,
        limit: articlesPerPage
      });
      
      setArticles(articlesData);
      setTotalCount(total);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = (view, slug = null) => {
    if (view === 'detail' && slug) {
      window.location.hash = `article/${slug}`;
    } else if (view === 'list') {
      window.location.hash = '';
    } else {
      // Navigate to main portal sections
      window.location.href = `/x_snc_amoila_conne_amoila.do#${view}`;
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleArticleClick = (article) => {
    const slug = display(article.slug) || value(article.sys_id);
    navigate('detail', slug);
  };

  return (
    <div className="amoila-portal">
      <Header navigate={navigate} currentView="knowledge-base" />
      
      {currentView === 'list' && (
        <KnowledgeBaseList
          articles={articles}
          categories={categories}
          loading={loading}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          currentPage={currentPage}
          totalCount={totalCount}
          articlesPerPage={articlesPerPage}
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          onPageChange={handlePageChange}
          onArticleClick={handleArticleClick}
          navigate={navigate}
        />
      )}
      
      {currentView === 'detail' && (
        <ArticleDetail
          slug={currentArticleSlug}
          service={service}
          navigate={navigate}
          onArticleClick={handleArticleClick}
        />
      )}
      
      <Footer />
      <FloatingChat />
    </div>
  );
}