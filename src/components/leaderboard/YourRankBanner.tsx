import React from 'react';
import { motion } from 'framer-motion';
import { User, Zap } from 'lucide-react';

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

interface YourRankBannerProps {
  currentUserRank: number;
  users: LeaderboardUser[];
}

const YourRankBanner: React.FC<YourRankBannerProps> = ({ currentUserRank, users }) => {
  const currentUser = users.find(u => u.is_current_user);

  if (!currentUserRank || currentUserRank <= 3) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-3 mb-4 border border-blue-100/50 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt="Your avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-gray-600" />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-self-start">
            <p className="text-xs text-gray-500">Your Rank</p>
            <p className="text-base font-semibold text-gray-800 text-left">
              #{currentUserRank}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
            <Zap className="w-4 h-4" />
            <span>+150 pts</span>
          </div>
          <p className="text-[10px] text-gray-400">to next rank</p>
        </div>
      </div>
    </motion.div>
  );
};

export default YourRankBanner;