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