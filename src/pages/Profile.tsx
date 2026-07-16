import { useEffect, useState } from 'react';
import {
  BarChart3,
  Trophy,
  Bookmark,
  Settings,
} from "lucide-react";
import ProfileHeader from '@components/profile/ProfileHeader'; // Adjust the import path as needed

interface ProfileProps {
  firstName?: string;
  lastName?: string;
  username?: string;
  // avatarUrl?: string;
}

interface MergedShapeProps {
  fill?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: any;
}

function MergedShape({ fill = "#ffffff", children, style: containerStyle, className, ...props }: MergedShapeProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 420,
        aspectRatio: '420 / 330',
        ...containerStyle,
      }}
      {...props}
    >
      {/* Shape 1 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '30.95%',
          height: '45.45%',
          backgroundColor: fill,
          borderRadius: '28px 28px 0px 28px',
        }}
      />
      {/* Shape 2 */}
      <div
        style={{
          position: 'absolute',
          left: '30.95%',
          top: '30.30%',
          width: '35.71%',
          height: '39.39%',
          backgroundColor: fill,
          borderRadius: '0px 0px 28px 28px',
        }}
      />
      {/* Shape 3 */}
      <div
        style={{
          position: 'absolute',
          left: '66.67%',
          top: 0,
          width: '33.33%',
          height: '45.45%',
          backgroundColor: fill,
          borderRadius: '28px 28px 28px 0px',
        }}
      />
      {/* Shape 4 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '30.30%',
          width: '100%',
          height: '69.70%',
          backgroundColor: fill,
          borderRadius: '28px 28px 28px 28px',
        }}
      />
      {/* Negative Space 1 */}
      <div
        style={{
          position: 'absolute',
          left: '30.95%',
          top: 0,
          width: '35.71%',
          height: '30.30%',
        }}
      />
      {/* Negative Space 2 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '45.45%',
          width: '30.95%',
          height: '54.55%',
        }}
      />
      {/* Negative Space 3 */}
      <div
        style={{
          position: 'absolute',
          left: '66.67%',
          top: '45.45%',
          width: '33.33%',
          height: '54.55%',
        }}
      />
      {/* Bridge 1 */}
      <svg
        style={{
          position: 'absolute',
          left: '30.95%',
          top: '21.82%',
          width: '6.67%',
          height: '8.48%',
          pointerEvents: 'none',
        }}
        viewBox="0 0 28 28"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M 0 0 C 0 21 5.6000000000000005 28 28 28 H 0 Z" fill={fill} />
      </svg>
      {/* Bridge 2 */}
      <svg
        style={{
          position: 'absolute',
          left: '24.29%',
          top: '45.45%',
          width: '6.67%',
          height: '8.48%',
          pointerEvents: 'none',
        }}
        viewBox="-28 -28 28 28"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M 0 0 C 0 -21 -5.6000000000000005 -28 -28 -28 H 0 Z" fill={fill} />
      </svg>
      {/* Bridge 3 */}
      <svg
        style={{
          position: 'absolute',
          left: '66.67%',
          top: '45.45%',
          width: '6.67%',
          height: '8.48%',
          pointerEvents: 'none',
        }}
        viewBox="0 -28 28 28"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M 0 0 C 0 -21 5.6000000000000005 -28 28 -28 H 0 Z" fill={fill} />
      </svg>
      {/* Bridge 4 */}
      <svg
        style={{
          position: 'absolute',
          left: '60%',
          top: '21.82%',
          width: '6.67%',
          height: '8.48%',
          pointerEvents: 'none',
        }}
        viewBox="-28 0 28 28"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M 0 0 C 0 21 -5.6000000000000005 28 -28 28 H 0 Z" fill={fill} />
      </svg>
      {children}
    </div>
  );
}

