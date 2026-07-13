import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Star, 
  Sparkles, 
  Zap, 
  Award, 
  Shield, 
  Crown, 
  Heart, 
  Gem,
} from "lucide-react";
import { WaveBackground } from '@/components/bottom-animation';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

interface TelegramWebApp {
  expand: () => void;
  close: () => void;
  showAlert: (message: string) => void;
  showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
  colorScheme: 'light';
  initDataUnsafe?: {
    user?: TelegramUser;
    query_id?: string;
    auth_date?: string;
    hash?: string;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  MainButton: {
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

// Type for user data state
interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  id: number | string;
  languageCode: string;
  isPremium: boolean;
}

const FloatingIcons: React.FC = () => {
  const icons = [
    { Icon: Star, top: "5%", left: "3%", delay: "0s", duration: "6s", size: 28 },
    { Icon: Sparkles, top: "10%", right: "5%", delay: "1s", duration: "7s", size: 32 },
    { Icon: Zap, top: "3%", left: "12%", delay: "2s", duration: "5s", size: 26 },
    { Icon: Award, top: "15%", right: "12%", delay: "0.5s", duration: "8s", size: 30 },
    { Icon: Shield, top: "2%", left: "22%", delay: "1.5s", duration: "6.5s", size: 28 },
    { Icon: Crown, top: "12%", left: "40%", delay: "0.8s", duration: "7.5s", size: 34 },
    { Icon: Heart, top: "6%", right: "22%", delay: "2.5s", duration: "5.5s", size: 26 },
    { Icon: Gem, top: "18%", left: "30%", delay: "0.3s", duration: "6.8s", size: 30 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {icons.map((item, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <item.Icon 
            size={item.size || 28} 
            strokeWidth={1.5}
            className="text-blue-400/60 hover:text-blue-500/80 transition-colors duration-300 drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))"
            }}
          />
        </div>
      ))}
    </div>
  );
};

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-200 via-blue-100 to-white"></div>
        <FloatingIcons />
        
<div>
  <WaveBackground />
</div>
      <div className="w-full max-w-sm relative z-10 flex flex-col items-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-400 shadow-2xl shadow-blue-400/30">
            <img 
              src="/photo_2026-07-02_13-10-44.jpg" 
              alt="App Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -inset-4 border-4 border-blue-400/20 rounded-full"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -inset-8 border-4 border-blue-400/10 rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center space-y-1"
        >
<h1 className="text-[14rem] font-black leading-none tracking-tight [text-shadow:_0_2px_30px_rgba(37,99,235,0.35)]">
  <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#22C55E] bg-clip-text text-transparent">
    CLN
  </span>
</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium tracking-widest uppercase">
            Learning Platform
          </p>
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80%", opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-[#22C55E] to-transparent"
        />

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[#22C55E] font-semibold text-lg md:text-xl tracking-wide"
        >
          Grow and Succeed
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center space-x-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-3 border-t-[#2563EB] rounded-full border-gray-200"
          />
        </motion.div>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm text-gray-500 font-medium tracking-wide"
        >
          Preparing Your Best Experience
        </motion.p>
      </div>
    </div>
  );
};
const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTelegram, setIsTelegram] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're in Telegram Web App environment
    const checkTelegram = () => {
      const telegram = window.Telegram?.WebApp;
      
      if (telegram) {
        setIsTelegram(true);
        
        // Expand the app to full height
        telegram.expand();
        
        // Get user data from the initialization data
        const initData = telegram.initDataUnsafe;
        const user = initData?.user;
        
        if (user) {
          setUserData({
            firstName: user.first_name || 'Guest',
            lastName: user.last_name || '',
            username: user.username || 'Not set',
            id: user.id || 'Unknown',
            languageCode: user.language_code || 'Not set',
            isPremium: user.is_premium || false
          });
        } else {
          // User data not available - show a message
          setUserData({
            firstName: 'Telegram User',
            lastName: '',
            username: 'Not set',
            id: 'Unknown',
            languageCode: 'Not set',
            isPremium: false
          });
        }
        setLoading(false);
      } else {
        // Not in Telegram environment - show developer message
        setIsTelegram(false);
        setUserData({
          firstName: 'Developer (Testing)',
          lastName: '',
          username: 'dev_user',
          id: '123456',
          languageCode: 'en',
          isPremium: false
        });
        setLoading(false);
      }
    };

    // Check for Telegram Web App after a small delay to ensure SDK loads
    const timer = setTimeout(checkTelegram, 50000);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center min-h-screen p-4 bg-[var(--tg-theme-bg-color,#ffffff)] text-[var(--tg-theme-text-color,#000000)] transition-colors duration-300"
    >
      <div className="w-full max-w-md">
        <motion.div
          variants={itemVariants}
          className="text-center space-y-6"
        >
          {/* Telegram Indicator */}
          {isTelegram && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-green-500 bg-green-50 px-3 py-1 rounded-full inline-block"
            >
              ● Connected to Telegram
            </motion.div>
          )}

          {/* Greeting */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Hello, {userData?.firstName}! 👋
          </motion.h1>
          <div>
            <span className="text-[var(--tg-theme-hint-color,#999999)]">@{userData?.username}</span>
            {userData?.isPremium && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="mt-2 text-center"
              >
                <span className="inline-block px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                  ⭐ Premium User
                </span>
              </motion.div>
            )}
          </div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-[var(--tg-theme-hint-color,#999999)]"
          >
            {isTelegram ? 'Welcome to our Mini App!' : 'Running in development mode'}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default App;