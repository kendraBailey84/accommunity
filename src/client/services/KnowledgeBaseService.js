import { display, value } from '../utils/fields.js';

export class KnowledgeBaseService {
  constructor() {
    this.tableName = "x_snc_amoila_conne_kb_article";
    this.categoryTable = "x_snc_amoila_conne_category";
  }

  async getArticles(options = {}) {
    const { 
      search = '', 
      category = '', 
      offset = 0, 
      limit = 10,
      orderBy = 'view_count' 
    } = options;

    let query = 'published=true';
    
    if (search) {
      query += `^titleCONTAINS${search}^ORshort_descriptionCONTAINS${search}`;
    }
    
    if (category) {
      query += `^category=${category}`;
    }

    const params = new URLSearchParams({
      sysparm_display_value: 'all',
      sysparm_query: query,
      sysparm_offset: offset.toString(),
      sysparm_limit: limit.toString(),
      sysparm_orderby: `DESC${orderBy}`,
      sysparm_count: 'true'
    });

    try {
      const response = await fetch(`/api/now/table/${this.tableName}?${params}`, {
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json();
      return {
        articles: data.result || [],
        totalCount: parseInt(response.headers.get('X-Total-Count') || '0')
      };
    } catch (error) {
      console.error('Error fetching articles:', error);
      return { articles: [], totalCount: 0 };
    }
  }

  async getArticleBySlug(slug) {
    try {
      const response = await fetch(
        `/api/now/table/${this.tableName}?sysparm_display_value=all&sysparm_query=slug=${slug}^published=true`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }

      const data = await response.json();
      const article = data.result?.[0];
      
      if (article) {
        // Increment view count
        await this.incrementViewCount(value(article.sys_id));
      }
      
      return article;
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  }

  async getRelatedArticles(articleId, categoryId, limit = 4) {
    try {
      const response = await fetch(
        `/api/now/table/${this.tableName}?sysparm_display_value=all&sysparm_query=published=true^category=${categoryId}^sys_id!=${articleId}&sysparm_limit=${limit}&sysparm_orderby=DESCview_count`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch related articles');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching related articles:', error);
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

  async incrementViewCount(articleId) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${articleId}`, {
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

  async submitFeedback(articleId, helpful) {
    try {
      // This would typically create a feedback record
      // For now, we'll just log it
      console.log(`Feedback for article ${articleId}: ${helpful ? 'helpful' : 'not helpful'}`);
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
  }
}