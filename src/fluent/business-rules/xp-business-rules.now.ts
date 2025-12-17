import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { updateMemberXP, awardAchievementXP } from '../../server/xp-business-rules.js'

// Business rule to update member total XP and level after XP log insert
export const updateMemberXPRule = BusinessRule({
  $id: Now.ID['br_update_member_xp'],
  name: 'Update Member XP and Level',
  table: 'x_snc_amoila_conne_xp_log',
  when: 'after',
  action: ['insert'],
  script: updateMemberXP,
  active: true,
  order: 100,
  description: 'Updates member total XP and calculates level progression (500 XP per level)'
})

// Business rule to award XP when achievement is earned
export const awardAchievementXPRule = BusinessRule({
  $id: Now.ID['br_award_achievement_xp'],
  name: 'Award Achievement XP',
  table: 'x_snc_amoila_conne_member_achievement',
  when: 'after',
  action: ['insert'],
  script: awardAchievementXP,
  active: true,
  order: 200,
  description: 'Awards XP to member when they earn an achievement'
})