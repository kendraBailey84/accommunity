import { display, value } from '../utils/fields.js';

export class ChatService {
  constructor() {
    this.sessionTable = "x_snc_amoila_conne_chat_session";
    this.messageTable = "x_snc_amoila_conne_chat_message";
    this.intentTable = "x_snc_amoila_conne_chat_intent";
    this.faqTable = "x_snc_amoila_conne_faq";
    this.kbTable = "x_snc_amoila_conne_kb_article";
  }

  // Generate a unique session ID
  generateSessionId() {
    return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async createChatSession(guestName = null, guestEmail = null) {
    const sessionId = this.generateSessionId();
    
    try {
      const response = await fetch(`/api/now/table/${this.sessionTable}?sysparm_display_value=all`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify({
          session_id: sessionId,
          guest_name: guestName,
          guest_email: guestEmail,
          session_type: 'general',
          message_count: 0,
          active: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create chat session');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  }

  async addMessage(sessionId, senderType, senderName, message, intentDetected = null) {
    try {
      const response = await fetch(`/api/now/table/${this.messageTable}?sysparm_display_value=all`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify({
          session: sessionId,
          sender_type: senderType,
          sender_name: senderName,
          message: message,
          intent_detected: intentDetected
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add message');
      }

      const data = await response.json();
      
      // Update session message count
      await this.updateSessionMessageCount(sessionId);
      
      return data.result;
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }

  async updateSessionMessageCount(sessionId) {
    try {
      // Get current message count
      const response = await fetch(
        `/api/now/table/${this.messageTable}?sysparm_query=session=${sessionId}&sysparm_count=true`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );
      
      const countResponse = await response.text();
      const count = parseInt(countResponse) || 0;

      // Update session with new count
      await fetch(`/api/now/table/${this.sessionTable}/${sessionId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify({
          message_count: count.toString()
        })
      });
    } catch (error) {
      console.error('Error updating message count:', error);
    }
  }

  async getChatIntents() {
    try {
      const response = await fetch(
        `/api/now/table/${this.intentTable}?sysparm_display_value=all&sysparm_query=active=true`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch intents');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching intents:', error);
      return [];
    }
  }

  async searchFAQs(searchTerms) {
    try {
      // Create search query for FAQ table
      const searchQuery = searchTerms.map(term => `questionCONTAINS${term}^ORanswerCONTAINS${term}`).join('^OR');
      
      const response = await fetch(
        `/api/now/table/${this.faqTable}?sysparm_display_value=all&sysparm_query=active=true^(${searchQuery})&sysparm_limit=3&sysparm_orderby=DESCfeatured,DESCview_count`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to search FAQs');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error searching FAQs:', error);
      return [];
    }
  }

  async searchKnowledgeBase(searchTerms) {
    try {
      // Create search query for KB articles
      const searchQuery = searchTerms.map(term => `titleCONTAINS${term}^ORshort_descriptionCONTAINS${term}^ORcontentCONTAINS${term}`).join('^OR');
      
      const response = await fetch(
        `/api/now/table/${this.kbTable}?sysparm_display_value=all&sysparm_query=published=true^(${searchQuery})&sysparm_limit=2&sysparm_orderby=DESCview_count`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to search knowledge base');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error searching knowledge base:', error);
      return [];
    }
  }

  extractSearchTerms(userMessage) {
    // Clean and extract meaningful search terms
    const cleanMessage = userMessage.toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();

    // Remove common stop words
    const stopWords = ['how', 'can', 'do', 'i', 'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'to', 'of', 'in', 'for', 'on', 'with', 'by', 'from', 'at', 'about', 'what', 'when', 'where', 'why', 'which', 'who', 'whom', 'that', 'this', 'these', 'those', 'and', 'or', 'but', 'if', 'then', 'else', 'my', 'your', 'his', 'her', 'its', 'our', 'their'];
    
    const words = cleanMessage.split(' ')
      .filter(word => word.length > 2 && !stopWords.includes(word))
      .slice(0, 5); // Limit to 5 most relevant terms

    return words;
  }

  async searchContent(userMessage) {
    try {
      const searchTerms = this.extractSearchTerms(userMessage);
      if (searchTerms.length === 0) {
        return { faqs: [], articles: [], searchTerms: [], confidence: 0 };
      }

      // Enhanced search with Now Assist-like functionality
      const [faqs, articles] = await Promise.all([
        this.enhancedFAQSearch(searchTerms, userMessage),
        this.enhancedArticleSearch(searchTerms, userMessage)
      ]);

      // Calculate confidence score
      const confidence = this.calculateSearchConfidence(faqs, articles, searchTerms);

      return { faqs, articles, searchTerms, confidence };
    } catch (error) {
      console.error('Error searching content:', error);
      return { faqs: [], articles: [], searchTerms: [], confidence: 0 };
    }
  }

  async enhancedFAQSearch(searchTerms, originalMessage) {
    try {
      // Multi-tier search strategy
      const searches = [
        // Tier 1: Exact phrase search
        this.searchFAQsByPhrase(originalMessage),
        // Tier 2: Multi-term search
        this.searchFAQsByTerms(searchTerms),
        // Tier 3: Individual term search with ranking
        this.searchFAQsByIndividualTerms(searchTerms)
      ];

      const results = await Promise.all(searches);
      
      // Merge and deduplicate results
      const allFAQs = [];
      const seenIds = new Set();
      
      results.forEach((result, tierIndex) => {
        result.forEach(faq => {
          const id = value(faq.sys_id);
          if (!seenIds.has(id)) {
            seenIds.add(id);
            faq.searchTier = tierIndex + 1;
            faq.relevanceScore = this.calculateRelevanceScore(faq, searchTerms, originalMessage);
            allFAQs.push(faq);
          }
        });
      });

      // Sort by relevance and return top results
      return allFAQs
        .sort((a, b) => {
          // Priority: tier (lower is better), then relevance score (higher is better)
          if (a.searchTier !== b.searchTier) return a.searchTier - b.searchTier;
          return b.relevanceScore - a.relevanceScore;
        })
        .slice(0, 3);

    } catch (error) {
      console.error('Error in enhanced FAQ search:', error);
      return [];
    }
  }

  async enhancedArticleSearch(searchTerms, originalMessage) {
    try {
      // Similar multi-tier approach for articles
      const searches = [
        this.searchArticlesByPhrase(originalMessage),
        this.searchArticlesByTerms(searchTerms),
        this.searchArticlesByIndividualTerms(searchTerms)
      ];

      const results = await Promise.all(searches);
      
      const allArticles = [];
      const seenIds = new Set();
      
      results.forEach((result, tierIndex) => {
        result.forEach(article => {
          const id = value(article.sys_id);
          if (!seenIds.has(id)) {
            seenIds.add(id);
            article.searchTier = tierIndex + 1;
            article.relevanceScore = this.calculateRelevanceScore(article, searchTerms, originalMessage);
            allArticles.push(article);
          }
        });
      });

      return allArticles
        .sort((a, b) => {
          if (a.searchTier !== b.searchTier) return a.searchTier - b.searchTier;
          return b.relevanceScore - a.relevanceScore;
        })
        .slice(0, 2);

    } catch (error) {
      console.error('Error in enhanced article search:', error);
      return [];
    }
  }

  async searchFAQsByPhrase(phrase) {
    const cleanPhrase = phrase.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
    if (cleanPhrase.length < 3) return [];

    try {
      const response = await fetch(
        `/api/now/table/${this.faqTable}?sysparm_display_value=all&sysparm_query=active=true^(questionCONTAINS${encodeURIComponent(cleanPhrase)}^ORanswerCONTAINS${encodeURIComponent(cleanPhrase)})&sysparm_limit=5&sysparm_orderby=DESCfeatured,DESCview_count`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) throw new Error('FAQ phrase search failed');
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error in FAQ phrase search:', error);
      return [];
    }
  }

  async searchFAQsByTerms(searchTerms) {
    if (searchTerms.length === 0) return [];
    
    try {
      const termQueries = searchTerms.map(term => `questionCONTAINS${encodeURIComponent(term)}^ORanswerCONTAINS${encodeURIComponent(term)}`);
      const query = termQueries.join('^OR');

      const response = await fetch(
        `/api/now/table/${this.faqTable}?sysparm_display_value=all&sysparm_query=active=true^(${query})&sysparm_limit=5&sysparm_orderby=DESCfeatured,DESCview_count`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) throw new Error('FAQ terms search failed');
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error in FAQ terms search:', error);
      return [];
    }
  }

  async searchFAQsByIndividualTerms(searchTerms) {
    // Implementation for individual term search
    return this.searchFAQsByTerms(searchTerms);
  }

  async searchArticlesByPhrase(phrase) {
    const cleanPhrase = phrase.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
    if (cleanPhrase.length < 3) return [];

    try {
      const response = await fetch(
        `/api/now/table/${this.kbTable}?sysparm_display_value=all&sysparm_query=published=true^(titleCONTAINS${encodeURIComponent(cleanPhrase)}^ORshort_descriptionCONTAINS${encodeURIComponent(cleanPhrase)}^ORcontentCONTAINS${encodeURIComponent(cleanPhrase)})&sysparm_limit=3&sysparm_orderby=DESCview_count`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) throw new Error('Article phrase search failed');
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error in article phrase search:', error);
      return [];
    }
  }

  async searchArticlesByTerms(searchTerms) {
    if (searchTerms.length === 0) return [];
    
    try {
      const termQueries = searchTerms.map(term => 
        `titleCONTAINS${encodeURIComponent(term)}^ORshort_descriptionCONTAINS${encodeURIComponent(term)}^ORcontentCONTAINS${encodeURIComponent(term)}`
      );
      const query = termQueries.join('^OR');

      const response = await fetch(
        `/api/now/table/${this.kbTable}?sysparm_display_value=all&sysparm_query=published=true^(${query})&sysparm_limit=3&sysparm_orderby=DESCview_count`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) throw new Error('Article terms search failed');
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error in article terms search:', error);
      return [];
    }
  }

  async searchArticlesByIndividualTerms(searchTerms) {
    return this.searchArticlesByTerms(searchTerms);
  }

  calculateRelevanceScore(item, searchTerms, originalMessage) {
    let score = 0;
    
    const title = display(item.title || item.question || '').toLowerCase();
    const description = display(item.short_description || item.answer || '').toLowerCase();
    const content = display(item.content || '').toLowerCase();
    const message = originalMessage.toLowerCase();

    // Exact phrase matches get highest score
    if (title.includes(message) || description.includes(message)) {
      score += 100;
    }

    // Term matches in title/question get high score
    searchTerms.forEach(term => {
      const termLower = term.toLowerCase();
      if (title.includes(termLower)) score += 50;
      if (description.includes(termLower)) score += 25;
      if (content.includes(termLower)) score += 10;
    });

    // Featured items get bonus
    if (display(item.featured) === 'true') {
      score += 20;
    }

    // View count bonus (normalized)
    const viewCount = parseInt(display(item.view_count) || '0');
    score += Math.min(viewCount / 100, 10);

    return score;
  }

  calculateSearchConfidence(faqs, articles, searchTerms) {
    if (faqs.length === 0 && articles.length === 0) return 0;
    
    let confidence = 0;
    
    // Base confidence from having results
    if (faqs.length > 0) confidence += 30;
    if (articles.length > 0) confidence += 20;
    
    // Confidence from relevance scores
    const allItems = [...faqs, ...articles];
    const avgRelevance = allItems.reduce((sum, item) => sum + (item.relevanceScore || 0), 0) / allItems.length;
    confidence += Math.min(avgRelevance / 2, 50);
    
    return Math.min(confidence, 100);
  }

  async detectIntent(userMessage) {
    try {
      const intents = await this.getChatIntents();
      const message = userMessage.toLowerCase();

      for (const intent of intents) {
        const keywords = display(intent.keywords).toLowerCase().split(',');
        const intentMatch = keywords.some(keyword => 
          message.includes(keyword.trim())
        );

        if (intentMatch) {
          return {
            intent: display(intent.name),
            response: display(intent.response_template),
            actionType: display(intent.action_type)
          };
        }
      }

      return null;
    } catch (error) {
      console.error('Error detecting intent:', error);
      return null;
    }
  }

  async generateBotResponse(userMessage, detectedIntent = null) {
    try {
      // First, search existing content
      const searchResults = await this.searchContent(userMessage);
      
      if (searchResults.faqs.length > 0 || searchResults.articles.length > 0) {
        return this.generateContentBasedResponse(searchResults, userMessage);
      }

      // If no relevant content found, check for intents
      if (detectedIntent) {
        return detectedIntent.response;
      }

      // Fallback responses when no content or intent matches
      const fallbackResponses = [
        "I'd like to help you find the right information. Let me search our knowledge base for similar questions...",
        "That's a great question! Let me look through our resources to see if we have information on that topic...",
        "I want to make sure I give you the best answer. Let me check our FAQs and articles for relevant information..."
      ];

      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble accessing our knowledge base right now. Would you like me to connect you with our support team?";
    }
  }

  generateContentBasedResponse(searchResults, userMessage) {
    const { faqs, articles, confidence } = searchResults;
    
    // AI-like response generation based on confidence
    let response = this.getSearchIntroduction(confidence, userMessage);
    
    // Add FAQ results with better formatting
    if (faqs && faqs.length > 0) {
      response += "\n\n**🔍 Most Relevant FAQs:**\n";
      faqs.forEach((faq, index) => {
        const question = display(faq.question);
        const answer = display(faq.answer);
        const shortAnswer = answer.length > 120 ? answer.substring(0, 120) + "..." : answer;
        const confidenceIndicator = faq.relevanceScore > 80 ? "🎯 " : faq.relevanceScore > 50 ? "✓ " : "";
        
        response += `\n${confidenceIndicator}**${question}**\n`;
        response += `${shortAnswer}\n`;
        
        if (index < faqs.length - 1) response += "\n";
      });
    }

    // Add Knowledge Base results
    if (articles && articles.length > 0) {
      response += "\n\n**📚 Related Articles:**\n";
      articles.forEach((article, index) => {
        const title = display(article.title);
        const description = display(article.short_description) || display(article.content);
        const shortDesc = description.length > 100 ? description.substring(0, 100) + "..." : description;
        const confidenceIndicator = article.relevanceScore > 80 ? "🎯 " : article.relevanceScore > 50 ? "✓ " : "";
        
        response += `\n${confidenceIndicator}**${title}**\n`;
        response += `${shortDesc}\n`;
        
        if (index < articles.length - 1) response += "\n";
      });
    }

    response += this.getSearchConclusion(confidence);
    return response;
  }

  getSearchIntroduction(confidence, userMessage) {
    if (confidence > 80) {
      return "Great question! I found some highly relevant information that should help:";
    } else if (confidence > 60) {
      return "I found some helpful information related to your question:";
    } else if (confidence > 40) {
      return "Here are some resources that might be related to what you're asking:";
    } else {
      return "I found a few resources that might be helpful:";
    }
  }

  getSearchConclusion(confidence) {
    if (confidence > 80) {
      return "\n\n**💡 Does this answer your question completely?**";
    } else if (confidence > 60) {
      return "\n\n**💭 Is this helpful, or do you need more specific information?**";
    } else {
      return "\n\n**🤔 Did any of this help, or should I connect you with our support team for more detailed assistance?**";
    }
  }

  async generateBotResponse(userMessage, detectedIntent = null) {
    try {
      // First, search existing content with enhanced AI search
      const searchResults = await this.searchContent(userMessage);
      
      if (searchResults.confidence > 30) {
        return this.generateContentBasedResponse(searchResults, userMessage);
      }

      // If no relevant content found, check for intents
      if (detectedIntent) {
        return this.enhanceIntentResponse(detectedIntent, userMessage);
      }

      // Enhanced fallback responses
      return this.generateIntelligentFallback(userMessage);
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble accessing our knowledge base right now. Would you like me to connect you with our support team?";
    }
  }

  enhanceIntentResponse(detectedIntent, userMessage) {
    const baseResponse = detectedIntent.response;
    
    // Add contextual enhancement based on detected intent
    if (detectedIntent.intent.toLowerCase().includes('password')) {
      return `${baseResponse}\n\n**Quick tip:** Make sure to check your email's spam folder for the password reset link, and remember that reset links expire after 24 hours.`;
    } else if (detectedIntent.intent.toLowerCase().includes('program')) {
      return `${baseResponse}\n\n**Want to learn more?** Check out our program comparison guide in the Knowledge Base for detailed information about each program's requirements and benefits.`;
    }
    
    return baseResponse;
  }

  generateIntelligentFallback(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Context-aware fallbacks based on message content
    if (message.includes('workout') || message.includes('exercise') || message.includes('training')) {
      return "That's a great fitness question! While I don't have specific information on that topic right now, our coaches are experts in workout planning and exercise techniques. Would you like me to connect you with our support team for personalized guidance?";
    } else if (message.includes('nutrition') || message.includes('diet') || message.includes('food')) {
      return "Nutrition is such an important part of your fitness journey! For personalized dietary advice and meal planning guidance, I'd recommend speaking with our support team who can provide expert nutritional guidance tailored to your goals.";
    } else if (message.includes('account') || message.includes('login') || message.includes('access')) {
      return "I understand you're having account access issues. Our technical support team can help you resolve login problems, update account information, and troubleshoot access issues quickly. Would you like me to create a support ticket for you?";
    }
    
    // Generic intelligent fallback
    const fallbacks = [
      "That's an interesting question! While I don't have specific information on that topic in our knowledge base, our support team has extensive expertise and can provide you with detailed, personalized assistance.",
      "I want to make sure you get the most accurate and helpful information. Our support team specializes in questions like yours and can provide comprehensive guidance tailored to your specific situation.",
      "Great question! For the most detailed and personalized answer, I'd recommend connecting with our support team who can dive deeper into your specific needs and provide expert guidance."
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}