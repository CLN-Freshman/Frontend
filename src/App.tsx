// src/App.tsx (or App.dev.tsx and App.prod.tsx)
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import Onboarding from '@/pages/Onboarding';
import Home from '@/pages/Home';
import Courses from '@/pages/Courses';
import Leaderboard from '@/pages/Leaderboard';
import Profile from '@/pages/Profile';
import BottomNav from '@/components/BottomNav';
import LoadingScreen from '@/components/LoadingScreen';
import { useUserTracking } from '@/hooks/useUserTracking';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isFirstVisit } = useOnboarding();
  
  if (isFirstVisit) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC<{ loading: boolean; error: string | null }> = ({ loading, error }) => {
  const location = useLocation();
  const { isFirstVisit } = useOnboarding();

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

  // If on onboarding page, show onboarding
  if (location.pathname === '/onboarding') {
    return <Onboarding />;
  }

  // Otherwise show main app with bottom nav
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
      
      {!isFirstVisit && <BottomNav activeTab={getActiveTab()} />}
    </div>
  );
};

const App: React.FC = () => {
  const [telegramReady, setTelegramReady] = useState<boolean>(false);
  const { loading: trackingLoading, error: trackingError } = useUserTracking();

  useEffect(() => {
    // Initialize Telegram WebApp
    const initializeTelegram = () => {
      const telegram = window.Telegram?.WebApp;
      
      if (telegram) {
        telegram.expand();
        telegram.ready();
        setTelegramReady(true);
      } else {
        // If not in Telegram, still proceed (for development)
        console.warn('Not in Telegram WebApp environment');
        setTelegramReady(true);
      }
    };

    const timer = setTimeout(initializeTelegram, 500);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = !telegramReady || trackingLoading;

  return (
    <Router>
      <OnboardingProvider>
        <AppContent loading={isLoading} error={trackingError} />
      </OnboardingProvider>
    </Router>
  );
};

export default App;