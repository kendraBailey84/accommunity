import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'
import { 
  gettingStartedCategory, 
  programsWorkoutsCategory, 
  nutritionRecoveryCategory,
  communityCategory 
} from './sample-categories.now'

// Knowledge Article Records

// Welcome Guide
export const welcomeGuideArticle = Record({
  $id: Now.ID['kb_welcome_guide'],
  table: 'x_snc_amoila_conne_kb_article',
  data: {
    title: 'Welcome to Amoila Connect: Your Fitness Journey Starts Here',
    slug: 'welcome-guide-getting-started',
    category: gettingStartedCategory.$id,
    short_description: 'Everything you need to know to get started with Amoila Connect and begin your transformation.',
    content: '<h1>Welcome to Amoila Connect!</h1><p>Congratulations on taking the first step toward transforming your life through fitness. Amoila Connect is more than just a workout platform—it\'s your complete fitness ecosystem designed to help you build strength, confidence, and lifelong healthy habits.</p><h2>What Makes Amoila Connect Different?</h2><ul><li><strong>Science-Based Programming:</strong> Every workout is carefully designed using exercise science principles</li><li><strong>Progressive Difficulty:</strong> Programs that grow with you as you get stronger</li><li><strong>Community Support:</strong> Connect with thousands of like-minded individuals</li><li><strong>Comprehensive Resources:</strong> Workouts, nutrition, recovery, and mindset—all in one place</li></ul><h2>Getting Started</h2><ol><li><strong>Complete Your Profile:</strong> Tell us about your fitness experience and goals</li><li><strong>Choose Your Program:</strong> Start with our program quiz to find the perfect fit</li><li><strong>Set Up Your Space:</strong> Review equipment needs and prepare your workout area</li><li><strong>Join the Community:</strong> Introduce yourself and find accountability partners</li><li><strong>Start Moving:</strong> Begin with Day 1 and trust the process</li></ol><h2>Your Support Network</h2><p>Remember, you\'re not doing this alone. Our community, coaches, and support team are here every step of the way. Don\'t hesitate to ask questions, share your progress, and celebrate your victories—both big and small.</p><p><strong>Ready to transform your life? Let\'s get to work!</strong></p>',
    featured_image: 'https://example.com/welcome-guide-hero.jpg',
    published: true,
    publish_date: '2025-01-15 09:00:00',
    tags: 'getting started, welcome, beginner, introduction, fitness journey',
    view_count: 1250,
    helpful_yes: 89,
    helpful_no: 3
  }
})

// 645 Program Overview
export const program645Article = Record({
  $id: Now.ID['kb_645_overview'],
  table: 'x_snc_amoila_conne_kb_article',
  data: {
    title: '645 Program: The Ultimate 90-Day Transformation Challenge',
    slug: '645-program-complete-overview',
    category: programsWorkoutsCategory.$id,
    short_description: 'Discover everything about our flagship 645 program and how it can transform your fitness in 90 days.',
    content: '<h1>The 645 Program: Your Path to Total Transformation</h1><p>The 645 program is Amoila\'s signature 90-day fitness transformation system. Combining high-intensity interval training, strength building, and metabolic conditioning, 645 is designed to deliver maximum results in minimum time.</p><h2>Program Structure</h2><ul><li><strong>Duration:</strong> 90 days (13 weeks)</li><li><strong>Workout Length:</strong> 30-45 minutes</li><li><strong>Frequency:</strong> 6 days per week, 1 rest day</li><li><strong>Equipment:</strong> Dumbbells, resistance bands, pull-up bar (modifications provided)</li></ul><h2>The 645 Methodology</h2><p>645 gets its name from the workout structure:</p><ul><li><strong>6</strong> exercises per circuit</li><li><strong>4</strong> rounds of each circuit</li><li><strong>5</strong> different training styles rotated throughout the week</li></ul><h2>Training Styles</h2><ol><li><strong>Total Body Power:</strong> Explosive movements for athletic power</li><li><strong>Upper Power:</strong> Upper body strength and definition</li><li><strong>Functional Resistance:</strong> Real-world movement patterns</li><li><strong>Lower Power:</strong> Leg and glute development</li><li><strong>Cardio Intervals:</strong> Heart-pumping metabolic training</li></ol><h2>What\'s Included</h2><ul><li>90 unique workouts with progressions</li><li>Comprehensive nutrition guide and meal plans</li><li>Recovery and mobility routines</li><li>Mindset and motivation content</li><li>Progress tracking tools</li><li>Community access and support</li></ul><h2>Who Should Do 645?</h2><p>645 is perfect for:</p><ul><li>Individuals with basic fitness experience</li><li>Those looking for efficient, effective workouts</li><li>People who want variety in their training</li><li>Anyone ready to commit to 90 days of transformation</li></ul><p><strong>Ready to start your 645 journey? The only bad workout is the one you don\'t do!</strong></p>',
    featured_image: 'https://example.com/645-program-hero.jpg',
    published: true,
    publish_date: '2025-01-14 10:30:00',
    tags: '645, program overview, HIIT, strength training, 90 day challenge',
    view_count: 2100,
    helpful_yes: 156,
    helpful_no: 8
  }
})

