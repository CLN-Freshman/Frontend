import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import Courses from '@/pages/Courses';
import Leaderboard from '@/pages/Leaderboard';
import Profile from '@/pages/Profile';
import BottomNav from '@/components/BottomNav';
import LoadingScreen from '@/components/LoadingScreen';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
          };
        };
      };
    };
  }
}

const AppContent: React.FC<{ loading: boolean }> = ({ loading }) => {
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/courses') return 'courses';
    if (path === '/leaderboard') return 'leaderboard';
    if (path === '/profile') return 'profile';
    return 'home';
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
      <BottomNav activeTab={getActiveTab()} />
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkTelegram = () => {
      const telegram = window.Telegram?.WebApp;
      
      if (telegram) {
        telegram.expand();
      }
      
      setLoading(false);
    };

    const timer = setTimeout(checkTelegram, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AppContent loading={loading} />
    </Router>
  );
};

export default App;