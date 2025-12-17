import React, { useState, useEffect, useMemo } from 'react';
import { FaqService } from './services/FaqService.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingChat from './components/FloatingChat.jsx';
import FaqList from './components/FaqList.jsx';
import './app.css';

export default function FaqApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const service = useMemo(() => new FaqService(), []);

  useEffect(() => {
    initializePage();
  }, []);

  useEffect(() => {
    loadFaqs();
  }, [searchQuery, selectedCategory]);

  const initializePage = async () => {
    try {
      const categoriesData = await service.getCategories();
      setCategories(categoriesData);
      
      await loadFaqs();
    } catch (error) {
      console.error('Error initializing page:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFaqs = async () => {
    try {
      const faqsData = await service.getFaqs({
        search: searchQuery,
        category: selectedCategory
      });
      
      setFaqs(faqsData);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    }
  };

  const navigate = (view) => {
    // Navigate to main portal sections
    window.location.href = `/x_snc_amoila_conne_amoila.do#${view}`;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="amoila-portal">
      <Header navigate={navigate} currentView="faqs" />
      
      <FaqList
        faqs={faqs}
        categories={categories}
        loading={loading}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        service={service}
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        navigate={navigate}
      />
      
      <Footer />
      <FloatingChat />
    </div>
  );
}