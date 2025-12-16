import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'
import { 
  gettingStartedCategory, 
  programsWorkoutsCategory, 
  technicalSupportCategory, 
  communityCategory 
} from './sample-categories.now'

// FAQ Records covering the requested topics

// Account Creation FAQ
export const accountCreationFaq = Record({
  $id: Now.ID['faq_account_creation'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'How do I create an account?',
    answer: '<p>To create your Amoila Connect account:</p><ol><li>Visit the registration page</li><li>Enter your email address and create a secure password</li><li>Verify your email through the confirmation link</li><li>Complete your profile with your fitness goals and experience level</li><li>Start your fitness journey!</li></ol>',
    category: gettingStartedCategory.$id,
    display_order: 10,
    active: true,
    featured: true
  }
})

// Programs FAQ
export const programsFaq = Record({
  $id: Now.ID['faq_programs'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'What programs are available?',
    answer: '<p>Amoila Connect offers several comprehensive fitness programs:</p><ul><li><strong>645</strong> - Our flagship high-intensity program</li><li><strong>THE WORK</strong> - Advanced strength and conditioning</li><li><strong>CHOP WOOD CARRY WATER</strong> - Functional movement patterns</li><li><strong>Free Workouts</strong> - Sample routines to get started</li></ul><p>Each program includes detailed workout guides, nutrition plans, and community support.</p>',
    category: programsWorkoutsCategory.$id,
    display_order: 20,
    active: true,
    featured: true
  }
})

// 645 Access FAQ
export const access645Faq = Record({
  $id: Now.ID['faq_645_access'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'How do I get access to the 645 program?',
    answer: '<p>To access the 645 program:</p><ol><li>Ensure you have an active subscription or one-time purchase</li><li>Navigate to Programs in your dashboard</li><li>Click on 645 to access all workouts, meal plans, and resources</li><li>Download the companion materials for offline access</li></ol><p>If you\'re having trouble accessing content you\'ve purchased, contact support for assistance.</p>',
    category: programsWorkoutsCategory.$id,
    display_order: 30,
    active: true,
    featured: false
  }
})

// Cancellation FAQ
export const cancellationFaq = Record({
  $id: Now.ID['faq_cancellation'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'How do I cancel my subscription?',
    answer: '<p>To cancel your subscription:</p><ol><li>Log into your account</li><li>Go to Account Settings > Subscription</li><li>Click "Cancel Subscription"</li><li>Follow the prompts to complete cancellation</li></ol><p>Your access will continue until the end of your current billing period. You can reactivate anytime before expiration.</p>',
    category: technicalSupportCategory.$id,
    display_order: 40,
    active: true,
    featured: false
  }
})

// Password Reset FAQ
export const passwordResetFaq = Record({
  $id: Now.ID['faq_password_reset'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'How do I reset my password?',
    answer: '<p>To reset your password:</p><ol><li>Go to the login page</li><li>Click "Forgot Password?"</li><li>Enter your registered email address</li><li>Check your email for reset instructions</li><li>Follow the link to create a new password</li></ol><p>If you don\'t receive the email within 10 minutes, check your spam folder or contact support.</p>',
    category: technicalSupportCategory.$id,
    display_order: 50,
    active: true,
    featured: false
  }
})

// Equipment FAQ
export const equipmentFaq = Record({
  $id: Now.ID['faq_equipment'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'What equipment do I need for the programs?',
    answer: '<p>Equipment varies by program:</p><ul><li><strong>645:</strong> Dumbbells (adjustable recommended), resistance bands, pull-up bar</li><li><strong>THE WORK:</strong> Full gym setup or home gym with barbell, plates, bench</li><li><strong>CHOP WOOD CARRY WATER:</strong> Minimal equipment - dumbbells and resistance bands</li><li><strong>Free Workouts:</strong> Bodyweight exercises, optional light weights</li></ul><p>Each program includes equipment alternatives and modifications for different setups.</p>',
    category: programsWorkoutsCategory.$id,
    display_order: 60,
    active: true,
    featured: true
  }
})

// Support Contact FAQ
export const supportContactFaq = Record({
  $id: Now.ID['faq_support_contact'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'How do I contact support?',
    answer: '<p>We\'re here to help! Contact our support team:</p><ul><li><strong>Email:</strong> support@amoilaconnect.com</li><li><strong>Live Chat:</strong> Available 9 AM - 6 PM EST (bottom right corner)</li><li><strong>Phone:</strong> 1-800-AMOILA (business hours)</li><li><strong>Help Center:</strong> Browse our knowledge base for instant answers</li></ul><p>Response time: Email within 24 hours, chat and phone during business hours.</p>',
    category: technicalSupportCategory.$id,
    display_order: 70,
    active: true,
    featured: true
  }
})

// Free Workouts FAQ
export const freeWorkoutsFaq = Record({
  $id: Now.ID['faq_free_workouts'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'Are there free workouts available?',
    answer: '<p>Yes! We offer several free resources:</p><ul><li><strong>Sample Workouts:</strong> Try before you buy with 3 complete workouts</li><li><strong>Warm-up Routines:</strong> Essential mobility and activation exercises</li><li><strong>Cool-down Sequences:</strong> Recovery and flexibility routines</li><li><strong>Nutrition Tips:</strong> Basic meal planning guidelines</li></ul><p>Access these in the "Free Workouts" section - no subscription required!</p>',
    category: programsWorkoutsCategory.$id,
    display_order: 80,
    active: true,
    featured: false
  }
})

// Blueprints FAQ
export const blueprintsFaq = Record({
  $id: Now.ID['faq_blueprints'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'What are Blueprints and how do I use them?',
    answer: '<p>Blueprints are comprehensive guides that accompany each program:</p><ul><li><strong>Workout Blueprints:</strong> Detailed exercise instructions, form cues, and modifications</li><li><strong>Nutrition Blueprints:</strong> Meal plans, shopping lists, and prep guides</li><li><strong>Recovery Blueprints:</strong> Sleep optimization, stress management, and mobility work</li></ul><p>Download them from your program dashboard and use them as reference during workouts and meal prep.</p>',
    category: programsWorkoutsCategory.$id,
    display_order: 90,
    active: true,
    featured: false
  }
})

// Community FAQ
export const communityFaq = Record({
  $id: Now.ID['faq_community'],
  table: 'x_snc_amoila_conne_faq',
  data: {
    question: 'How do I participate in the community?',
    answer: '<p>Join our vibrant fitness community:</p><ul><li><strong>Community Forum:</strong> Share progress, ask questions, celebrate wins</li><li><strong>Accountability Partners:</strong> Find workout buddies with similar goals</li><li><strong>Challenges:</strong> Participate in monthly fitness challenges</li><li><strong>Live Events:</strong> Join virtual workouts and Q&A sessions</li></ul><p>Be respectful, supportive, and celebrate everyone\'s journey. Check our Community Guidelines for complete rules.</p>',
    category: communityCategory.$id,
    display_order: 100,
    active: true,
    featured: false
  }
})