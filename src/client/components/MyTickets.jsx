import React, { useState, useEffect, useMemo } from 'react';
import { SupportTicketService } from '../services/SupportTicketService.js';
import { display, value } from '../utils/fields.js';
import './MyTickets.css';

export default function MyTickets({ navigate, isAuthenticated }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const service = useMemo(() => new SupportTicketService(), []);

  useEffect(() => {
    if (isAuthenticated) {
      loadTickets();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, activeFilter]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const ticketsData = await service.getMyTickets(activeFilter);
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusStr = display(status).toLowerCase();
    switch (statusStr) {
      case 'new':
        return 'status-new';
      case 'in_progress':
        return 'status-progress';
      case 'awaiting_info':
        return 'status-waiting';
      case 'resolved':
        return 'status-resolved';
      case 'closed':
        return 'status-closed';
      default:
        return 'status-default';
    }
  };

  const getStatusLabel = (status) => {
    const statusStr = display(status).toLowerCase();
    switch (statusStr) {
      case 'new':
        return 'New';
      case 'in_progress':
        return 'In Progress';
      case 'awaiting_info':
        return 'Awaiting Info';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return display(status);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleTicketClick = (ticket) => {
    navigate('detail', display(ticket.number));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  if (!isAuthenticated) {
    return (
      <main className="tickets-main">
        <div className="container">
          <div className="auth-required">
            <div className="auth-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2>Login Required</h2>
            <p>Please log in to view your support tickets.</p>
            <div className="auth-actions">
              <button className="btn btn-primary" onClick={() => window.location.href = '/login.do'}>
                Login
              </button>
              <button className="btn btn-outline" onClick={() => navigate('submit')}>
                Submit New Ticket
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="tickets-main">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <button onClick={() => navigate('home')} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">My Tickets</span>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="tickets-header">
          <h1 className="tickets-title">My Support Tickets</h1>
          <p className="tickets-subtitle">
            Track and manage all your support requests in one place
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Tickets
          </button>
          <button
            className={`filter-tab ${activeFilter === 'open' ? 'active' : ''}`}
            onClick={() => handleFilterChange('open')}
          >
            Open
          </button>
          <button
            className={`filter-tab ${activeFilter === 'resolved' ? 'active' : ''}`}
            onClick={() => handleFilterChange('resolved')}
          >
            Resolved
          </button>
        </div>

        {/* Tickets Content */}
        <div className="tickets-content">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading your tickets...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <h3>No tickets found</h3>
              <p>
                {activeFilter === 'all' 
                  ? "You haven't submitted any support tickets yet." 
                  : `No ${activeFilter} tickets found.`}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('submit')}
              >
                Submit Your First Ticket
              </button>
            </div>
          ) : (
            <div className="tickets-table-container">
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Ticket #</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(ticket => (
                    <tr
                      key={value(ticket.sys_id)}
                      className="ticket-row"
                      onClick={() => handleTicketClick(ticket)}
                    >
                      <td className="ticket-number">
                        {display(ticket.number)}
                      </td>
                      <td className="ticket-subject">
                        <div className="subject-text">
                          {display(ticket.short_description)}
                        </div>
                        <div className="ticket-category">
                          {display(ticket.category)}
                        </div>
                      </td>
                      <td className="ticket-status">
                        <span className={`status-badge ${getStatusBadgeClass(ticket.state)}`}>
                          {getStatusLabel(ticket.state)}
                        </span>
                      </td>
                      <td className="ticket-created">
                        {formatDate(display(ticket.sys_created_on))}
                      </td>
                      <td className="ticket-updated">
                        {formatDate(display(ticket.sys_updated_on))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Action Buttons */}
          <div className="tickets-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate('submit')}
            >
              Submit New Ticket
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}