import React, { useState, useEffect, useMemo } from 'react';
import { DashboardService } from './services/DashboardService.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingChat from './components/FloatingChat.jsx';
import { display, value } from './utils/fields.js';
import './app.css';
import './dashboard.css';

export default function DashboardApp() {
  const [member, setMember] = useState(null);
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const service = useMemo(() => new DashboardService(), []);

  useEffect(() => {
    checkAuthenticationAndLoad();
  }, []);

  const checkAuthenticationAndLoad = async () => {
    // Check if user is authenticated
    const authenticated = !!window.g_ck;
    setIsAuthenticated(authenticated);

    if (authenticated) {
      await loadDashboardData();
    } else {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load member data
      const memberData = await service.getCurrentMember();
      if (memberData) {
        setMember(memberData);
        
        // Load stats and achievements
        const [statsData, achievementsData] = await Promise.all([
          service.getMemberStats(value(memberData.sys_id)),
          service.getMemberAchievements(value(memberData.sys_id), 4)
        ]);
        
        setStats(statsData);
        setAchievements(achievementsData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = (view) => {
    if (view === 'knowledge-base') {
      window.location.href = '/x_snc_amoila_conne_kb.do';
    } else if (view === 'faqs') {
      window.location.href = '/x_snc_amoila_conne_faq.do';
    } else if (view === 'support') {
      window.location.href = '/x_snc_amoila_conne_support.do';
    } else if (view === 'home') {
      window.location.href = '/x_snc_amoila_conne_amoila.do';
    } else {
      window.location.hash = view;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="amoila-portal">
        <Header navigate={navigate} currentView="dashboard" />
        <main className="dashboard-main">
          <div className="container">
            <div className="auth-required">
              <div className="auth-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h2>Login Required</h2>
              <p>Please log in to access your personal dashboard and track your fitness journey.</p>
              <div className="auth-actions">
                <button className="btn btn-primary" onClick={() => window.location.href = '/login.do'}>
                  Login
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('home')}>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="amoila-portal">
        <Header navigate={navigate} currentView="dashboard" />
        <main className="dashboard-main">
          <div className="container">
            <div className="loading-dashboard">
              <div className="loading-spinner"></div>
              <p>Loading your dashboard...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="amoila-portal">
        <Header navigate={navigate} currentView="dashboard" />
        <main className="dashboard-main">
          <div className="container">
            <div className="member-not-found">
              <h2>Member Profile Not Found</h2>
              <p>We couldn't find your member profile. Please contact support for assistance.</p>
              <button className="btn btn-primary" onClick={() => navigate('support')}>
                Contact Support
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate level and progress
  const currentLevel = service.calculateLevel(stats?.totalXP || 0);
  const nextLevelXP = service.calculateNextLevelProgress(currentLevel);
  const levelProgress = service.calculateCurrentLevelProgress(stats?.totalXP || 0);
  const recommendedWorkouts = service.getRecommendedWorkouts(display(member.enrolled_program));

  const formatMemberSince = (joinDate) => {
    if (!joinDate) return '';
    try {
      return new Date(joinDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    } catch {
      return joinDate;
    }
  };

  return (
    <div className="amoila-portal">
      <Header navigate={navigate} currentView="dashboard" />
      
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-layout">
            {/* Left Column - Main Content */}
            <div className="dashboard-content">
              {/* Welcome Banner */}
              <div className="welcome-banner">
                <div className="welcome-content">
                  <h1 className="welcome-title">
                    Welcome back, {display(member.display_name)}! 
                  </h1>
                  <div className="welcome-stats">
                    <div className="stat-item">
                      <div className="stat-icon">🔥</div>
                      <div className="stat-details">
                        <span className="stat-number">{display(member.current_streak)}</span>
                        <span className="stat-label">Day Streak</span>
                      </div>
                    </div>
                    <div className="level-badge">
                      <span className="level-text">Level {currentLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="xp-progress-section">
                <div className="progress-header">
                  <h3>Progress to Next Level</h3>
                  <span className="progress-text">
                    {levelProgress.current} / {levelProgress.needed} XP
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${levelProgress.percentage}%` }}
                  ></div>
                </div>
                <p className="progress-description">
                  {levelProgress.needed - levelProgress.current} XP needed to reach Level {currentLevel + 1}
                </p>
              </div>

              {/* Stats Row */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">💪</div>
                  <div className="stat-content">
                    <div className="stat-number">{stats?.totalWorkouts || 0}</div>
                    <div className="stat-label">Total Workouts</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">📚</div>
                  <div className="stat-content">
                    <div className="stat-number">{stats?.articlesRead || 0}</div>
                    <div className="stat-label">Articles Read</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">🔥</div>
                  <div className="stat-content">
                    <div className="stat-number">{display(member.current_streak)}</div>
                    <div className="stat-label">Current Streak</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <div className="stat-number">{stats?.totalXP || 0}</div>
                    <div className="stat-label">Total XP</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="activity-section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {stats?.recentActivity?.length === 0 ? (
                    <div className="no-activity">
                      <p>No recent activity. Start your fitness journey today!</p>
                      <button className="btn btn-primary">Log Your First Workout</button>
                    </div>
                  ) : (
                    stats?.recentActivity?.map(activity => (
                      <div key={value(activity.sys_id)} className="activity-item">
                        <div className="activity-icon">
                          {display(activity.activity_type) === 'workout' ? '💪' : 
                           display(activity.activity_type) === 'article_read' ? '📖' : '⭐'}
                        </div>
                        <div className="activity-details">
                          <div className="activity-title">
                            {service.formatActivityType(display(activity.activity_type))}
                          </div>
                          <div className="activity-description">
                            {display(activity.description)}
                          </div>
                        </div>
                        <div className="activity-meta">
                          <div className="activity-xp">+{display(activity.xp_earned)} XP</div>
                          <div className="activity-time">
                            {service.formatTimeAgo(display(activity.sys_created_on))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recommended Workouts */}
              <div className="workouts-section">
                <h3>Recommended Workouts</h3>
                <p className="section-subtitle">
                  Personalized recommendations based on your {display(member.enrolled_program)} program
                </p>
                <div className="workouts-grid">
                  {recommendedWorkouts.map((workout, index) => (
                    <div key={index} className="workout-card">
                      <div className="workout-header">
                        <h4 className="workout-title">{workout.title}</h4>
                        <div className="workout-difficulty">
                          <span className={`difficulty-badge ${workout.difficulty.toLowerCase()}`}>
                            {workout.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="workout-meta">
                        <div className="workout-duration">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                          </svg>
                          {workout.duration}
                        </div>
                      </div>
                      <button className="btn btn-primary workout-btn">
                        Start Workout
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="dashboard-sidebar">
              {/* Profile Card */}
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    {display(member.profile_image) ? (
                      <img src={display(member.profile_image)} alt="Profile" />
                    ) : (
                      <div className="avatar-placeholder">
                        {display(member.display_name).charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="profile-info">
                    <h3 className="profile-name">{display(member.display_name)}</h3>
                    <p className="member-since">
                      Member since {formatMemberSince(display(member.join_date))}
                    </p>
                  </div>
                </div>
                
                <div className="profile-details">
                  <div className="profile-item">
                    <span className="item-label">Fitness Level:</span>
                    <span className="item-value">{display(member.fitness_level)}</span>
                  </div>
                  <div className="profile-item">
                    <span className="item-label">Program:</span>
                    <span className="item-value">{display(member.enrolled_program)}</span>
                  </div>
                  <div className="profile-item">
                    <span className="item-label">Primary Goal:</span>
                    <span className="item-value">{display(member.primary_goal)}</span>
                  </div>
                </div>
                
                <button className="btn btn-outline profile-btn">
                  Edit Profile
                </button>
              </div>

              {/* Achievement Showcase */}
              <div className="achievements-card">
                <div className="achievements-header">
                  <h3>Latest Achievements</h3>
                </div>
                
                {achievements.length === 0 ? (
                  <div className="no-achievements">
                    <div className="no-achievements-icon">🏆</div>
                    <p>No achievements yet!</p>
                    <p className="small-text">Complete workouts to start earning badges</p>
                  </div>
                ) : (
                  <>
                    <div className="achievements-grid">
                      {achievements.map(achievement => (
                        <div key={value(achievement.sys_id)} className="achievement-badge">
                          <div className="badge-icon">
                            {display(achievement.achievement?.icon) || '🏆'}
                          </div>
                          <div className="badge-info">
                            <div className="badge-name">
                              {display(achievement.achievement?.name) || 'Achievement'}
                            </div>
                            <div className="badge-date">
                              {service.formatTimeAgo(display(achievement.sys_created_on))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="btn btn-outline achievements-btn">
                      View All Achievements
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <FloatingChat />
    </div>
  );
}