import { gs, GlideRecord } from '@servicenow/glide'

// Business rule function to update member total XP and handle level progression
export function updateMemberXP(current) {
  const memberId = current.getValue('member')
  if (!memberId) {
    return
  }

  // Get the member record
  const memberGr = new GlideRecord('x_snc_amoila_conne_member')
  if (!memberGr.get(memberId)) {
    gs.error('Member not found: ' + memberId)
    return
  }

  // Calculate total XP from all XP log entries for this member
  const xpGr = new GlideRecord('x_snc_amoila_conne_xp_log')
  xpGr.addQuery('member', memberId)
  xpGr.addAggregate('SUM', 'xp_amount')
  xpGr.query()
  
  let totalXP = 0
  if (xpGr.next()) {
    totalXP = parseInt(xpGr.getAggregate('SUM', 'xp_amount') || '0')
  }

  // Get current values
  const currentTotalXP = parseInt(memberGr.getValue('total_xp') || '0')
  const currentLevel = parseInt(memberGr.getValue('level') || '1')

  // Calculate new level (500 XP per level, starting at level 1)
  const newLevel = Math.floor(totalXP / 500) + 1

  // Update member record if values changed
  if (totalXP !== currentTotalXP || newLevel !== currentLevel) {
    memberGr.setValue('total_xp', totalXP.toString())
    memberGr.setValue('level', newLevel.toString())
    memberGr.update()

    // Log level up if it occurred
    if (newLevel > currentLevel) {
      gs.info('Member ' + memberGr.getValue('display_name') + ' leveled up to level ' + newLevel)
      
      // Create an XP log entry for the level up bonus
      const levelUpXP = new GlideRecord('x_snc_amoila_conne_xp_log')
      levelUpXP.initialize()
      levelUpXP.setValue('member', memberId)
      levelUpXP.setValue('xp_amount', '50') // Bonus XP for leveling up
      levelUpXP.setValue('action_type', 'admin_award')
      levelUpXP.setValue('description', 'Level up bonus - reached level ' + newLevel)
      levelUpXP.insert()
    }
  }
}

// Business rule function to award achievement XP when achievement is earned
export function awardAchievementXP(current) {
  const achievementId = current.getValue('achievement')
  const memberId = current.getValue('member')
  
  if (!achievementId || !memberId) {
    return
  }

  // Get the achievement record to find XP reward
  const achievementGr = new GlideRecord('x_snc_amoila_conne_achievement')
  if (!achievementGr.get(achievementId)) {
    return
  }

  const xpReward = parseInt(achievementGr.getValue('xp_reward') || '0')
  if (xpReward > 0) {
    // Create XP log entry for achievement
    const xpLog = new GlideRecord('x_snc_amoila_conne_xp_log')
    xpLog.initialize()
    xpLog.setValue('member', memberId)
    xpLog.setValue('xp_amount', xpReward.toString())
    xpLog.setValue('action_type', 'achievement_earned')
    xpLog.setValue('description', 'Achievement earned: ' + achievementGr.getValue('name'))
    xpLog.insert()
  }
}