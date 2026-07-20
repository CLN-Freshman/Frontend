import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { BookOpen, Clock, Star, Users } from 'lucide-react';

// Sample popular courses data
const popularCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
    lessons: 48,
    duration: "12 hours",
    rating: 4.8,
    students: 1234,
    level: "Beginner",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    lessons: 32,
    duration: "8 hours",
    rating: 4.9,
    students: 892,
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    lessons: 56,
    duration: "15 hours",
    rating: 4.7,
    students: 2156,
    level: "Advanced",
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop",
    lessons: 40,
    duration: "10 hours",
    rating: 4.6,
    students: 1567,
    level: "Intermediate",
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    lessons: 28,
    duration: "7 hours",
    rating: 4.5,
    students: 3241,
    level: "Beginner",
  }
];

function PopularCourses() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  
  // For drag/swipe
  const dragX = useMotionValue(0);
  const dragConstraints = useRef({ left: 0, right: 0 });

  // Calculate card width based on container
  useEffect(() => {
    const calculateWidths = () => {
      if (containerRef.current) {
        const containerW = containerRef.current.offsetWidth;
        // Show 1.2 cards on mobile for better visibility
        const cardW = containerW * 0.85; // Cards take 85% of container width
        setCardWidth(cardW);
      }
    };

    calculateWidths();
    window.addEventListener('resize', calculateWidths);
    return () => window.removeEventListener('resize', calculateWidths);
  }, []);

  const totalCards = popularCourses.length;
  const maxIndex = totalCards - 1;

  // Snap to nearest card on drag end
  // Fixed: Removed unused 'event' parameter by prefixing with underscore
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = cardWidth * 0.3; // 30% of card width to trigger snap
    const offset = info.offset.x;
    
    if (offset < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (offset > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Update drag constraints
  useEffect(() => {
    if (containerRef.current && cardWidth) {
      const containerW = containerRef.current.offsetWidth;
      const totalWidth = totalCards * cardWidth + (totalCards - 1) * 16; // 16px gap
      const maxDrag = Math.max(0, totalWidth - containerW);
      dragConstraints.current = {
        left: -maxDrag,
        right: 0
      };
    }
  }, [cardWidth, totalCards]);

  // Calculate translateX based on current index
  const translateX = useTransform(
    dragX,
    (value) => {
      const baseOffset = currentIndex * (cardWidth + 16);
      return -(baseOffset + value);
    }
  );

  // Update dragX when currentIndex changes
  useEffect(() => {
    dragX.set(0);
  }, [currentIndex, dragX]);

  return (
    <motion.section 
      className="mt-6 z-10 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Popular Courses
            </span>
          </h2>
        </div>
        
        {/* Course counter */}
        <div className="text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
          {currentIndex + 1} / {totalCards}
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden rounded-xl touch-pan-y"
        ref={containerRef}
        style={{ 
          touchAction: 'pan-y' // Prevent vertical scroll interference
        }}
      >
        <motion.div
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          style={{ 
            x: translateX as any, // Fixed: Type assertion for MotionValue
            width: cardWidth ? `${totalCards * (cardWidth + 16) - 16}px` : 'auto',
            touchAction: 'none' // Allow drag in both directions
          }}
          drag="x"
          dragX={dragX}
          dragConstraints={dragConstraints.current}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          dragMomentum={false}
          whileTap={{ cursor: 'grabbing' }}
        >
          {popularCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="flex-shrink-0"
              style={{ 
                width: cardWidth ? `${cardWidth}px` : '85%',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: index * 0.1 }
              }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-white/50 h-full hover:shadow-xl transition-shadow duration-300 group">
                {/* Thumbnail - larger for mobile */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    draggable={false}
                  />
                  
                  {/* Level Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
                    {course.level}
                  </div>
                </div>

                {/* Content - all text left-aligned */}
                <div className="p-4">
                  {/* Title - left aligned */}
                  <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors duration-200 text-left">
                    {course.title}
                  </h3>

                  {/* Stats - left aligned */}
                  <div className="flex items-center justify-start gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-green-500" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-700">{course.rating}</span>
                    </span>
                  </div>

                  {/* Students Count + Enroll button - left aligned */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()} students
                    </span>
                    <motion.button
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors px-3 py-1.5 rounded-lg bg-blue-50/50 active:bg-blue-100"
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Course
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gradient Overlays for scroll indication */}
        {currentIndex > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/80 to-transparent pointer-events-none" />
        )}
        {currentIndex < maxIndex && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Dot Indicators - restored */}
      <div className="flex justify-center gap-2 mt-4">
        {popularCourses.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-300 rounded-full touch-manipulation ${
              i === currentIndex 
                ? 'w-8 h-2 bg-gradient-to-r from-blue-600 to-green-600' 
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint animation */}
      {currentIndex === 0 && (
        <motion.div
          className="absolute right-4 bottom-20 text-gray-400 text-xs flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm"
          initial={{ opacity: 0, x: 10 }}
          animate={{ 
            opacity: [0, 1, 0],
            x: [10, 0, -10]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <span>Swipe</span>
          <span className="text-lg">👈</span>
        </motion.div>
      )}
    </motion.section>
  );
}

export default PopularCourses;