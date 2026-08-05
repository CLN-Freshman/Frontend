import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from "@utils/supabase";
import { 
  Bell, 
  X, 
  Check, 
  Clock, 
  ChevronRight, 
  BellOff, 
  Circle, 
  Star,
  ArrowLeft,
  CheckCheck,
  Trash2,
  Eye,
  EyeOff,
  Inbox,
  Mail,
  MailCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
type ReadFilter = 'all' | 'unread' | 'read';

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

const FilterToggle: React.FC<{ 
  filter: ReadFilter; 
  onFilterChange: (filter: ReadFilter) => void;
  counts: { all: number; unread: number; read: number };
}> = ({ filter, onFilterChange, counts }) => {
  return (
    <div className="flex gap-2">
      <div className="flex w-full justify-between rounded-xl border border-gray-200 bg-gray-100 p-1">
        <button
          onClick={() => onFilterChange('all')}
          className={`rounded-lg cursor-pointer p-2 transition-all duration-200 flex items-center gap-1.5 flex-1 justify-center ${
            filter === 'all'
              ? 'bg-white shadow text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <Inbox className="h-4 w-4" />
          <span className="text-xs font-medium">All ({counts.all})</span>
        </button>

        <button
          onClick={() => onFilterChange('unread')}
          className={`rounded-lg cursor-pointer p-2 transition-all duration-200 flex items-center gap-1.5 flex-1 justify-center ${
            filter === 'unread'
              ? 'bg-white shadow text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <Mail className="h-4 w-4" />
          <span className="text-xs font-medium">Unread ({counts.unread})</span>
        </button>

        <button
          onClick={() => onFilterChange('read')}
          className={`rounded-lg cursor-pointer p-2 transition-all duration-200 flex items-center gap-1.5 flex-1 justify-center ${
            filter === 'read'
              ? 'bg-white shadow text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <MailCheck className="h-4 w-4" />
          <span className="text-xs font-medium">Read ({counts.read})</span>
        </button>
      </div>
    </div>
  );
};

function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [readFilter, setReadFilter] = useState<ReadFilter>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [telegramUserId, setTelegramUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get Telegram user ID
  useEffect(() => {
    try {
      const telegram = window.Telegram?.WebApp;
      
      if (telegram?.initDataUnsafe?.user) {
        const userId = String(telegram.initDataUnsafe.user.id);
        setTelegramUserId(userId);
        console.log("Telegram user ID:", userId);
      } else {
        setError("Telegram user not found. Please open the app in Telegram.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error getting Telegram user:", err);
      setError("Failed to get user information from Telegram");
      setIsLoading(false);
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read && !n.dismissed).length;
  const readCount = notifications.filter(n => n.read && !n.dismissed).length;
  const totalCount = notifications.filter(n => !n.dismissed).length;

  const getFilteredNotifications = () => {
    let filtered = notifications.filter(n => !n.dismissed);
    
    if (readFilter === 'unread') {
      filtered = filtered.filter(n => !n.read);
    } else if (readFilter === 'read') {
      filtered = filtered.filter(n => n.read);
    }
    
    return filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const filteredNotifications = getFilteredNotifications();

  const getTypeStyles = (type: NotificationType) => {
    const styles = {
      success: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-500', icon: Check, text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
      error: { bg: 'bg-red-50', iconBg: 'bg-red-500', icon: X, text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
      warning: { bg: 'bg-amber-50', iconBg: 'bg-amber-500', icon: Circle, text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
      info: { bg: 'bg-blue-50', iconBg: 'bg-blue-500', icon: Bell, text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
      achievement: { bg: 'bg-purple-50', iconBg: 'bg-purple-500', icon: Star, text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
      social: { bg: 'bg-pink-50', iconBg: 'bg-pink-500', icon: Bell, text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700' },
      system: { bg: 'bg-slate-50', iconBg: 'bg-slate-500', icon: Bell, text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700' },
      transaction: { bg: 'bg-teal-50', iconBg: 'bg-teal-500', icon: Bell, text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700' },
    };
    return styles[type] || styles.info;
  };

  const getPriorityIndicator = (priority: NotificationPriority) => {
    const colors = { low: 'bg-blue-400', medium: 'bg-amber-400', high: 'bg-red-400' };
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

  const handleNotificationClick = async (notification: NotificationItem) => {
    if (!notification.read && telegramUserId) {
      setNotifications(prev =>
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
      
      try {
        const { error } = await supabase
          .from("user_notifications")
          .update({ read: true })
          .eq("announcement_id", notification.id)
          .eq("user_id", telegramUserId);
          
        if (error) console.error("Error marking as read:", error);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  // const handleMarkAsRead = async (id: string) => {
  //   if (!telegramUserId) return;
    
  //   setNotifications(prev =>
  //     prev.map(n => n.id === id ? { ...n, read: true } : n)
  //   );
    
  //   try {
  //     const { error } = await supabase
  //       .from("user_notifications")
  //       .update({ read: true })
  //       .eq("announcement_id", id)
  //       .eq("user_id", telegramUserId);
        
  //     if (error) console.error("Error marking as read:", error);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleMarkAsUnread = async (id: string) => {
  //   if (!telegramUserId) return;
    
  //   setNotifications(prev =>
  //     prev.map(n => n.id === id ? { ...n, read: false } : n)
  //   );
    
  //   try {
  //     const { error } = await supabase
  //       .from("user_notifications")
  //       .update({ read: false })
  //       .eq("announcement_id", id)
  //       .eq("user_id", telegramUserId);
        
  //     if (error) console.error("Error marking as unread:", error);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleDismiss = async (id: string) => {
  //   if (!telegramUserId) return;
    
  //   setNotifications(prev =>
  //     prev.map(n => n.id === id ? { ...n, dismissed: true } : n)
  //   );
    
  //   try {
  //     const { error } = await supabase
  //       .from("user_notifications")
  //       .update({ dismissed: true })
  //       .eq("announcement_id", id)
  //       .eq("user_id", telegramUserId);
        
  //     if (error) console.error("Error dismissing notification:", error);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleMarkAllRead = async () => {
  //   if (!telegramUserId) return;
    
  //   const unreadIds = notifications.filter(n => !n.read && !n.dismissed).map(n => n.id);
    
  //   setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    
  //   if (unreadIds.length > 0) {
  //     try {
  //       const { error } = await supabase
  //         .from("user_notifications")
  //         .update({ read: true })
  //         .in("announcement_id", unreadIds)
  //         .eq("user_id", telegramUserId);
          
  //       if (error) console.error("Error marking all as read:", error);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  // const handleClearRead = async () => {
  //   if (!telegramUserId) return;
    
  //   const readIds = notifications.filter(n => n.read && !n.dismissed).map(n => n.id);
    
  //   if (readIds.length === 0) return;
    
  //   if (window.confirm('Clear all read notifications?')) {
  //     setNotifications(prev =>
  //       prev.map(n => n.read ? { ...n, dismissed: true } : n)
  //     );
      
  //     try {
  //       const { error } = await supabase
  //         .from("user_notifications")
  //         .update({ dismissed: true })
  //         .in("announcement_id", readIds)
  //         .eq("user_id", telegramUserId);
          
  //       if (error) console.error("Error clearing read notifications:", error);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  const fetchAnnouncements = async () => {
    if (!telegramUserId) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching announcements for user:", telegramUserId);
      
const { data, error } = await supabase
  .from("announcements")
  .select("*")
  .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching announcements:", error);
        setError("Failed to load notifications");
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
    read: false,
    dismissed: false,
    actionUrl: item.action_url,
    actionLabel: item.action_label,
    image: item.image,
    avatar: item.avatar,
  }));

  setNotifications(formatted);
      } else {
        // If no results with user_notifications, fetch all announcements
        console.log("No user-specific notifications found, fetching all");
        const { data: allData, error: allError } = await supabase
          .from("announcements")
          .select("*")
          .order("created_at", { ascending: false });

        if (allError) {
          console.error("Error fetching all announcements:", allError);
          setError("Failed to load notifications");
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
          }));

          setNotifications(formatted);
        } else {
          setNotifications([]);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (telegramUserId) {
      fetchAnnouncements();
    }
  }, [telegramUserId]);

  // Refresh notifications when the page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && telegramUserId) {
        fetchAnnouncements();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [telegramUserId]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BellOff className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsLoading(true);
              // Try to get Telegram user again
              const telegram = window.Telegram?.WebApp;
              if (telegram?.initDataUnsafe?.user) {
                setTelegramUserId(String(telegram.initDataUnsafe.user.id));
              } else {
                setError("Telegram user not found");
                setIsLoading(false);
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
              </div>
            </div>
            
            {!isLoading && notifications.filter(n => !n.dismissed).length > 0 && (
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    // onClick={handleMarkAllRead}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                {readCount > 0 && (
                  <button
                    // onClick={handleClearRead}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Clear read notifications"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter - All, Unread, Read */}
      <div className="sticky top-14 z-10 bg-white/60 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <FilterToggle 
            filter={readFilter} 
            onFilterChange={setReadFilter}
            counts={{ all: totalCount, unread: unreadCount, read: readCount }}
          />
        </div>
      </div>

      {/* Notification List */}
      <div className="max-w-7xl mx-auto px-4 py-4 pb-24">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-500 border-t-transparent"></div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BellOff className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-lg font-semibold text-gray-600">All caught up!</p>
            <p className="text-sm text-gray-400 mt-1 text-center">
              {readFilter !== 'all' 
                ? `No ${readFilter} notifications found`
                : "You have no notifications right now"}
            </p>
            {readFilter !== 'all' && (
              <button
                onClick={() => setReadFilter('all')}
                className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
              >
                View all
              </button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification, index) => {
              const typeStyles = getTypeStyles(notification.type);
              const IconComponent = typeStyles.icon;

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className={`group relative rounded-2xl transition-all ${
                    !notification.read 
                      ? 'bg-gradient-to-r from-blue-50/80 to-transparent border border-blue-200/50' 
                      : 'bg-white border border-gray-100'
                  }`}
                >
                  <div 
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        {notification.avatar ? (
                          <img
                            src={notification.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                        ) : notification.image ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden">
                            <img
                              src={notification.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${typeStyles.iconBg} shadow-sm`}
                          >
                            {notification.icon || <IconComponent className="w-5 h-5 text-white" />}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className={`text-sm font-semibold ${typeStyles.text}`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {notification.read ? (
                              <button
                                // onClick={(e) => {
                                //   e.stopPropagation();
                                //   handleMarkAsUnread(notification.id);
                                // }}
                                className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full transition-colors"
                                title="Mark as unread"
                              >
                                <EyeOff className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                // onClick={(e) => {
                                //   e.stopPropagation();
                                //   handleMarkAsRead(notification.id);
                                // }}
                                className="p-1.5 text-gray-400 hover:text-green-600 rounded-full transition-colors"
                                title="Mark as read"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              // onClick={(e) => {
                              //   e.stopPropagation();
                              //   handleDismiss(notification.id);
                              // }}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                              title="Dismiss"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                            <span className="flex items-center gap-0.5">
                              {getPriorityIndicator(notification.priority)}
                              <span className="capitalize">{notification.priority}</span>
                            </span>
                          </div>
                          {notification.actionLabel && notification.actionUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(notification.actionUrl!);
                              }}
                              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5 transition-colors"
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
    </div>
  );
}

export default Notification;