import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export interface User {
  id: string;
  telegram_id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
  first_accessed_at: string;
  last_accessed_at: string;
  access_count: number;
  created_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  session_start: string;
  session_end: string | null;
  duration_seconds: number | null;
  user_agent: string;
  referrer: string;
  created_at: string;
}

export interface PageView {
  id: string;
  user_id: string;
  page: string;
  viewed_at: string;
  created_at: string;
}

// ============= SUPABASE CLIENT =============

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// ============= HELPER FUNCTIONS =============

/**
 * Get user info from Telegram WebApp
 */
export const getTelegramUser = (): TelegramUser | null => {
  try {
    // Check if Telegram WebApp is available
    const webApp = (window as any).Telegram?.WebApp;
    if (!webApp) return null;
    
    return webApp.initDataUnsafe?.user || null;
  } catch (error) {
    console.error('Error getting Telegram user:', error);
    return null;
  }
};

/**
 * Validate if user data is complete
 */
const validateUserData = (user: TelegramUser): boolean => {
  return !!user.id;
};

// ============= CORE TRACKING FUNCTIONS =============

/**
 * Track user access - creates or updates user record
 */
export const trackUserAccess = async (): Promise<User | null> => {
  try {
    const telegramUser = getTelegramUser();
    
    if (!telegramUser || !validateUserData(telegramUser)) {
      console.warn('No valid Telegram user data available');
      return null;
    }

    const userData = {
      telegram_id: telegramUser.id,
      first_name: telegramUser.first_name || '',
      last_name: telegramUser.last_name || '',
      username: telegramUser.username || '',
      language_code: telegramUser.language_code || 'en',
      is_premium: telegramUser.is_premium || false,
      last_accessed_at: new Date().toISOString()
    };

    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id, access_count')
      .eq('telegram_id', telegramUser.id)
      .single<User>();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user:', fetchError);
      throw fetchError;
    }

    let user: User | null = null;

    if (existingUser) {
      // User exists - update access count and last accessed
      const { data, error } = await supabase
        .from('users')
        .update({
          last_accessed_at: new Date().toISOString(),
          access_count: (existingUser.access_count || 0) + 1,
          first_name: userData.first_name,
          last_name: userData.last_name,
          username: userData.username,
          is_premium: userData.is_premium
        })
        .eq('id', existingUser.id)
        .select()
        .single<User>();

      if (error) throw error;
      user = data;
    } else {
      // New user - create record
      const { data, error } = await supabase
        .from('users')
        .insert([{
          ...userData,
          first_accessed_at: new Date().toISOString(),
          access_count: 1
        }])
        .select()
        .single<User>();

      if (error) throw error;
      user = data;
      
      console.log('New user tracked:', user);
    }

    // Track session start
    if (user) {
      await trackSessionStart(user.id);
    }

    return user;
  } catch (error) {
    console.error('Error tracking user access:', error);
    return null;
  }
};

/**
 * Track session start
 */
export const trackSessionStart = async (userId: string): Promise<UserSession | null> => {
  try {
    const { data, error } = await supabase
      .from('user_sessions')
      .insert([{
        user_id: userId,
        session_start: new Date().toISOString(),
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      }])
      .select()
      .single<UserSession>();

    if (error) throw error;
    
    // Store session ID in localStorage for later use
    if (data) {
      localStorage.setItem('sessionId', data.id);
    }
    
    return data;
  } catch (error) {
    console.error('Error tracking session:', error);
    return null;
  }
};

/**
 * Track session end
 */
export const trackSessionEnd = async (sessionId: string): Promise<void> => {
  try {
    const { data: session, error: fetchError } = await supabase
      .from('user_sessions')
      .select('session_start')
      .eq('id', sessionId)
      .single<UserSession>();

    if (fetchError) throw fetchError;

    const startTime = new Date(session.session_start);
    const endTime = new Date();
    const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    const { error } = await supabase
      .from('user_sessions')
      .update({
        session_end: endTime.toISOString(),
        duration_seconds: durationSeconds
      })
      .eq('id', sessionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking session end:', error);
  }
};

/**
 * Track page view
 */
export const trackPageView = async (userId: string, page: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('page_views')
      .insert([{
        user_id: userId,
        page: page,
        viewed_at: new Date().toISOString()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};