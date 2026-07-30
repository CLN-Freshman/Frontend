import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle, Flame } from 'lucide-react';

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

interface LeaderboardListItemProps {
  user: LeaderboardUser;
  index: number;
  isLast: boolean;
}

const LeaderboardListItem: React.FC<LeaderboardListItemProps> = ({ user, index, isLast }) => {
  const getUserTitle = (level: number) => {
    if (level >= 40) return '🌟 Grand Master';
    if (level >= 35) return '🏆 Master';
    if (level >= 30) return '💎 Senior';
    if (level >= 25) return '⭐ Junior';
    if (level >= 20) return '📚 Sophomore';
    if (level >= 10) return '🌱 Freshman';
    return '🆕 Newbie';
  };

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: (index + 3) * 0.05 }}
        className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
          user.is_current_user
            ? 'bg-blue-50/80 border border-blue-200'
            : 'hover:bg-white/60'
        }`}
      >
        {/* Rank */}
        <div className="w-7 text-sm font-medium text-gray-400 flex-shrink-0 text-left">
          {user.rank}
        </div>

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center overflow-hidden">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gray-600" />
            )}
          </div>
          {user.is_verified && (
            <div className="absolute -bottom-0.5 -right-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-white" />
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className={`text-sm font-semibold text-gray-800 truncate ${user.is_current_user ? 'text-blue-600' : ''}`}>
              {user.is_current_user ? 'You' : user.firstName}
            </p>
            {user.badges.length > 0 && (
              <div className="flex gap-0.5">
                {user.badges.slice(0, 2).map((badge, i) => (
                  <span key={i} className="text-xs">{badge}</span>
                ))}
              </div>
            )}
            {user.is_current_user && (
              <span className="text-[10px] font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">
                You
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 text-left flex items-center gap-2">
            <span>{getUserTitle(user.level)}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="flex items-center gap-0.5">
              <Flame className="w-3 h-3 text-orange-400" />
              {user.streak_days}d
            </span>
          </p>
        </div>

        {/* Points */}
        <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 flex-shrink-0">
          <span>{user.points}</span>
          <span className="text-xs font-normal text-blue-400">pts</span>
        </div>
      </motion.div>

      {/* Separator */}
      {!isLast && <div className="mx-3 border-b border-gray-100/80" />}
    </React.Fragment>
  );
};

export default LeaderboardListItem;