// Warm-up Blueprint
export const warmupBlueprintArticle = Record({
  $id: Now.ID['kb_warmup_blueprint'],
  table: 'x_snc_amoila_conne_kb_article',
  data: {
    title: 'The Perfect Warm-Up: Your Blueprint for Injury Prevention',
    slug: 'warmup-blueprint-injury-prevention',
    category: programsWorkoutsCategory.$id,
    short_description: 'Master the art of warming up with this comprehensive guide to preparing your body for intense training.',
    content: '<h1>The Warm-Up Blueprint: Your Foundation for Success</h1><p>A proper warm-up is the most important part of your workout—yes, even more important than the workout itself. It prepares your body mentally and physically, reduces injury risk, and optimizes performance.</p><h2>The Science Behind Warming Up</h2><p>Warming up:</p><ul><li>Increases blood flow to working muscles</li><li>Raises core body temperature</li><li>Improves joint mobility and range of motion</li><li>Activates the nervous system</li><li>Prepares you mentally for the workout ahead</li></ul><h2>The 4-Phase Warm-Up Protocol</h2><h3>Phase 1: General Movement (3-5 minutes)</h3><ul><li>Light cardio: marching, arm circles, gentle movement</li><li>Goal: Raise heart rate and body temperature</li><li>Examples: Arm swings, leg swings, torso twists</li></ul><h3>Phase 2: Dynamic Mobility (5-7 minutes)</h3><ul><li>Active stretching through full range of motion</li><li>Goal: Prepare joints for movement</li><li>Examples: Leg cradles, walking lunges, hip circles</li></ul><h3>Phase 3: Activation (3-5 minutes)</h3><ul><li>Wake up dormant muscle groups</li><li>Goal: Fire up stabilizing muscles</li><li>Examples: Glute bridges, band pull-aparts, planks</li></ul><h3>Phase 4: Movement Preparation (2-3 minutes)</h3><ul><li>Rehearse movement patterns from your workout</li><li>Goal: Prime movement patterns</li><li>Examples: Bodyweight squats, push-ups, light resistance exercises</li></ul><h2>Red Flags: When NOT to Workout</h2><p>Stop your workout if you experience:</p><ul><li>Sharp, shooting pain</li><li>Dizziness or nausea</li><li>Unusual shortness of breath</li><li>Any pain that doesn\'t improve with movement</li></ul><h2>Make It a Habit</h2><p>Remember: A 15-minute warm-up can prevent weeks of injury recovery. Invest in your body—it\'s the only one you\'ve got!</p>',
    featured_image: 'https://example.com/warmup-blueprint.jpg',
    published: true,
    publish_date: '2025-01-13 08:15:00',
    tags: 'warm up, injury prevention, mobility, activation, movement prep',
    view_count: 987,
    helpful_yes: 78,
    helpful_no: 2
  }
})

