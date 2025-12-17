import { display, value } from '../utils/fields.js';

export class FaqService {
  constructor() {
    this.tableName = "x_snc_amoila_conne_faq";
    this.categoryTable = "x_snc_amoila_conne_category";
  }

  async getFaqs(options = {}) {
    const { search = '', category = '' } = options;

    let query = 'active=true';
    
    if (search) {
      query += `^questionCONTAINS${search}^ORanswerCONTAINS${search}`;
    }
    
    if (category) {
      query += `^category=${category}`;
    }

    const params = new URLSearchParams({
      sysparm_display_value: 'all',
      sysparm_query: query,
      sysparm_orderby: 'DESCfeatured,DESCview_count'
    });

    try {
      const response = await fetch(`/api/now/table/${this.tableName}?${params}`, {
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return [];
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

  async submitFeedback(faqId, helpful) {
    try {
      // This would typically create a feedback record or update the FAQ
      console.log(`Feedback for FAQ ${faqId}: ${helpful ? 'helpful' : 'not helpful'}`);
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
  }

  async incrementViewCount(faqId) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${faqId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify({
          view_count: 'javascript:current.view_count + 1'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error incrementing view count:', error);
      return false;
    }
  }
}