import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  User,
  type LucideIcon
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ 
  activeTab = 'home', 
  onTabChange 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'courses', label: 'Courses', icon: BookOpen, path: '/courses' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    const found = navItems.find(item => item.path === currentPath);
    return found ? found.id : 'home';
  };

  const currentActive = activeTab || getActiveTab();

  const handleTabClick = (item: NavItem) => {
    navigate(item.path);
    if (onTabChange) {
      onTabChange(item.id);
    }
  };

  return (
    <motion.nav 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around h-16 md:h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentActive === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabClick(item)}
                className={`relative flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-0.5 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <Icon 
                  className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNav;