import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import Courses from '@/pages/Courses';
import Leaderboard from '@/pages/Leaderboard';
import Profile from '@/pages/Profile';
import BottomNav from '@/components/BottomNav';
import LoadingScreen from '@/components/LoadingScreen';
import { useUserTracking } from '@/hooks/useUserTracking';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        ready: () => void;
        close: () => void;
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

const AppContent: React.FC<{ loading: boolean; error: string | null }> = ({ loading, error }) => {
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-red-800 font-bold mb-2">Error Loading App</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
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
  const [telegramReady, setTelegramReady] = useState<boolean>(false);
  
  // Use the user tracking hook - this will automatically track users
  const { loading: trackingLoading, error: trackingError } = useUserTracking();

  useEffect(() => {
    // Initialize Telegram WebApp
    const initializeTelegram = () => {
      const telegram = window.Telegram?.WebApp;
      
      if (telegram) {
        // Expand the WebApp to full screen
        telegram.expand();
        // Tell Telegram the app is ready
        telegram.ready();
        setTelegramReady(true);
      } else {
        // If not in Telegram, still proceed (for development)
        console.warn('Not in Telegram WebApp environment');
        setTelegramReady(true);
      }
    };

    // Small delay to ensure Telegram object is available
    const timer = setTimeout(initializeTelegram, 500);
    return () => clearTimeout(timer);
  }, []);

  // Combine loading states
  const isLoading = !telegramReady || trackingLoading;

  return (
    <Router>
      <AppContent loading={isLoading} error={trackingError} />
    </Router>
  );
};

export default App;