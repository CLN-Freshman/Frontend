import { Link } from 'react-router-dom';
import { ChevronRight, Crown } from 'lucide-react';

interface Leader {
  id: number;
  firstName: string;
  username: string;
  avatarUrl: string;
  rank: number;
  points: number;
}

function LeaderboardSection() {
  const leaders: Leader[] = [
    {
      id: 1,
      firstName: "Sarah",
      username: "sarah_codes",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      rank: 1,
      points: 2840
    },
    {
      id: 2,
      firstName: "Michael",
      username: "mike_dev",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rank: 2,
      points: 2560
    },
    {
      id: 3,
      firstName: "Emma",
      username: "emma_learner",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rank: 3,
      points: 2310
    }
  ];

  const getRankColor = (rank: number) => {
    switch(rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-gray-500';
    }
  };

  const getRankEmoji = (rank: number) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  const getSectionStyle = (rank: number) => {
    switch(rank) {
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
    switch(rank) {
      case 1: return 'min-h-[180px]';
      case 2: return 'min-h-[150px]';
      case 3: return 'min-h-[130px]';
      default: return 'min-h-[120px]';
    }
  };

  // Order: 2nd (left), 1st (center), 3rd (right)
  const orderedLeaders = [leaders[1], leaders[0], leaders[2]];

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold !text-gray-900 !text-base">
          Leaderboard
        </h2>
        <Link 
          to="/leaderboard" 
          className="text-blue-500 text-sm font-medium hover:text-blue-600 transition flex items-center"
        >
          View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>

      {/* Top 3 Leaders Display */}
      <div className="flex items-end justify-center gap-3 px-2 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        {orderedLeaders.map((leader) => {
          const isFirst = leader.rank === 1;
          const isSecond = leader.rank === 2;

          return (
            <div 
              key={leader.id}
              className={`flex-1 flex flex-col items-center rounded-xl p-4 border transition-all hover:scale-105 ${getSectionStyle(leader.rank)} ${getPodiumHeight(leader.rank)} justify-end`}
            >
              {/* Rank Badge */}
              <div className={`text-2xl font-bold ${getRankColor(leader.rank)} mb-1`}>
                {getRankEmoji(leader.rank)}
              </div>

              {/* Avatar */}
              <div 
                className={`relative rounded-full overflow-hidden border-4 transition-transform cursor-pointer
                  ${isFirst ? 'w-20 h-20 border-yellow-400 shadow-lg shadow-yellow-400/30' : 
                    isSecond ? 'w-16 h-16 border-gray-300 shadow-md' : 
                    'w-14 h-14 border-amber-600/50 shadow-md'}`}
              >
                <img 
                  src={leader.avatarUrl} 
                  alt={leader.firstName}
                  className="w-full h-full object-cover"
                />
                {/* Crown for 1st place */}
                {isFirst && (
                  <div className="absolute -top-2 -right-2">
                    <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                )}
              </div>

              {/* Name */}
              <p className={`font-semibold text-gray-800 mt-2 text-center ${
                isFirst ? 'text-sm' : 'text-xs'
              }`}>
                {leader.firstName}
              </p>
              
              {/* Username */}
              <p className="text-[10px] text-gray-400 text-center">
                @{leader.username}
              </p>

              {/* Points */}
              <div className={`mt-1 px-2 py-0.5 rounded-full ${
                isFirst ? 'bg-yellow-100 text-yellow-700 text-xs font-semibold' : 
                isSecond ? 'bg-gray-100 text-gray-600 text-[10px]' : 
                'bg-amber-100 text-amber-700 text-[10px]'
              }`}>
                {leader.points} pts
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default LeaderboardSection;