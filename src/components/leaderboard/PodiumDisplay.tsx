import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';


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

interface PodiumDisplayProps {
  top3: LeaderboardUser[];
}

const PodiumDisplay: React.FC<PodiumDisplayProps> = ({ top3 }) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-gray-500';
    }
  };

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  const getSectionStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-b from-yellow-50/80 to-yellow-100/40 border-yellow-200/60 shadow-yellow-100';
      case 2:
        return 'bg-gradient-to-b from-gray-50/80 to-gray-100/40 border-gray-200/60 shadow-gray-100';
      case 3:
        return 'bg-gradient-to-b from-amber-50/80 to-amber-100/40 border-amber-200/60 shadow-amber-100';
      default:
        return 'bg-white';
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return 'min-h-[180px]';
      case 2: return 'min-h-[150px]';
      case 3: return 'min-h-[130px]';
      default: return 'min-h-[120px]';
    }
  };

  // Order: 2nd (left), 1st (center), 3rd (right)
  const orderedLeaders = top3.length === 3 ? [top3[1], top3[0], top3[2]] : [];

  if (top3.length !== 3) return null;

  return (
    <div className="flex items-end justify-center gap-3 px-2 py-4 mb-6">
      {orderedLeaders.map((leader) => {
        const isFirst = leader.rank === 1;
        const isSecond = leader.rank === 2;

        return (
          <motion.div
            key={leader.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: leader.rank * 0.1 }}
            className={`flex-1 flex flex-col items-center rounded-xl p-4 border transition-all hover:scale-105 ${getSectionStyle(leader.rank)} ${getPodiumHeight(leader.rank)} justify-end cursor-pointer`}
          >
            <div className={`text-2xl font-bold ${getRankColor(leader.rank)} mb-1`}>
              {getRankEmoji(leader.rank)}
            </div>
            <div
              className={`relative rounded-full overflow-hidden border-4 transition-transform
                ${isFirst ? 'w-20 h-20 border-yellow-400 shadow-lg shadow-yellow-400/30' : 
                  isSecond ? 'w-16 h-16 border-gray-300 shadow-md' : 
                  'w-14 h-14 border-amber-600/50 shadow-md'}`}
            >
              <img
                src={leader.avatarUrl}
                alt={leader.firstName}
                className="w-full h-full object-cover"
              />
              {isFirst && (
                <div className="absolute -top-2 -right-2">
                  <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
              )}
            </div>
            <p className={`font-semibold text-gray-800 mt-2 text-center ${isFirst ? 'text-sm' : 'text-xs'}`}>
              {leader.firstName}
            </p>
            <p className="text-[10px] text-gray-400 text-center">
              @{leader.username}
            </p>
            <div className={`mt-1 px-2 py-0.5 rounded-full ${
              isFirst ? 'bg-yellow-100 text-yellow-700 text-xs font-semibold' : 
              isSecond ? 'bg-gray-100 text-gray-600 text-[10px]' : 
              'bg-amber-100 text-amber-700 text-[10px]'
            }`}>
              {leader.points} pts
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PodiumDisplay;