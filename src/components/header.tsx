import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Clock, ChevronRight, BellOff, Circle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@utils/supabase";

// Types
type NotificationType = 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info' 
  | 'achievement'
  | 'social'
  | 'system'
  | 'transaction';

type NotificationPriority = 'low' | 'medium' | 'high';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  timestamp: Date | string;
  read: boolean;
  dismissed: boolean;
  actionUrl?: string;
  actionLabel?: string;
  avatar?: string;
  image?: string;
  icon?: React.ReactNode;
  metadata?: Record<string, any>;
}

interface HeaderProps {
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ firstName, lastName, avatarUrl }) => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState<string>('Good morning');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [telegramUserId, setTelegramUserId] = useState<string | null>(null);

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

  // Get Telegram user ID
  useEffect(() => {
    try {
      const telegram = window.Telegram?.WebApp;
      
      if (telegram?.initDataUnsafe?.user) {
        const userId = String(telegram.initDataUnsafe.user.id);
        setTelegramUserId(userId);
        console.log("Header - Telegram user ID:", userId);
      } else {
        console.warn("Header - Telegram user not found");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Header - Error getting Telegram user:", err);
      setIsLoading(false);
    }
  }, []);

  // Fetch notifications from Supabase with user-specific data
  const fetchNotifications = async () => {
    if (!telegramUserId) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      // Fetch announcements with user-specific notification status
      const { data, error } = await supabase
        .from("announcements")
        .select(`
          *,
          user_notifications!left (
            read,
            dismissed,
            user_id
          )
        `)
        .eq("user_notifications.user_id", telegramUserId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Header - Error fetching notifications:", error);
        setIsLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const formatted: NotificationItem[] = data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title || "Notification",
          message: item.message || "",
          type: (item.type as NotificationType) || "info",
          priority: (item.priority as NotificationPriority) || "medium",
          timestamp: item.created_at || new Date(),
          read: item.user_notifications?.[0]?.read || false,
          dismissed: item.user_notifications?.[0]?.dismissed || false,
          actionUrl: item.action_url || undefined,
          actionLabel: item.action_label || undefined,
          image: item.image || undefined,
          avatar: item.avatar || undefined,
          metadata: item.metadata || undefined,
        }));

        setNotifications(formatted);
      } else {
        // If no user-specific records, fetch all announcements
        const { data: allData, error: allError } = await supabase
          .from("announcements")
          .select("*")
          .order("created_at", { ascending: false });

        if (allError) {
          console.error("Header - Error fetching all announcements:", allError);
          setIsLoading(false);
          return;
        }

        if (allData && allData.length > 0) {
          const formatted: NotificationItem[] = allData.map((item: any) => ({
            id: item.id.toString(),
            title: item.title || "Notification",
            message: item.message || "",
            type: (item.type as NotificationType) || "info",
            priority: (item.priority as NotificationPriority) || "medium",
            timestamp: item.created_at || new Date(),
            read: false,
            dismissed: false,
            actionUrl: item.action_url || undefined,
            actionLabel: item.action_label || undefined,
            image: item.image || undefined,
            avatar: item.avatar || undefined,
            metadata: item.metadata || undefined,
          }));

          setNotifications(formatted);
        } else {
          setNotifications([]);
        }
      }
    } catch (error) {
      console.error("Header - Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (telegramUserId) {
      fetchNotifications();
    }
  }, [telegramUserId]);

  // Subscribe to real-time changes
  useEffect(() => {
    const subscription = supabase
      .channel('announcements-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'announcements'
        },
        () => {
          if (telegramUserId) {
            fetchNotifications();
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [telegramUserId]);

  const getInitials = () => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  };

  const getTelegramAvatar = () => {
    if (avatarUrl) return avatarUrl;
    const telegram = window.Telegram?.WebApp;
    if (telegram && telegram.initDataUnsafe?.user) {
      return undefined;
    }
    return undefined;
  };

  const profileImage = getTelegramAvatar() || avatarUrl;

  const unreadNotifications = notifications.filter(n => !n.read && !n.dismissed);
  const unreadCount = unreadNotifications.length;

  const handleNotificationClick = async (notification: NotificationItem) => {
    if (!notification.read && telegramUserId) {
      setNotifications(prev =>
        prev.map(n =>
          n.id === notification.id ? { ...n, read: true } : n
        )
      );
      
      try {
        const { error } = await supabase
          .from("user_notifications")
          .update({ read: true })
          .eq("announcement_id", notification.id)
          .eq("user_id", telegramUserId);
          
        if (error) console.error("Header - Error marking as read:", error);
      } catch (error) {
        console.error("Header - Error:", error);
      }
    }
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    setIsNotificationOpen(false);
  };

  const handleNotificationDismiss = async (id: string) => {
    if (!telegramUserId) return;
    
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, dismissed: true } : n
      )
    );
    
    try {
      const { error } = await supabase
        .from("user_notifications")
        .update({ dismissed: true })
        .eq("announcement_id", id)
        .eq("user_id", telegramUserId);
        
      if (error) console.error("Header - Error dismissing notification:", error);
    } catch (error) {
      console.error("Header - Error:", error);
    }
  };

  const handleMarkAllRead = async () => {
    if (!telegramUserId) return;
    
    const unreadIds = notifications.filter(n => !n.read && !n.dismissed).map(n => n.id);
    
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    
    if (unreadIds.length > 0) {
      try {
        const { error } = await supabase
          .from("user_notifications")
          .update({ read: true })
          .in("announcement_id", unreadIds)
          .eq("user_id", telegramUserId);
          
        if (error) console.error("Header - Error marking all as read:", error);
      } catch (error) {
        console.error("Header - Error:", error);
      }
    }
    
    setIsNotificationOpen(false);
  };

  const handleClearAll = async () => {
    if (!telegramUserId) return;
    
    const unreadIds = notifications.filter(n => !n.read && !n.dismissed).map(n => n.id);
    
    setNotifications(prev => prev.filter(n => n.read || n.dismissed));
    
    if (unreadIds.length > 0) {
      try {
        const { error } = await supabase
          .from("user_notifications")
          .update({ dismissed: true })
          .in("announcement_id", unreadIds)
          .eq("user_id", telegramUserId);
          
        if (error) console.error("Header - Error clearing notifications:", error);
      } catch (error) {
        console.error("Header - Error:", error);
      }
    }
  };

  // Helper function to get type styles
  const getTypeStyles = (type: NotificationType) => {
    const styles = {
      success: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-500',
        icon: Check,
        text: 'text-emerald-700',
        hover: 'hover:bg-emerald-100/50',
      },
      error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        iconBg: 'bg-red-500',
        icon: X,
        text: 'text-red-700',
        hover: 'hover:bg-red-100/50',
      },
      warning: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        iconBg: 'bg-amber-500',
        icon: Circle,
        text: 'text-amber-700',
        hover: 'hover:bg-amber-100/50',
      },
      info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        iconBg: 'bg-blue-500',
        icon: Bell,
        text: 'text-blue-700',
        hover: 'hover:bg-blue-100/50',
      },
      achievement: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        iconBg: 'bg-purple-500',
        icon: Star,
        text: 'text-purple-700',
        hover: 'hover:bg-purple-100/50',
      },
      social: {
        bg: 'bg-pink-50',
        border: 'border-pink-200',
        iconBg: 'bg-pink-500',
        icon: Bell,
        text: 'text-pink-700',
        hover: 'hover:bg-pink-100/50',
      },
      system: {
        bg: 'bg-slate-50',
        border: 'border-slate-200',
        iconBg: 'bg-slate-500',
        icon: Bell,
        text: 'text-slate-700',
        hover: 'hover:bg-slate-100/50',
      },
      transaction: {
        bg: 'bg-teal-50',
        border: 'border-teal-200',
        iconBg: 'bg-teal-500',
        icon: Bell,
        text: 'text-teal-700',
        hover: 'hover:bg-teal-100/50',
      },
    };
    return styles[type] || styles.info;
  };

  const getPriorityIndicator = (priority: NotificationPriority) => {
    const colors = {
      low: 'bg-blue-400',
      medium: 'bg-amber-400',
      high: 'bg-red-400',
    };
    return <Circle className={`w-2 h-2 ${colors[priority]} fill-current`} />;
  };

  const formatTimestamp = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isNotificationOpen && !target.closest('.notification-container')) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationOpen]);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 py-4 md:px-6 bg-white/80 backdrop-blur-sm border-b border-gray-100 relative z-10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/30 shadow-md">
              {profileImage ? (
                <img 
                  src={profileImage} 
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
              <span className="text-sm text-gray-500 font-medium">
                {greeting},
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {firstName}
              </span>
            </div>
            <span className="text-xs text-gray-400 font-medium flex items-center justify-start">
              Ready to continue Learning?
            </span>
          </div>
        </div>

        {/* Notification Bell with Dropdown */}
        <div className="relative notification-container z-50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsNotificationOpen(!isNotificationOpen);
            }}
            className="relative cursor-pointer p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {!isLoading && unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/25"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.div>
            )}
          </motion.button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-[420px] max-w-[90vw] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200/70 overflow-hidden z-[9999]"
                onClick={(e) => e.stopPropagation()}
                style={{ position: 'absolute' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200/70 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <h3 className="font-semibold text-slate-800">Notifications</h3>
                    {!isLoading && unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {!isLoading && unreadCount > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAllRead();
                        }}
                        className="px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Mark all read
                      </button>
                    )}
                    {!isLoading && notifications.filter(n => !n.read && !n.dismissed).length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearAll();
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Notification List - Show only unread notifications */}
                <div className="overflow-y-auto max-h-[480px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-500 border-t-transparent"></div>
                    </div>
                  ) : unreadNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                      <BellOff className="w-16 h-16 text-slate-300 mb-4" />
                      <p className="text-slate-500 font-medium">All caught up!</p>
                      <p className="text-sm text-slate-400 mt-1">No new notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100/50">
                      {unreadNotifications.slice(0, 10).map((notification) => {
                        const typeStyles = getTypeStyles(notification.type);
                        const IconComponent = typeStyles.icon;

                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative group bg-blue-50/30"
                          >
                            <div
                              onClick={() => handleNotificationClick(notification)}
                              className={`px-4 py-3 cursor-pointer transition-all ${typeStyles.hover}`}
                            >
                              <div className="flex items-start gap-3">
                                {/* Icon/Avatar */}
                                <div className="flex-shrink-0">
                                  {notification.avatar ? (
                                    <img
                                      src={notification.avatar}
                                      alt="Avatar"
                                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                  ) : notification.image ? (
                                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                                      <img
                                        src={notification.image}
                                        alt="Notification"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className={`w-10 h-10 rounded-full flex items-center justify-center ${typeStyles.iconBg} shadow-sm`}
                                    >
                                      {notification.icon || (
                                        <IconComponent className="w-5 h-5 text-white" />
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h4 className={`text-sm font-semibold ${typeStyles.text} line-clamp-1`}>
                                          {notification.title}
                                        </h4>
                                        <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                      </div>
                                      <p className="text-sm text-slate-600 line-clamp-2 mt-0.5">
                                        {notification.message}
                                      </p>
                                      {notification.metadata && (
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                          {Object.entries(notification.metadata).map(([key, value]) => (
                                            <span
                                              key={key}
                                              className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded"
                                            >
                                              {String(value)}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleNotificationDismiss(notification.id);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded-lg transition-all"
                                      >
                                        <X className="w-3.5 h-3.5 text-slate-400" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Footer */}
                                  <div className="flex items-center justify-between mt-1.5">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatTimestamp(notification.timestamp)}
                                      </span>
                                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                                      <span className="flex items-center gap-1">
                                        {getPriorityIndicator(notification.priority)}
                                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                                      </span>
                                    </div>
                                    {notification.actionLabel && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (notification.actionUrl) {
                                            navigate(notification.actionUrl);
                                          }
                                          handleNotificationClick(notification);
                                        }}
                                        className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                                      >
                                        {notification.actionLabel}
                                        <ChevronRight className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer with View All button */}
                <div className="p-3 border-t border-slate-200/70 bg-slate-50/50">
                  <button 
                    onClick={() => {
                      navigate('/notification');
                      setIsNotificationOpen(false);
                    }}
                    className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1 group"
                  >
                    <span>View all notifications</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  {!isLoading && notifications.filter(n => n.read && !n.dismissed).length > 0 && (
                    <p className="text-xs text-slate-400 text-center mt-1">
                      {notifications.filter(n => n.read && !n.dismissed).length} read notifications
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;