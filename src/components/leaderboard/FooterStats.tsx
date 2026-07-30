import React from 'react';
import { Users, Trophy, Clock } from 'lucide-react';

interface FooterStatsProps {
  totalUsers: number;
  totalPoints: number;
  averageStreak: number;
}

const FooterStats: React.FC<FooterStatsProps> = ({
  totalUsers,
  totalPoints,
  averageStreak,
}) => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
        <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
        <p className="text-sm font-bold text-gray-800">{totalUsers}</p>
        <p className="text-[10px] text-gray-500">Learners</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
        <Trophy className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
        <p className="text-sm font-bold text-gray-800">{totalPoints.toLocaleString()}</p>
        <p className="text-[10px] text-gray-500">Total Points</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
        <Clock className="w-4 h-4 text-green-500 mx-auto mb-1" />
        <p className="text-sm font-bold text-gray-800">{averageStreak}</p>
        <p className="text-[10px] text-gray-500">Avg Streak</p>
      </div>
    </div>
  );
};

export default FooterStats;