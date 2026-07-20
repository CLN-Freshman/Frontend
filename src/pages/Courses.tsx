import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import PopularCourses from '@/components/courses/PopularCourses';

function Courses() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  return (
    <>
      <main className="relative flex min-h-[calc(100vh-180px)] flex-col overflow-x-clip bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        {/* Animated Background Decor */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Header - Smaller */}
        <div className="relative flex items-center min-h-[44px] py-1 px-1 z-10 w-full">
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              // Title View
              <motion.div
                key="title-view"
                className="flex items-center justify-between w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-1.5">
                  <motion.h1 
                    className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent whitespace-nowrap"
                  >
                    Courses
                  </motion.h1>
                  <motion.div
                    animate={{
                      rotate: isSearchOpen ? 180 : 0,
                    }}
                  >
                  </motion.div>
                </div>
                <motion.button
                  onClick={handleSearchToggle}
                  className="p-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border border-white/20"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.85 }}
                >
                  <Search className="w-5 h-5 text-blue-600" />
                </motion.button>
              </motion.div>
            ) : (
              // Search View - Smaller
              <motion.div
                key="search-view"
                className="w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="w-full px-4 py-2 pl-10 pr-10 text-sm text-gray-700 bg-white/90 backdrop-blur-sm rounded-xl shadow-md outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                    autoFocus
                  />
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    animate={{
                      scale: searchQuery ? 1.1 : 1,
                      color: searchQuery ? '#3b82f6' : '#9ca3af'
                    }}
                  >
                    <Search className="w-4 h-4" />
                  </motion.div>
                  <button
                    onClick={handleSearchToggle}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100/50 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>

                  {/* Search Results Hint - Smaller */}
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-1.5 w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-1.5"
                      >
                        <div className="text-xs text-gray-600 px-2 py-1.5">
                          Searching for "{searchQuery}"...
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <motion.section 
          className="flex-1 mt-4 z-10"
          layout
        >
          <div className="grid grid-cols-1 gap-3">
            {/* Motivational Quote Card - Blue & Green Theme */}
            <motion.div
              className="relative overflow-hidden p-5 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-md border border-blue-100/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2)"
              }}
            >
              {/* Decorative gradient blur */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-2xl" />
              
              <div className="relative flex flex-col md:flex-row md:items-center justify-start gap-4">
                {/* Left side - Quote */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text uppercase tracking-wider">
                      Daily Motivation
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Keep Learning, Keep Growing
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 max-w-md">
                    Your future is built one lesson at a time
                  </p>
                </div>

                {/* Right side - Button (half of card width on desktop) */}
                <div className="md:w-1/2 flex justify-end">
                  <motion.button
                    className="relative group w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => console.log('Get Started clicked!')}
                  >
                    <span>Get Started</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          <PopularCourses />
          </div>
        </motion.section>
      </main>
    </>
  );
}

export default Courses;