import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

interface HeaderProps {
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ firstName, lastName, avatarUrl }) => {
  const [greeting, setGreeting] = useState<string>('Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 17) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const getInitials = () => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 py-4 md:px-6 bg-white/80 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/30 shadow-md">
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={`${firstName}'s avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-lg">
                  {getInitials()}
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-lg text-gray-900 font-semibold">
                {greeting},
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {firstName}
              </span>
            </div>
            <span className="text-sm text-gray-400 font-semibold flex items-center justify-start">
              Ready to continue Learning?
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;