function Profile({ firstName: propFirstName, lastName: propLastName, username: propUsername }: ProfileProps) {
  // const [greeting, setGreeting] = useState<string>('Good morning');
  const [firstName, setFirstName] = useState<string>(propFirstName || '');
  const [lastName, setLastName] = useState<string>(propLastName || '');
  const [username, setUsername] = useState<string>(propUsername || '');
  const [activeTab, setActiveTab] = useState("Stats");

  useEffect(() => {
    // const hour = new Date().getHours();
    // if (hour < 12) {
    //   setGreeting('Good morning');
    // } else if (hour < 17) {
    //   setGreeting('Good afternoon');
    // } else {
    //   setGreeting('Good evening');
    // }

    // If props are empty, try to get data from Telegram
    if (!propFirstName && !propLastName && !propUsername) {
      const telegram = window.Telegram?.WebApp;
      if (telegram?.initDataUnsafe?.user) {
        const user = telegram.initDataUnsafe.user;
        setFirstName(user.first_name || '');
        setLastName(user.last_name || '');
        setUsername(user.username || '');
      }
    }
  }, [propFirstName, propLastName, propUsername]);

  const getInitials = () => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  };

  // const getTelegramAvatar = () => {
  //   if (avatarUrl) return avatarUrl;
    
  //   const telegram = window.Telegram?.WebApp;
  //   if (telegram && telegram.initDataUnsafe?.user) {
  //     return undefined;
  //   }
  //   return undefined;
  // };

  // const profileImage = getTelegramAvatar() || avatarUrl;
  const formattedUsername = username?.startsWith('@') ? username : `@${username}`;

  const handleBack = () => {
    window.history.back();
  };
const tabs = [
  {
    name: "Stats",
    icon: BarChart3,
    content: (
      <div>
        <h3 className="font-semibold text-gray-800">Your Stats</h3>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-xl font-bold text-blue-600">2450</p>
            <p className="text-xs text-gray-500">XP</p>
          </div>

          <div className="rounded-xl bg-green-50 p-3">
            <p className="text-xl font-bold text-green-600">12</p>
            <p className="text-xs text-gray-500">Level</p>
          </div>

          <div className="rounded-xl bg-purple-50 p-3">
            <p className="text-xl font-bold text-purple-600">8</p>
            <p className="text-xs text-gray-500">Streak</p>
          </div>
        </div>
      </div>
    ),
  },

  {
    name: "Achievements",
    icon: Trophy,
    content: (
      <div>
        <h3 className="font-semibold text-gray-800">Achievements</h3>

        <div className="mt-3 space-y-2">
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-green-50 p-3">
            🏆 First Milestone Completed
          </div>

          <div className="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-3">
            ⭐ Top Contributor
          </div>
        </div>
      </div>
    ),
  },

  {
    name: "Saved",
    icon: Bookmark,
    content: (
      <div>
        <h3 className="font-semibold text-gray-800">Saved Items</h3>
        <p className="text-sm text-gray-500 mt-2">
          Your saved content will appear here.
        </p>
      </div>
    ),
  },

  {
    name: "Settings",
    icon: Settings,
    content: (
      <div>
        <h3 className="font-semibold text-gray-800">Settings</h3>
        <p className="text-sm text-gray-500 mt-2">
          Manage your profile preferences.
        </p>
      </div>
    ),
  },
];
  return (
    <>
      <ProfileHeader 
        title="Profile"
        subtitle="Manage your profile here"
        onBack={handleBack}
      />
      
      <div className="flex items-start justify-center min-h-[calc(100vh-180px)] p-4">
        <div className="text-center w-full max-w-4xl mx-auto">
          <div className="flex justify-center mt-8 px-4">
            <MergedShape fill="#f0f4ff" className="w-full max-w-[420px]">
              <div 
                className="absolute"
                style={{
                  left: '49%',
                  top: '-12%',
                  transform: 'translateX(-50%)',
                  width: '32%',
                  aspectRatio: '1/1',
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                  {getInitials() || ''}
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4 mt-12">
                  <p className="text-gray-700 font-medium text-base sm:text-lg">
                    {firstName || ''} {lastName || ''}
                  </p>
                  <p className="text-blue-500 text-xs sm:text-sm font-medium">
                    {formattedUsername || ''}
                  </p>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-6">
                   <div className="grid grid-cols-4 gap-2">
  {tabs.map((tab) => {
    const Icon = tab.icon;

    return (
      <button
        key={tab.name}
        onClick={() => setActiveTab(tab.name)}
        className={`flex flex-col items-center transition-colors ${
          activeTab === tab.name
            ? "text-blue-500"
            : "text-gray-600 hover:text-blue-500"
        }`}
      >
        <Icon size={22} />
        <span className="text-[11px] mt-1">
          {tab.name}
        </span>

        {activeTab === tab.name && (
          <div className="mt-1 h-1 w-1 rounded-full bg-blue-500" />
        )}
      </button>
    );
  })}
</div>
                  </div>
                </div>
              </div>
            </MergedShape>
            
          </div>
          <div className="w-full max-w-[420px] mt-6 px-4">
  <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 text-left">
    {tabs.find(tab => tab.name === activeTab)?.content}
  </div>
</div>
        </div>
      </div>
    </>
  );
}

export default Profile;