// Recovery Guidelines
export const recoveryGuidelinesArticle = Record({
  $id: Now.ID['kb_recovery_guidelines'],
  table: 'x_snc_amoila_conne_kb_article',
  data: {
    title: 'Recovery Mastery: The Secret to Continuous Progress',
    slug: 'recovery-guidelines-sleep-nutrition-rest',
    category: nutritionRecoveryCategory.$id,
    short_description: 'Learn how proper recovery accelerates your results and keeps you training consistently.',
    content: '<h1>Recovery: Where the Magic Happens</h1><p>You don\'t get stronger during workouts—you get stronger during recovery. Understanding and optimizing your recovery is the difference between good results and exceptional transformation.</p><h2>The Recovery Pillars</h2><h3>1. Sleep: Your Superpower</h3><ul><li><strong>Target:</strong> 7-9 hours per night</li><li><strong>Quality matters:</strong> Deep, uninterrupted sleep</li><li><strong>Sleep hygiene:</strong> Cool, dark room; consistent schedule; no screens 1 hour before bed</li><li><strong>Recovery benefits:</strong> Muscle repair, hormone optimization, cognitive function</li></ul><h3>2. Nutrition: Fuel for Recovery</h3><ul><li><strong>Post-workout window:</strong> Protein + carbs within 2 hours</li><li><strong>Hydration:</strong> Half your body weight in ounces daily</li><li><strong>Anti-inflammatory foods:</strong> Berries, leafy greens, fatty fish</li><li><strong>Timing:</strong> Consistent meal timing supports recovery rhythms</li></ul><h3>3. Active Recovery</h3><ul><li><strong>Light movement:</strong> Walking, gentle yoga, swimming</li><li><strong>Mobility work:</strong> 10-15 minutes daily</li><li><strong>Foam rolling:</strong> Target tight areas post-workout</li><li><strong>Benefits:</strong> Improved circulation, reduced stiffness</li></ul><h3>4. Stress Management</h3><ul><li><strong>Meditation:</strong> Even 5 minutes makes a difference</li><li><strong>Breathing exercises:</strong> 4-7-8 technique for relaxation</li><li><strong>Nature time:</strong> Outdoor exposure reduces cortisol</li><li><strong>Social connection:</strong> Strong relationships support recovery</li></ul><h2>Recovery Protocols by Training Phase</h2><h3>High-Intensity Days</h3><ul><li>Immediate: Cool down walk (5-10 minutes)</li><li>Within 2 hours: Protein shake + carbs</li><li>Evening: Epsom salt bath, early bedtime</li><li>Next day: Light movement, extra hydration</li></ul><h3>Rest Days</h3><ul><li>Active recovery movement</li><li>Meal prep for upcoming training days</li><li>Focus on sleep quality</li><li>Stress management activities</li></ul><h2>Recovery Red Flags</h2><p>Signs you need more recovery:</p><ul><li>Persistent fatigue or low energy</li><li>Decreased performance or motivation</li><li>Frequent illness or slow healing</li><li>Mood changes or irritability</li><li>Elevated resting heart rate</li></ul><h2>The Recovery Mindset</h2><p>Recovery isn\'t lazy—it\'s strategic. Champion athletes prioritize recovery because they understand it\'s where adaptation happens. Embrace rest as part of your training, not a break from it.</p><p><strong>Remember: You\'re only as good as you recover. Make recovery a priority, and watch your results accelerate!</strong></p>',
    featured_image: 'https://example.com/recovery-guidelines.jpg',
    published: true,
    publish_date: '2025-01-12 07:45:00',
    tags: 'recovery, sleep, nutrition, stress management, rest days, active recovery',
    view_count: 1456,
    helpful_yes: 112,
    helpful_no: 5
  }
})

