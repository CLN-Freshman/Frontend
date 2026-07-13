import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header';
import SearchBar from '@/components/SearchBar';
import LearningCard from '@/components/LearningCard';
import DailyChallengeCard from '@/components/DailyChallengeCard';
import MyCourses from '@/components/MyCourses';
import LeaderboardSection from '@/components/LeaderboardSection';
import QuickAccessSection from '@/components/QuickAccessSection';

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  id: number | string;
  languageCode: string;
  isPremium: boolean;
  avatarUrl?: string;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    
    if (telegram) {
      const initData = telegram.initDataUnsafe;
      const user = initData?.user;
      
      if (user) {
        setUserData({
          firstName: user.first_name || 'Guest',
          lastName: user.last_name || '',
          username: user.username || 'Not set',
          id: user.id || 'Unknown',
          languageCode: user.language_code || 'Not set',
          isPremium: user.is_premium || false,
          avatarUrl: undefined
        });
      } else {
        setUserData({
          firstName: 'Telegram User',
          lastName: '',
          username: 'Not set',
          id: 'Unknown',
          languageCode: 'Not set',
          isPremium: false,
          avatarUrl: undefined
        });
      }
    } else {
      setUserData({
        firstName: 'Developer',
        lastName: '',
        username: 'dev_user',
        id: '123456',
        languageCode: 'en',
        isPremium: false,
        avatarUrl: undefined
      });
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  // Sample data
  const currentCourse = {
    title: "React & TypeScript Mastery",
    chapter: "Chapter 4: Advanced Hooks",
    progress: 65,
    badge: "Currently Learning",
    backgroundImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
  };

  const dailyChallenge = {
    dayStreak: 12,
    title: "Daily Challenge",
    description: "Complete today's coding challenge",
    quote: "Practice makes perfect!"
  };

  return (
    <>
      <Header 
        firstName={userData?.firstName || 'User'}
        lastName={userData?.lastName}
        avatarUrl={userData?.avatarUrl}
      />

      <SearchBar 
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 p-4"
      >
        <div className="max-w-md mx-auto">
          <LearningCard course={currentCourse} />
          <DailyChallengeCard challenge={dailyChallenge} />
          <MyCourses />
          <LeaderboardSection />
          <QuickAccessSection />
        </div>
      </motion.div>
    </>
  );
};

export default Home;