import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Crown,
  Trophy,
  Users,
  Flame,
  Search,
  X,
  User,
  CheckCircle,
  Clock,
  Zap,
  ChevronLeft,
} from "lucide-react";
import FilterToggle from "@components/FilterToggle";

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
  trend: "up" | "down" | "stable";
  created_at?: string; // For filtering by time
}

type TimeFilter = "week" | "month" | "all";

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const now = new Date();
      const mockUsers: LeaderboardUser[] = [
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
          ).toISOString(), // 2 days ago
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
          ).toISOString(), // 5 days ago
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
          ).toISOString(), // 15 days ago
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
          ).toISOString(), // 45 days ago
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
          ).toISOString(), // 10 days ago
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
          ).toISOString(), // 60 days ago
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
          ).toISOString(), // 90 days ago
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
          ).toISOString(), // 120 days ago
        },
      ];

      setUsers(mockUsers);
      const currentUser = mockUsers.find((u) => u.is_current_user);
      if (currentUser) {
        setCurrentUserRank(currentUser.rank);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const filterByTime = (users: LeaderboardUser[]) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (timeFilter) {
      case "week":
        return users.filter((user) => {
          if (!user.created_at) return false;
          return new Date(user.created_at) >= weekAgo;
        });
      case "month":
        return users.filter((user) => {
          if (!user.created_at) return false;
          return new Date(user.created_at) >= monthAgo;
        });
      case "all":
      default:
        return users;
    }
  };

  const filteredUsers = filterByTime(users).filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Get top 3 users
  const top3 = filteredUsers.slice(0, 3);
  const remainingUsers = filteredUsers.slice(3);

  // Get rank color
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-600";
      default:
        return "text-gray-500";
    }
  };

  // Get rank emoji
  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "";
    }
  };

  const getSectionStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-b from-yellow-50/80 to-yellow-100/40 border-yellow-200/60 shadow-yellow-100";
      case 2:
        return "bg-gradient-to-b from-gray-50/80 to-gray-100/40 border-gray-200/60 shadow-gray-100";
      case 3:
        return "bg-gradient-to-b from-amber-50/80 to-amber-100/40 border-amber-200/60 shadow-amber-100";
      default:
        return "bg-white";
    }
  };

  // Get podium height
  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return "min-h-[180px]";
      case 2:
        return "min-h-[150px]";
      case 3:
        return "min-h-[130px]";
      default:
        return "min-h-[120px]";
    }
  };

  // Order: 2nd (left), 1st (center), 3rd (right)
  const orderedLeaders = top3.length === 3 ? [top3[1], top3[0], top3[2]] : [];

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>

          {/* Top 3 Skeleton */}
          <div className="flex justify-center items-end gap-3 px-2 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
            {[2, 1, 3].map((pos) => (
              <div
                key={pos}
                className={`flex-1 flex flex-col items-center rounded-xl p-4 ${getPodiumHeight(pos)} justify-end`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mb-2"></div>
                <div
                  className={`rounded-full bg-gray-200 animate-pulse ${pos === 1 ? "w-20 h-20" : pos === 2 ? "w-16 h-16" : "w-14 h-14"}`}
                ></div>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
                <div className="w-12 h-3 bg-gray-200 rounded animate-pulse mt-1"></div>
                <div className="w-16 h-5 bg-gray-200 rounded-full animate-pulse mt-1"></div>
              </div>
            ))}
          </div>

          {/* List Skeleton */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-sm animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-md mx-auto">
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
            <p className="text-xs text-gray-500 mt-0.5">
              {timeFilter === "week"
                ? "Top learners this week"
                : timeFilter === "month"
                  ? "Top learners this month"
                  : "Top learners all time"}
            </p>
          </div>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a learner..."
                  className="w-full px-4 py-2 pl-10 pr-10 text-sm text-gray-700 bg-white/90 backdrop-blur-sm rounded-xl shadow-md outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Time Filter Toggle */}
        <div className="mb-6">
          <FilterToggle
            filter={timeFilter}
            onFilterChange={setTimeFilter}
          />
        </div>

        {/* Top 3 Leaders Display */}
        {top3.length === 3 && (
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
                  {/* Rank Badge */}
                  <div
                    className={`text-2xl font-bold ${getRankColor(leader.rank)} mb-1`}
                  >
                    {getRankEmoji(leader.rank)}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`relative rounded-full overflow-hidden border-4 transition-transform
                      ${
                        isFirst
                          ? "w-20 h-20 border-yellow-400 shadow-lg shadow-yellow-400/30"
                          : isSecond
                            ? "w-16 h-16 border-gray-300 shadow-md"
                            : "w-14 h-14 border-amber-600/50 shadow-md"
                      }`}
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

                  {/* Name */}
                  <p
                    className={`font-semibold text-gray-800 mt-2 text-center ${
                      isFirst ? "text-sm" : "text-xs"
                    }`}
                  >
                    {leader.firstName}
                  </p>

                  {/* Username */}
                  <p className="text-[10px] text-gray-400 text-center">
                    @{leader.username}
                  </p>

                  {/* Points */}
                  <div
                    className={`mt-1 px-2 py-0.5 rounded-full ${
                      isFirst
                        ? "bg-yellow-100 text-yellow-700 text-xs font-semibold"
                        : isSecond
                          ? "bg-gray-100 text-gray-600 text-[10px]"
                          : "bg-amber-100 text-amber-700 text-[10px]"
                    }`}
                  >
                    {leader.points} pts
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Your Rank Banner */}
        {currentUserRank && currentUserRank > 3 && filteredUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-3 mb-4 border border-blue-100/50 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar with rank badge */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                    {users.find((u) => u.is_current_user)?.avatarUrl ? (
                      <img
                        src={users.find((u) => u.is_current_user)?.avatarUrl}
                        alt="Your avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  {/* Rank badge overlay */}
                  {/* <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md">
            {currentUserRank}
          </div> */}
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
        )}

        {remainingUsers.length > 0 ? (
          <div className="space-y-0">
            {remainingUsers.map((user, index) => (
              <React.Fragment key={user.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + 3) * 0.05 }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    user.is_current_user
                      ? "bg-blue-50/80 border border-blue-200"
                      : "hover:bg-white/60"
                  }`}
                >
                  <div className="w-7 text-sm font-medium text-gray-400 flex-shrink-0 text-left">
                    {user.rank}
                  </div>
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

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p
                        className={`text-sm font-semibold text-gray-800 truncate ${user.is_current_user ? "text-blue-600" : ""}`}
                      >
                        {user.is_current_user ? "You" : user.firstName}
                      </p>
                      {user.badges.length > 0 && (
                        <div className="flex gap-0.5">
                          {user.badges.slice(0, 2).map((badge, i) => (
                            <span key={i} className="text-xs">
                              {badge}
                            </span>
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
                      <span>
                        {user.level >= 40
                          ? "🌟 Grand Master"
                          : user.level >= 35
                            ? "🏆 Master"
                            : user.level >= 30
                              ? "💎 Senior"
                              : user.level >= 25
                                ? "⭐ Junior"
                                : user.level >= 20
                                  ? "📚 Sophomore"
                                  : user.level >= 10
                                    ? "🌱 Freshman"
                                    : "🆕 Newbie"}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="flex items-center gap-0.5">
                        <Flame className="w-3 h-3 text-orange-400" />
                        {user.streak_days}d
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 flex-shrink-0">
                    <span>{user.points}</span>
                    <span className="text-xs font-normal text-blue-400">
                      pts
                    </span>
                  </div>
                </motion.div>

                {index < remainingUsers.length - 1 && (
                  <div className="mx-3 border-b border-gray-100/80" />
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8 bg-white rounded-2xl border border-gray-100">
            <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="font-medium">No learners found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}

        {/* Footer Stats */}
        {filteredUsers.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
              <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <p className="text-sm font-bold text-gray-800">
                {filteredUsers.length}
              </p>
              <p className="text-[10px] text-gray-500">Learners</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
              <Trophy className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
              <p className="text-sm font-bold text-gray-800">
                {filteredUsers
                  .reduce((sum, u) => sum + u.points, 0)
                  .toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Total Points</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
              <Clock className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <p className="text-sm font-bold text-gray-800">
                {Math.round(
                  filteredUsers.reduce((sum, u) => sum + u.streak_days, 0) /
                    filteredUsers.length,
                )}
              </p>
              <p className="text-[10px] text-gray-500">Avg Streak</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
