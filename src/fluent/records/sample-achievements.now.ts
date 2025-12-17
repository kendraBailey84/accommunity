import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Achievement Records

// Fire Starter (first workout, Bronze, 50 XP)
export const fireStarterAchievement = Record({
  $id: Now.ID['ach_fire_starter'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: 'Fire Starter',
    description: 'Complete your very first workout and ignite your fitness journey!',
    icon: 'fire',
    icon_color: '#FF6B35',
    xp_reward: 50,
    criteria_type: 'workout_count',
    criteria_value: 1,
    tier: 'bronze',
    active: true
  }
})

// Week Warrior (7-day streak, Bronze, 100 XP)
export const weekWarriorAchievement = Record({
  $id: Now.ID['ach_week_warrior'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: 'Week Warrior',
    description: 'Maintain a 7-day workout streak and prove your dedication!',
    icon: 'calendar-week',
    icon_color: '#CD7F32',
    xp_reward: 100,
    criteria_type: 'streak_days',
    criteria_value: 7,
    tier: 'bronze',
    active: true
  }
})

// Month Strong (30-day streak, Silver, 250 XP)
export const monthStrongAchievement = Record({
  $id: Now.ID['ach_month_strong'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: 'Month Strong',
    description: 'Achieve an incredible 30-day workout streak!',
    icon: 'calendar-month',
    icon_color: '#C0C0C0',
    xp_reward: 250,
    criteria_type: 'streak_days',
    criteria_value: 30,
    tier: 'silver',
    active: true
  }
})

// 645 Graduate (complete 645, Gold, 500 XP)
export const program645Achievement = Record({
  $id: Now.ID['ach_645_graduate'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: '645 Graduate',
    description: 'Complete the full 645 program and transform your life!',
    icon: 'award',
    icon_color: '#FFD700',
    xp_reward: 500,
    criteria_type: 'program_complete',
    criteria_value: 645,
    tier: 'gold',
    active: true
  }
})

// Beast Mode (100-day streak, Gold, 1000 XP)
export const beastModeAchievement = Record({
  $id: Now.ID['ach_beast_mode'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: 'Beast Mode',
    description: 'Unleash the beast with a legendary 100-day workout streak!',
    icon: 'lightning-bolt',
    icon_color: '#FFD700',
    xp_reward: 1000,
    criteria_type: 'streak_days',
    criteria_value: 100,
    tier: 'gold',
    active: true
  }
})

// Movement Master (500 workouts, Platinum, 2000 XP)
export const movementMasterAchievement = Record({
  $id: Now.ID['ach_movement_master'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: 'Movement Master',
    description: 'Reach elite status with 500 completed workouts!',
    icon: 'crown',
    icon_color: '#E5E4E2',
    xp_reward: 2000,
    criteria_type: 'workout_count',
    criteria_value: 500,
    tier: 'platinum',
    active: true
  }
})

// Knowledge Seeker (Bronze, 25 XP)
export const knowledgeSeekerAchievement = Record({
  $id: Now.ID['ach_knowledge_seeker'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: 'Knowledge Seeker',
    description: 'Read your first knowledge article and expand your fitness knowledge!',
    icon: 'book-open',
    icon_color: '#CD7F32',
    xp_reward: 25,
    criteria_type: 'manual',
    criteria_value: 1,
    tier: 'bronze',
    active: true
  }
})

// Community Helper (Silver, 150 XP)
export const communityHelperAchievement = Record({
  $id: Now.ID['ach_community_helper'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: 'Community Helper',
    description: 'Make 10 helpful community posts and support fellow members!',
    icon: 'people-fill',
    icon_color: '#C0C0C0',
    xp_reward: 150,
    criteria_type: 'community_posts',
    criteria_value: 10,
    tier: 'silver',
    active: true
  }
})

// XP Champion (Silver, 300 XP)
export const xpChampionAchievement = Record({
  $id: Now.ID['ach_xp_champion'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: 'XP Champion',
    description: 'Accumulate 1000 total XP through various activities!',
    icon: 'star-fill',
    icon_color: '#C0C0C0',
    xp_reward: 300,
    criteria_type: 'xp_total',
    criteria_value: 1000,
    tier: 'silver',
    active: true
  }
})

// Consistency King (Gold, 750 XP)
export const consistencyKingAchievement = Record({
  $id: Now.ID['ach_consistency_king'],
  table: 'x_snc_amoila_conne_achievement',
  data: {
    name: 'Consistency King',
    description: 'Complete 100 total workouts and prove that consistency is key!',
    icon: 'trophy',
    icon_color: '#FFD700',
    xp_reward: 750,
    criteria_type: 'workout_count',
    criteria_value: 100,
    tier: 'gold',
    active: true
  }
})