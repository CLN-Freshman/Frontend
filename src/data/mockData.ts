export interface LeaderboardUser {
  id: string;
  rank: number;
  firstName: string;
  username: string;
  avatarUrl?: string;
  points: number;
  level: number;
  courses_completed: number;
  streak_days: number;
  badges: string[];
  is_verified: boolean;
  is_current_user: boolean;
  trend: 'up' | 'down' | 'stable';
  created_at?: string;
}

export const generateMockUsers = (): LeaderboardUser[] => {
  const now = new Date();
  
  return [
    {
      id: "1",
      rank: 1,
      firstName: "Sarah",
      username: "sarah_codes",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      points: 2840,
      level: 42,
      courses_completed: 28,
      streak_days: 67,
      badges: ["⭐", "🏆", "🔥"],
      is_verified: true,
      is_current_user: false,
      trend: "up",
      created_at: new Date(
        now.getTime() - 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "2",
      rank: 2,
      firstName: "Michael",
      username: "mike_dev",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      points: 2560,
      level: 39,
      courses_completed: 24,
      streak_days: 45,
      badges: ["⭐", "🏆"],
      is_verified: true,
      is_current_user: false,
      trend: "up",
      created_at: new Date(
        now.getTime() - 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "3",
      rank: 3,
      firstName: "Emma",
      username: "emma_learner",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      points: 2310,
      level: 37,
      courses_completed: 21,
      streak_days: 38,
      badges: ["⭐", "🔥"],
      is_verified: false,
      is_current_user: false,
      trend: "stable",
      created_at: new Date(
        now.getTime() - 15 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "4",
      rank: 4,
      firstName: "James",
      username: "james_w",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      points: 2289,
      level: 35,
      courses_completed: 19,
      streak_days: 29,
      badges: ["🏆"],
      is_verified: true,
      is_current_user: false,
      trend: "down",
      created_at: new Date(
        now.getTime() - 45 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "5",
      rank: 5,
      firstName: "You",
      username: "your_username",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      points: 2150,
      level: 33,
      courses_completed: 17,
      streak_days: 25,
      badges: ["⭐"],
      is_verified: true,
      is_current_user: true,
      trend: "up",
      created_at: new Date(
        now.getTime() - 10 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "6",
      rank: 6,
      firstName: "Lisa",
      username: "lisa_k",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      points: 1987,
      level: 31,
      courses_completed: 15,
      streak_days: 20,
      badges: [],
      is_verified: false,
      is_current_user: false,
      trend: "stable",
      created_at: new Date(
        now.getTime() - 60 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "7",
      rank: 7,
      firstName: "David",
      username: "david_p",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      points: 1824,
      level: 29,
      courses_completed: 13,
      streak_days: 18,
      badges: [],
      is_verified: false,
      is_current_user: false,
      trend: "up",
      created_at: new Date(
        now.getTime() - 90 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "8",
      rank: 8,
      firstName: "Maria",
      username: "maria_g",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      points: 1698,
      level: 27,
      courses_completed: 12,
      streak_days: 15,
      badges: [],
      is_verified: false,
      is_current_user: false,
      trend: "stable",
      created_at: new Date(
        now.getTime() - 120 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
  ];
};