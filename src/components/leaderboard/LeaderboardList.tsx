import React from 'react';
import { Trophy } from 'lucide-react';
import LeaderboardListItem from './LeaderboardListItem';

interface LeaderboardUser {
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

interface LeaderboardListProps {
  users: LeaderboardUser[];
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8 bg-white rounded-2xl border border-gray-100">
        <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-300" />
        <p className="font-medium">No learners found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {users.map((user, index) => (
        <LeaderboardListItem
          key={user.id}
          user={user}
          index={index}
          isLast={index === users.length - 1}
        />
      ))}
    </div>
  );
};

export default LeaderboardList;