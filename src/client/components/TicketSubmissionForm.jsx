import React, { useState, useEffect, useMemo } from 'react';
import { SupportTicketService } from '../services/SupportTicketService.js';
import { display, value } from '../utils/fields.js';
import './TicketSubmissionForm.css';

export default function TicketSubmissionForm({ navigate, onTicketSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    priority: 'medium',
    subject: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [errors, setErrors] = useState({});

  const service = useMemo(() => new SupportTicketService(), []);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const categoriesData = await service.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const ticket = await service.submitTicket(formData);
      setSubmittedTicket(ticket);
      setSubmitted(true);
      onTicketSubmitted(display(ticket.number));
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setErrors({ submit: 'Failed to submit ticket. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    setSubmittedTicket(null);
    setFormData({
      name: '',
      email: '',
      category: '',
      priority: 'medium',
      subject: '',
      description: ''
    });
    setErrors({});
  };

  if (submitted && submittedTicket) {
    return (
      <main className="support-main">
        <div className="container">
          <div className="success-container">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
              </svg>
            </div>
            
            <h1 className="success-title">Ticket Submitted Successfully!</h1>
            
            <div className="ticket-info">
              <p className="ticket-number">
                <strong>Ticket Number: {display(submittedTicket.number)}</strong>
              </p>
              <p className="ticket-message">
                Your support request has been received and our team will respond within 24 hours. 
                You can track the progress of your ticket anytime.
              </p>
            </div>
            
            <div className="success-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate('my-tickets')}
              >
                View My Tickets
              </button>
              <button
                className="btn btn-outline"
                onClick={handleSubmitAnother}
              >
                Submit Another Ticket
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="support-main">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <button onClick={() => navigate('home')} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Get Support</span>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="support-header">
          <h1 className="support-title">Get Support</h1>
          <p className="support-subtitle">
            Need help? Submit a support ticket and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="form-container">
          <form className="ticket-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Category Field */}
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category <span className="required">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`form-select ${errors.category ? 'error' : ''}`}
                  disabled={loading}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={value(category.sys_id)} value={value(category.sys_id)}>
                      {display(category.name)}
                    </option>
                  ))}
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>

              {/* Priority Field */}
              <div className="form-group">
                <label htmlFor="priority" className="form-label">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Standard support</option>
                  <option value="high">High - Urgent issue</option>
                  <option value="critical">Critical - System down</option>
                </select>
              </div>
            </div>

            {/* Subject Field */}
            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject <span className="required">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`form-input ${errors.subject ? 'error' : ''}`}
                placeholder="Brief description of your issue"
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            {/* Description Field */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                rows="6"
                placeholder="Please provide detailed information about your issue, including any steps you've already tried..."
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="form-error">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="button-spinner"></div>
                    Submitting Ticket...
                  </>
                ) : (
                  'Submit Ticket'
                )}
              </button>
            </div>
          </form>

          {/* Help Section */}
          <div className="help-section">
            <h3>Need immediate help?</h3>
            <p>Before submitting a ticket, check out these resources:</p>
            <div className="help-links">
              <button
                className="help-link"
                onClick={() => navigate('knowledge-base')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                Browse Knowledge Base
              </button>
              
              <button
                className="help-link"
                onClick={() => navigate('faqs')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Check FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}