// Community Rules
export const communityRulesArticle = Record({
  $id: Now.ID['kb_community_rules'],
  table: 'x_snc_amoila_conne_kb_article',
  data: {
    title: 'Community Guidelines: Building Our Fitness Family Together',
    slug: 'community-guidelines-rules-respect',
    category: communityCategory.$id,
    short_description: 'Learn how to be a positive, supportive member of the Amoila Connect community.',
    content: '<h1>Welcome to the Amoila Connect Community</h1><p>Our community is the heart of Amoila Connect. It\'s where transformations happen, friendships are formed, and everyone supports each other\'s journey. To maintain this positive environment, we ask all members to follow these guidelines.</p><h2>Core Values</h2><h3>Respect</h3><ul><li>Treat every member with kindness and respect</li><li>Celebrate all fitness levels and body types</li><li>No body shaming, judgment, or negative comments</li><li>Respect privacy—don\'t share others\' photos without permission</li></ul><h3>Support</h3><ul><li>Encourage others, especially those just starting</li><li>Share your struggles and victories authentically</li><li>Offer advice when asked, but avoid unsolicited coaching</li><li>Remember: everyone\'s journey is different</li></ul><h3>Inclusivity</h3><ul><li>Welcome new members warmly</li><li>Use inclusive language</li><li>Respect different backgrounds, abilities, and goals</li><li>No discrimination of any kind will be tolerated</li></ul><h2>Community Guidelines</h2><h3>✅ Do This</h3><ul><li>Share progress photos, victories, and challenges</li><li>Ask questions—no question is too basic</li><li>Offer encouragement and congratulations</li><li>Share helpful tips and experiences</li><li>Use appropriate hashtags for organization</li><li>Report inappropriate behavior to moderators</li></ul><h3>❌ Don\'t Do This</h3><ul><li>Promote other fitness programs or products</li><li>Share inappropriate or offensive content</li><li>Spam the community with excessive posts</li><li>Argue or engage in negative debates</li><li>Share personal contact information publicly</li><li>Post content unrelated to fitness and wellness</li></ul><h2>Posting Best Practices</h2><h3>Progress Photos</h3><ul><li>Appropriate clothing (workout attire)</li><li>Focus on fitness progress, not appearance alone</li><li>Include context about your journey</li><li>Use content warnings if needed</li></ul><h3>Workout Posts</h3><ul><li>Share what program/workout you completed</li><li>Include how you felt or what you learned</li><li>Ask questions about form or modifications</li><li>Tag relevant programs or topics</li></ul><h3>Nutrition Sharing</h3><ul><li>Focus on healthy, balanced approaches</li><li>Avoid extreme diet promotion</li><li>Share recipes and meal prep tips</li><li>Respect different dietary choices</li></ul><h2>Accountability and Challenges</h2><ul><li>Join or create accountability groups</li><li>Participate in monthly challenges</li><li>Check in regularly with your accountability partners</li><li>Celebrate small wins and milestones</li><li>Be honest about struggles—vulnerability builds connection</li></ul><h2>Getting Help</h2><h3>For Technical Issues</h3><ul><li>Contact support through official channels</li><li>Check the FAQ section first</li><li>Include details when reporting problems</li></ul><h3>For Community Issues</h3><ul><li>Report inappropriate content to moderators</li><li>Don\'t engage in public conflicts</li><li>Use private messages for sensitive conversations</li></ul><h2>Consequences</h2><p>Violations of community guidelines may result in:</p><ul><li>Warning from moderators</li><li>Temporary suspension from community features</li><li>Permanent removal from the community</li><li>Account termination for serious violations</li></ul><h2>Remember: We\'re All in This Together</h2><p>The Amoila Connect community is special because of people like you. Every interaction is an opportunity to lift someone up, share knowledge, or simply brighten someone\'s day. Together, we\'re not just transforming our bodies—we\'re building lifelong friendships and creating a supportive fitness family.</p><p><strong>Thank you for helping make our community an incredible place to grow, learn, and transform!</strong></p>',
    featured_image: 'https://example.com/community-rules.jpg',
    published: true,
    publish_date: '2025-01-11 06:30:00',
    tags: 'community, guidelines, rules, respect, support, inclusivity',
    view_count: 742,
    helpful_yes: 67,
    helpful_no: 1
  }
})