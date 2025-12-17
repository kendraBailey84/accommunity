import { display, value } from '../utils/fields.js';

export class SupportTicketService {
  constructor() {
    this.ticketTable = "x_snc_amoila_conne_support_ticket";
    this.commentTable = "x_snc_amoila_conne_ticket_comment";
    this.categoryTable = "x_snc_amoila_conne_category";
  }

  async submitTicket(ticketData) {
    try {
      const response = await fetch(`/api/now/table/${this.ticketTable}?sysparm_display_value=all`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify({
          name: ticketData.name,
          email: ticketData.email,
          category: ticketData.category,
          priority: ticketData.priority,
          short_description: ticketData.subject,
          description: ticketData.description,
          state: 'new'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit ticket');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error submitting ticket:', error);
      throw error;
    }
  }

  async getMyTickets(filterState = '') {
    try {
      let query = 'emailCONTAINS@'; // This would need proper user filtering in real implementation
      
      if (filterState === 'open') {
        query += '^stateIN new,in_progress,awaiting_info';
      } else if (filterState === 'resolved') {
        query += '^stateIN resolved,closed';
      }

      const response = await fetch(
        `/api/now/table/${this.ticketTable}?sysparm_display_value=all&sysparm_query=${query}&sysparm_orderby=DESCsys_created_on`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }
  }

  async getTicketByNumber(ticketNumber) {
    try {
      const response = await fetch(
        `/api/now/table/${this.ticketTable}?sysparm_display_value=all&sysparm_query=number=${ticketNumber}`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch ticket');
      }

      const data = await response.json();
      return data.result?.[0] || null;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return null;
    }
  }

  async getTicketComments(ticketId) {
    try {
      const response = await fetch(
        `/api/now/table/${this.commentTable}?sysparm_display_value=all&sysparm_query=ticket=${ticketId}^internal!=true&sysparm_orderby=sys_created_on`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  async addComment(ticketId, commentText) {
    try {
      const response = await fetch(`/api/now/table/${this.commentTable}?sysparm_display_value=all`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify({
          ticket: ticketId,
          comment: commentText,
          internal: false,
          user_type: 'customer'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  async submitSatisfactionRating(ticketId, rating) {
    try {
      const response = await fetch(`/api/now/table/${this.ticketTable}/${ticketId}?sysparm_display_value=all`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify({
          satisfaction_rating: rating.toString()
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error submitting rating:', error);
      return false;
    }
  }

  async getCategories() {
    try {
      const response = await fetch(
        `/api/now/table/${this.categoryTable}?sysparm_display_value=all&sysparm_query=active=true&sysparm_orderby=display_order`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
}