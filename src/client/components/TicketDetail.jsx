import React, { useState, useEffect, useMemo } from 'react';
import { SupportTicketService } from '../services/SupportTicketService.js';
import { display, value } from '../utils/fields.js';
import './TicketDetail.css';

export default function TicketDetail({ ticketNumber, navigate, isAuthenticated }) {
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const service = useMemo(() => new SupportTicketService(), []);

  useEffect(() => {
    if (ticketNumber && isAuthenticated) {
      loadTicketDetails();
    } else {
      setLoading(false);
    }
  }, [ticketNumber, isAuthenticated]);

  const loadTicketDetails = async () => {
    setLoading(true);
    try {
      const ticketData = await service.getTicketByNumber(ticketNumber);
      if (ticketData) {
        setTicket(ticketData);
        await loadComments(value(ticketData.sys_id));
        
        // Check if rating already exists
        if (display(ticketData.satisfaction_rating)) {
          setRatingSubmitted(true);
          setRating(parseInt(display(ticketData.satisfaction_rating)));
        }
      }
    } catch (error) {
      console.error('Error loading ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (ticketId) => {
    setCommentLoading(true);
    try {
      const commentsData = await service.getTicketComments(ticketId);
      setComments(commentsData);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !ticket) return;
    
    setSubmittingComment(true);
    try {
      await service.addComment(value(ticket.sys_id), newComment.trim());
      setNewComment('');
      await loadComments(value(ticket.sys_id));
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleRatingSubmit = async (selectedRating) => {
    if (!ticket || ratingSubmitted) return;
    
    try {
      const success = await service.submitSatisfactionRating(value(ticket.sys_id), selectedRating);
      if (success) {
        setRating(selectedRating);
        setRatingSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusStr = display(status).toLowerCase();
    switch (statusStr) {
      case 'new': return 'status-new';
      case 'in_progress': return 'status-progress';
      case 'awaiting_info': return 'status-waiting';
      case 'resolved': return 'status-resolved';
      case 'closed': return 'status-closed';
      default: return 'status-default';
    }
  };

  const getStatusLabel = (status) => {
    const statusStr = display(status).toLowerCase();
    switch (statusStr) {
      case 'new': return 'New';
      case 'in_progress': return 'In Progress';
      case 'awaiting_info': return 'Awaiting Info';
      case 'resolved': return 'Resolved';
      case 'closed': return 'Closed';
      default: return display(status);
    }
  };

  const getPriorityClass = (priority) => {
    const priorityStr = display(priority).toLowerCase();
    switch (priorityStr) {
      case 'critical': return 'priority-critical';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const isTicketClosed = () => {
    const status = display(ticket?.state).toLowerCase();
    return status === 'closed';
  };

  const isTicketResolved = () => {
    const status = display(ticket?.state).toLowerCase();
    return status === 'resolved';
  };

  if (!isAuthenticated) {
    return (
      <main className="ticket-detail-main">
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
            <p>Please log in to view ticket details.</p>
            <button className="btn btn-primary" onClick={() => window.location.href = '/login.do'}>
              Login
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="ticket-detail-main">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading ticket details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="ticket-detail-main">
        <div className="container">
          <div className="not-found">
            <div className="not-found-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h2>Ticket Not Found</h2>
            <p>The ticket you're looking for doesn't exist or you don't have access to it.</p>
            <button className="btn btn-primary" onClick={() => navigate('my-tickets')}>
              Back to My Tickets
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="ticket-detail-main">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <button onClick={() => navigate('home')} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-separator">/</span>
            <button onClick={() => navigate('my-tickets')} className="breadcrumb-link">My Tickets</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{display(ticket.number)}</span>
          </nav>
        </div>
      </div>

      <div className="container">
        {/* Ticket Header */}
        <div className="ticket-header">
          <div className="ticket-title-section">
            <h1 className="ticket-number">{display(ticket.number)}</h1>
            <h2 className="ticket-subject">{display(ticket.short_description)}</h2>
          </div>
          
          <div className="ticket-meta">
            <div className="meta-row">
              <div className="meta-item">
                <span className="meta-label">Status:</span>
                <span className={`status-badge ${getStatusBadgeClass(ticket.state)}`}>
                  {getStatusLabel(ticket.state)}
                </span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Priority:</span>
                <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
                  {display(ticket.priority)}
                </span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{display(ticket.category)}</span>
              </div>
            </div>
            
            <div className="meta-row">
              <div className="meta-item">
                <span className="meta-label">Created:</span>
                <span className="meta-value">{formatDateTime(display(ticket.sys_created_on))}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Updated:</span>
                <span className="meta-value">{formatDateTime(display(ticket.sys_updated_on))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Description */}
        <div className="ticket-description">
          <h3>Description</h3>
          <div className="description-content">
            <p>{display(ticket.description)}</p>
          </div>
        </div>

        {/* Comments Thread */}
        <div className="comments-section">
          <h3>Conversation</h3>
          
          {commentLoading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading comments...</p>
            </div>
          ) : (
            <div className="comments-thread">
              {comments.length === 0 ? (
                <div className="no-comments">
                  <p>No comments yet. Be the first to add a comment!</p>
                </div>
              ) : (
                comments.map(comment => (
                  <div key={value(comment.sys_id)} className="comment">
                    <div className="comment-header">
                      <span className="comment-author">
                        {display(comment.user_type) === 'customer' ? 'You' : 'Support Team'}
                      </span>
                      <span className="comment-date">
                        {formatDateTime(display(comment.sys_created_on))}
                      </span>
                    </div>
                    <div className="comment-content">
                      <p>{display(comment.comment)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Add Reply Form */}
          {!isTicketClosed() && (
            <div className="reply-section">
              <h4>Add Reply</h4>
              <form onSubmit={handleAddComment} className="reply-form">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your reply here..."
                  rows="4"
                  className="reply-textarea"
                  disabled={submittingComment}
                />
                <div className="reply-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submittingComment || !newComment.trim()}
                  >
                    {submittingComment ? 'Adding Reply...' : 'Add Reply'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Satisfaction Survey */}
        {isTicketResolved() && (
          <div className="satisfaction-section">
            <h3>How satisfied are you with the resolution?</h3>
            {ratingSubmitted ? (
              <div className="rating-submitted">
                <div className="stars-display">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={`star ${star <= rating ? 'filled' : ''}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p>Thank you for your feedback!</p>
              </div>
            ) : (
              <div className="rating-selector">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      className={`star-btn ${star <= rating ? 'selected' : ''}`}
                      onClick={() => handleRatingSubmit(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p>Click the stars to rate your experience</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}