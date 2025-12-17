import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Chat Intent Records

// Greeting Intent
export const greetingIntent = Record({
  $id: Now.ID['int_greeting'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'greeting',
    keywords: 'hello, hi, hey, good morning, good afternoon, good evening, howdy, greetings, sup, what\'s up',
    response_template: '<p>Hello! 👋 Welcome to Amoila Connect! I\'m here to help you with your fitness journey.</p><p>I can help you with:</p><ul><li>Program information and workouts</li><li>Account and billing questions</li><li>Technical support</li><li>Nutrition guidance</li></ul><p>How can I assist you today?</p>',
    action_type: 'answer',
    active: true
  }
})

// Program Information Intent
export const programInfoIntent = Record({
  $id: Now.ID['int_program_info'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'program_info',
    keywords: '645, program, workout, training, exercise, fitness plan, the work, chop wood carry water, programs available',
    response_template: '<p>Great question! Here are our available fitness programs:</p><ul><li><strong>645</strong> - Our flagship 90-day transformation program with high-intensity workouts</li><li><strong>THE WORK</strong> - Advanced strength and conditioning program</li><li><strong>CHOP WOOD CARRY WATER</strong> - Functional movement and endurance training</li><li><strong>Free Workouts</strong> - Sample routines to get you started</li></ul><p>Would you like more detailed information about any specific program?</p>',
    action_type: 'search_kb',
    active: true
  }
})

// Pricing Intent
export const pricingIntent = Record({
  $id: Now.ID['int_pricing'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'pricing',
    keywords: 'price, cost, subscription, payment, billing, how much, pricing, fees, monthly, yearly, plans',
    response_template: '<p>I\'d be happy to help you with pricing information! 💰</p><p>Our pricing varies by program and subscription type. For the most current pricing and available packages, I\'ll connect you with a team member who can provide detailed information and help you find the best option for your goals.</p><p>Would you like me to transfer you to someone who can discuss pricing options?</p>',
    action_type: 'transfer_agent',
    active: true
  }
})

// Password Reset Intent
export const passwordResetIntent = Record({
  $id: Now.ID['int_password_reset'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'password_reset',
    keywords: 'password, reset password, forgot password, can\'t login, login issues, sign in, access account',
    response_template: '<p>No worries! I can help you reset your password. 🔐</p><p>Here\'s how to reset it:</p><ol><li>Go to the login page</li><li>Click "Forgot Password?"</li><li>Enter your registered email address</li><li>Check your email for reset instructions</li><li>Follow the link to create a new password</li></ol><p>If you don\'t receive the email within 10 minutes, check your spam folder. Still having trouble? I can create a support ticket for you!</p>',
    action_type: 'show_faq',
    active: true
  }
})

// Workout Help Intent
export const workoutHelpIntent = Record({
  $id: Now.ID['int_workout_help'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'workout_help',
    keywords: 'workout help, exercise form, modification, beginner, too hard, too easy, injury, can\'t do exercise',
    response_template: '<p>I\'m here to help you succeed with your workouts! 💪</p><p>For workout modifications, form guidance, or exercise alternatives:</p><ul><li>Check our workout blueprints for detailed form instructions</li><li>Every exercise has beginner and advanced modifications</li><li>Listen to your body - it\'s okay to modify as needed</li></ul><p>For specific form questions or injury concerns, I recommend speaking with one of our certified coaches. Would you like me to connect you with a coach?</p>',
    action_type: 'transfer_agent',
    active: true
  }
})

// Nutrition Intent
export const nutritionIntent = Record({
  $id: Now.ID['int_nutrition'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'nutrition',
    keywords: 'nutrition, diet, meal plan, eating, food, recipes, meal prep, calories, macros, supplements',
    response_template: '<p>Nutrition is a huge part of your fitness success! 🥗</p><p>Each program includes:</p><ul><li>Complete nutrition guides</li><li>Meal plans and shopping lists</li><li>Meal prep strategies</li><li>Healthy recipe ideas</li></ul><p>You can find all nutrition resources in your program dashboard. For personalized nutrition advice, our coaches can provide additional guidance. Would you like me to search our nutrition articles for you?</p>',
    action_type: 'search_kb',
    active: true
  }
})

// Equipment Intent
export const equipmentIntent = Record({
  $id: Now.ID['int_equipment'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'equipment',
    keywords: 'equipment, gear, weights, dumbbells, resistance bands, pull-up bar, what do I need, home gym',
    response_template: '<p>Great question about equipment! 🏋️</p><p>Equipment varies by program:</p><ul><li><strong>645:</strong> Dumbbells, resistance bands, pull-up bar (modifications available)</li><li><strong>THE WORK:</strong> Full gym or home gym setup recommended</li><li><strong>CHOP WOOD CARRY WATER:</strong> Minimal equipment needed</li><li><strong>Free Workouts:</strong> Mostly bodyweight exercises</li></ul><p>Each program includes equipment alternatives and modifications. Check your program guide for the complete equipment list!</p>',
    action_type: 'show_faq',
    active: true
  }
})

// Cancel Intent
export const cancelIntent = Record({
  $id: Now.ID['int_cancel'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'cancel',
    keywords: 'cancel, cancellation, unsubscribe, stop subscription, end membership, quit, refund',
    response_template: '<p>I\'m sorry to see you\'re considering canceling! 😔</p><p>Before you go, I\'d love to help address any concerns you might have. Sometimes we can resolve issues that might change your mind.</p><p>If you\'re sure you want to proceed with cancellation, I can help you with that process or connect you with someone who can assist with your account. Would you like to speak with a team member about your experience first?</p>',
    action_type: 'transfer_agent',
    active: true
  }
})

// Contact Human Intent
export const contactHumanIntent = Record({
  $id: Now.ID['int_contact_human'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'contact_human',
    keywords: 'human, person, agent, representative, speak to someone, talk to person, customer service, live chat',
    response_template: '<p>I\'d be happy to connect you with a human team member! 👨‍💼👩‍💼</p><p>Let me transfer you to one of our support specialists who can provide personalized assistance. They\'ll be able to help with any questions or concerns you have.</p><p>Please hold on while I connect you...</p>',
    action_type: 'transfer_agent',
    active: true
  }
})

// Thanks Intent
export const thanksIntent = Record({
  $id: Now.ID['int_thanks'],
  table: 'x_snc_amoila_conne_chat_intent',
  data: {
    name: 'thanks',
    keywords: 'thank you, thanks, thx, appreciate, helpful, great, awesome, perfect, exactly what I needed',
    response_template: '<p>You\'re so welcome! 😊 I\'m glad I could help!</p><p>Remember, I\'m here whenever you need assistance with your fitness journey. Whether you have questions about workouts, nutrition, or your account, just ask!</p><p>Keep up the great work, and remember - the only bad workout is the one you don\'t do! 💪</p><p>Is there anything else I can help you with today?</p>',
    action_type: 'answer',
    active: true
  }
})