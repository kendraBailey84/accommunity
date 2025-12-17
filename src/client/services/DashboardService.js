import { display, value } from '../utils/fields.js';

export class DashboardService {
  constructor() {
    this.memberTable = "x_snc_amoila_conne_member";
    this.xpLogTable = "x_snc_amoila_conne_xp_log";
    this.achievementTable = "x_snc_amoila_conne_achievement";
    this.memberAchievementTable = "x_snc_amoila_conne_member_achievement";
  }

  async getCurrentMember() {
    try {
      // In a real implementation, this would get the current user's member record
      // For now, we'll simulate by getting the first member or use a specific query
      const response = await fetch(
        `/api/now/table/${this.memberTable}?sysparm_display_value=all&sysparm_limit=1`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch member data');
      }

      const data = await response.json();
      return data.result?.[0] || null;
    } catch (error) {
      console.error('Error fetching member:', error);
      return null;
    }
  }

  async getMemberStats(memberId) {
    try {
      // Get XP logs for workout count and total XP
      const xpResponse = await fetch(
        `/api/now/table/${this.xpLogTable}?sysparm_display_value=all&sysparm_query=member=${memberId}&sysparm_orderby=DESCsys_created_on`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      const xpData = await xpResponse.json();
      const xpLogs = xpData.result || [];

      // Calculate stats from XP logs
      const workoutLogs = xpLogs.filter(log => display(log.activity_type) === 'workout');
      const articleLogs = xpLogs.filter(log => display(log.activity_type) === 'article_read');
      
      const totalWorkouts = workoutLogs.length;
      const articlesRead = articleLogs.length;
      const totalXP = xpLogs.reduce((sum, log) => sum + parseInt(display(log.xp_earned) || '0'), 0);

      return {
        totalWorkouts,
        articlesRead,
        totalXP,
        recentActivity: xpLogs.slice(0, 5)
      };
    } catch (error) {
      console.error('Error fetching member stats:', error);
      return {
        totalWorkouts: 0,
        articlesRead: 0,
        totalXP: 0,
        recentActivity: []
      };
    }
  }

  async getMemberAchievements(memberId, limit = 4) {
    try {
      const response = await fetch(
        `/api/now/table/${this.memberAchievementTable}?sysparm_display_value=all&sysparm_query=member=${memberId}&sysparm_limit=${limit}&sysparm_orderby=DESCsys_created_on`,
        {
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return [];
    }
  }

  calculateLevel(totalXP) {
    // Simple level calculation: every 1000 XP = 1 level
    return Math.floor(totalXP / 1000) + 1;
  }

  calculateNextLevelXP(currentLevel) {
    return currentLevel * 1000;
  }

  calculateCurrentLevelProgress(totalXP) {
    const currentLevelXP = totalXP % 1000;
    return {
      current: currentLevelXP,
      needed: 1000,
      percentage: (currentLevelXP / 1000) * 100
    };
  }

  getRecommendedWorkouts(enrolledProgram) {
    // Mock workout recommendations based on program
    const workoutsByProgram = {
      '645': [
        { title: 'Total Body Power', difficulty: 'Intermediate', duration: '45 min' },
        { title: 'Cardio Intervals', difficulty: 'Advanced', duration: '30 min' },
        { title: 'Mobility Flow', difficulty: 'Beginner', duration: '20 min' }
      ],
      'the_work': [
        { title: 'Strength Foundation', difficulty: 'Intermediate', duration: '60 min' },
        { title: 'Power Endurance', difficulty: 'Advanced', duration: '50 min' },
        { title: 'Recovery Session', difficulty: 'Beginner', duration: '25 min' }
      ],
      'chop_wood_carry_water': [
        { title: 'Functional Movement', difficulty: 'Intermediate', duration: '40 min' },
        { title: 'Endurance Challenge', difficulty: 'Advanced', duration: '35 min' },
        { title: 'Flexibility Focus', difficulty: 'Beginner', duration: '15 min' }
      ],
      'free_workouts': [
        { title: 'Quick HIIT', difficulty: 'Beginner', duration: '20 min' },
        { title: 'Bodyweight Basics', difficulty: 'Beginner', duration: '25 min' },
        { title: 'Cardio Blast', difficulty: 'Intermediate', duration: '30 min' }
      ]
    };

    return workoutsByProgram[enrolledProgram] || workoutsByProgram['free_workouts'];
  }

  formatActivityType(activityType) {
    const types = {
      'workout': 'Workout Completed',
      'article_read': 'Article Read',
      'achievement_earned': 'Achievement Earned',
      'login': 'Daily Login',
      'streak_milestone': 'Streak Milestone'
    };
    
    return types[activityType] || activityType;
  }

  formatTimeAgo(dateString) {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      
      if (diffInHours < 1) {
        return 'Just now';
      } else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
      }
    } catch {
      return dateString;
    }
  }
}