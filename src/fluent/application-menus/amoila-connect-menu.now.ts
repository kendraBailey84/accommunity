import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { adminRole } from '../roles/roles.now'

// Create the Application Menu Category
export const appCategory = Record({
  $id: Now.ID['amoila_connect_category'],
  table: 'sys_app_category',
  data: {
    name: 'amoila_connect',
    style: 'border-color: #ff6b35; background-color: #fff5f2;'
  }
})

// Create the main Application Menu
export const amoimlaConnectMenu = ApplicationMenu({
  $id: Now.ID['amoila_connect_menu'],
  title: 'Amoila Connect',
  hint: 'Fitness community and training program management',
  description: 'Access member profiles, content categories, and community management tools',
  category: appCategory,
  roles: [adminRole],
  active: true,
  order: 100
})

// Dashboard Module (admin home)
export const dashboardModule = Record({
  $id: Now.ID['amoila_dashboard_module'],
  table: 'sys_app_module',
  data: {
    title: 'Dashboard',
    application: amoimlaConnectMenu.$id,
    link_type: 'DIRECT',
    query: '$amoila_connect.do',
    hint: 'Administrative dashboard',
    description: 'Main dashboard with overview and quick access',
    active: true,
    order: 100
  }
})

// Members Module (list view)
export const membersModule = Record({
  $id: Now.ID['amoila_members_module'],
  table: 'sys_app_module',
  data: {
    title: 'Members',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_member',
    hint: 'View and manage member profiles',
    description: 'List of all community members',
    active: true,
    order: 200
  }
})

// Categories Module (list view)
export const categoriesModule = Record({
  $id: Now.ID['amoila_categories_module'],
  table: 'sys_app_module',
  data: {
    title: 'Categories',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_category',
    hint: 'Manage content categories',
    description: 'List of content categories for organizing information',
    active: true,
    order: 300
  }
})

// Knowledge Articles Module (list view)
export const knowledgeArticlesModule = Record({
  $id: Now.ID['amoila_kb_articles_module'],
  table: 'sys_app_module',
  data: {
    title: 'Knowledge Articles',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_kb_article',
    hint: 'View and manage knowledge articles',
    description: 'Comprehensive guides and documentation',
    active: true,
    order: 400
  }
})

// FAQs Module (list view)
export const faqsModule = Record({
  $id: Now.ID['amoila_faqs_module'],
  table: 'sys_app_module',
  data: {
    title: 'FAQs',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_faq',
    hint: 'Frequently Asked Questions',
    description: 'Common questions and quick answers',
    active: true,
    order: 500
  }
})

// Support Tickets Module (list view)
export const supportTicketsModule = Record({
  $id: Now.ID['amoila_support_tickets_module'],
  table: 'sys_app_module',
  data: {
    title: 'Support Tickets',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_support_ticket',
    hint: 'View and manage support tickets',
    description: 'Customer support ticket system',
    active: true,
    order: 600
  }
})

// Open Tickets Module (filtered list view)
export const openTicketsModule = Record({
  $id: Now.ID['amoila_open_tickets_module'],
  table: 'sys_app_module',
  data: {
    title: 'Open Tickets',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_support_ticket',
    filter: 'stateNOTIN resolved,closed',
    hint: 'View open support tickets',
    description: 'Active support tickets requiring attention',
    active: true,
    order: 700
  }
})

// Achievements Module (list view)
export const achievementsModule = Record({
  $id: Now.ID['amoila_achievements_module'],
  table: 'sys_app_module',
  data: {
    title: 'Achievements',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_achievement',
    hint: 'Manage achievement system',
    description: 'Configure achievements and rewards',
    active: true,
    order: 800
  }
})

// XP Log Module (list view)
export const xpLogModule = Record({
  $id: Now.ID['amoila_xp_log_module'],
  table: 'sys_app_module',
  data: {
    title: 'XP Log',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_xp_log',
    hint: 'View XP transactions',
    description: 'Track all XP earnings and member progress',
    active: true,
    order: 900
  }
})

// Chat Sessions Module (list view)
export const chatSessionsModule = Record({
  $id: Now.ID['amoila_chat_sessions_module'],
  table: 'sys_app_module',
  data: {
    title: 'Chat Sessions',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_chat_session',
    hint: 'Monitor chat sessions',
    description: 'View and manage customer chat conversations',
    active: true,
    order: 1000
  }
})

// Chat Intents Module (list view)
export const chatIntentsModule = Record({
  $id: Now.ID['amoila_chat_intents_module'],
  table: 'sys_app_module',
  data: {
    title: 'Chat Intents',
    application: amoimlaConnectMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_amoila_conne_chat_intent',
    hint: 'Manage AI chat responses',
    description: 'Configure automated chat responses and actions',
    active: true,
    order: 1100
  }
})