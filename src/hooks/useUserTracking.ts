// frontend/src/hooks/useUserTracking.ts
import { useState, useEffect, useRef } from 'react';
import { 
  trackUserAccess, 
  trackSessionEnd, 
  trackPageView,
  type User 
} from '../utils/tracking';

export const useUserTracking = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    const initializeTracking = async () => {
      try {
        setLoading(true);
        
        // Check if we're in a Telegram WebApp environment
        const isTelegramWebApp = typeof window !== 'undefined' && 
                                  window.Telegram?.WebApp?.initDataUnsafe?.user;
        
        if (!isTelegramWebApp) {
          setError('This app must be opened within Telegram');
          setLoading(false);
          return;
        }

        // Track user access - this will create or update the user in Supabase
        const userData = await trackUserAccess();
        
        if (userData) {
          setUser(userData);
          
          // Store session ID from localStorage (set in trackUserAccess)
          const sessionId = localStorage.getItem('sessionId');
          if (sessionId) {
            sessionIdRef.current = sessionId;
          }
          
          // Track initial page view
          await trackPageView(userData.id, window.location.pathname);
        } else {
          setError('Failed to get user data');
        }
      } catch (err) {
        console.error('Tracking error:', err);
        setError(err instanceof Error ? err.message : 'Failed to track user');
      } finally {
        setLoading(false);
      }
    };

    initializeTracking();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (user?.id) {
      trackPageView(user.id, window.location.pathname);
    }
  }, [user, window.location.pathname]);

  // Track session end on unmount
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (sessionIdRef.current) {
        await trackSessionEnd(sessionIdRef.current);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, []);

  return { user, loading, error };
};