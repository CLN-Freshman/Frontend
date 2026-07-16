import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProfileProps {
  firstName?: string;
  lastName?: string;
  username?: string;
  avatarUrl?: string;
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
          width: '30.95%', // 130/420
          height: '45.45%', // 150/330
          backgroundColor: fill,
          borderRadius: '28px 28px 0px 28px',
        }}
      >
        {/* Add content here */}
      </div>
      {/* Shape 2 */}
      <div
        style={{
          position: 'absolute',
          left: '30.95%', // 130/420
          top: '30.30%', // 100/330
          width: '35.71%', // 150/420
          height: '39.39%', // 130/330
          backgroundColor: fill,
          borderRadius: '0px 0px 28px 28px',
        }}
      >
        {/* Add content here */}
      </div>
      {/* Shape 3 */}
      <div
        style={{
          position: 'absolute',
          left: '66.67%', // 280/420
          top: 0,
          width: '33.33%', // 140/420
          height: '45.45%', // 150/330
          backgroundColor: fill,
          borderRadius: '28px 28px 28px 0px',
        }}
      >
        {/* Add content here */}
      </div>
      {/* Shape 4 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '30.30%', // 100/330
          width: '100%',
          height: '69.70%', // 230/330
          backgroundColor: fill,
          borderRadius: '28px 28px 28px 28px',
        }}
      >
        {/* Add content here */}
      </div>
      {/* Negative Space 1 - Content container for empty region */}
      <div
        style={{
          position: 'absolute',
          left: '30.95%', // 130/420
          top: 0,
          width: '35.71%', // 150/420
          height: '30.30%', // 100/330
        }}
      >
        {/* Add content here */}
      </div>
      {/* Negative Space 2 - Content container for empty region */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '45.45%', // 150/330
          width: '30.95%', // 130/420
          height: '54.55%', // 180/330
        }}
      >
        {/* Add content here */}
      </div>
      {/* Negative Space 3 - Content container for empty region */}
      <div
        style={{
          position: 'absolute',
          left: '66.67%', // 280/420
          top: '45.45%', // 150/330
          width: '33.33%', // 140/420
          height: '54.55%', // 180/330
        }}
      >
        {/* Add content here */}
      </div>
      {/* Bridge 1 */}
      <svg
        style={{
          position: 'absolute',
          left: '30.95%', // 130/420
          top: '21.82%', // 72/330
          width: '6.67%', // 28/420
          height: '8.48%', // 28/330
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
          left: '24.29%', // 102/420
          top: '45.45%', // 150/330
          width: '6.67%', // 28/420
          height: '8.48%', // 28/330
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
          left: '66.67%', // 280/420
          top: '45.45%', // 150/330
          width: '6.67%', // 28/420
          height: '8.48%', // 28/330
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
          left: '60%', // 252/420
          top: '21.82%', // 72/330
          width: '6.67%', // 28/420
          height: '8.48%', // 28/330
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

function Profile({ firstName, lastName, username, avatarUrl }: ProfileProps) {
  const [greeting, setGreeting] = useState<string>('Good morning');

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

  const formattedUsername = username?.startsWith('@') ? username : `@${username}`;

  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] p-4">
        <div className="text-center w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold !text-gray-800">Profile</h1>
          <p className="text-gray-500 mt-2 text-sm">
            {greeting}, {firstName}! Manage your account settings
          </p>

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
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt={`${firstName}'s avatar`}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                    {getInitials()}
                  </div>
                )}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4 mt-12">
                  <p className="text-gray-700 font-medium text-base sm:text-lg">
                    {firstName} {lastName}
                  </p>
                  <p className="text-blue-500 text-xs sm:text-sm font-medium">
                    {formattedUsername}
                  </p>
                  
                  <div className="flex justify-center gap-6 mt-4">
                    <div>
                      <p className="text-gray-700 font-semibold text-sm">24</p>
                      <p className="text-gray-400 text-xs">Posts</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-semibold text-sm">156</p>
                      <p className="text-gray-400 text-xs">Followers</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-semibold text-sm">89</p>
                      <p className="text-gray-400 text-xs">Following</p>
                    </div>
                  </div>
                </div>
              </div>
            </MergedShape>
          </div>
          
          <Link to="/" className="text-blue-500 mt-6 inline-block hover:text-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default Profile;