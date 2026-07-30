import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';

interface LeaderboardHeaderProps {
  timeFilter: 'week' | 'month' | 'all';
  onSearchToggle: () => void;
  showSearch: boolean;
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({
  timeFilter,
  onSearchToggle,
}) => {
  const getSubtitle = () => {
    switch (timeFilter) {
      case 'week': return 'Top learners this week';
      case 'month': return 'Top learners this month';
      default: return 'Top learners all time';
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Link
        to="/"
        className="p-2 hover:bg-white/80 rounded-xl transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </Link>
      <div className="text-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">{getSubtitle()}</p>
      </div>
      <button
        onClick={onSearchToggle}
        className="p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default LeaderboardHeader;