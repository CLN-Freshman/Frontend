import { useState, useRef, useEffect } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { BookOpen, Clock, Star, Users } from 'lucide-react';
import { supabase } from '../../../utils/supabase';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  lessons_count: number;
  duration: string;
  rating: number;
  students_enrolled: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  is_published: boolean;
  image_url?: string;
}

function PopularCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // For drag/swipe
  const dragConstraints = useRef({ left: 0, right: 0 });

  // Fetch courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        // Get published courses, ordered by popularity (students enrolled)
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('is_published', true)
          .order('students_enrolled', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching courses:', error);
          return;
        }

        // Transform data to match the component's expected format
        const formattedCourses = (data || []).map((course: any) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnail: course.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
          lessons_count: course.lessons_count || 0,
          duration: course.duration || 'N/A',
          rating: course.rating || 0,
          students_enrolled: course.students_enrolled || 0,
          level: course.level || 'beginner',
          is_published: course.is_published,
        }));

        setCourses(formattedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Calculate card width based on container
  useEffect(() => {
    const calculateWidths = () => {
      if (containerRef.current) {
        const containerW = containerRef.current.offsetWidth;
        setContainerWidth(containerW);
        // Cards take 85% of container width, with a max width
        const cardW = Math.min(containerW * 0.85, 400);
        setCardWidth(cardW);
      }
    };

    calculateWidths();
    window.addEventListener('resize', calculateWidths);
    return () => window.removeEventListener('resize', calculateWidths);
  }, []);

  // Update drag constraints whenever card width or container width changes
  useEffect(() => {
    if (containerWidth > 0 && cardWidth > 0 && courses.length > 0) {
      const gap = 16; // gap between cards
      const totalWidth = courses.length * (cardWidth + gap) - gap;
      const maxDrag = Math.max(0, totalWidth - containerWidth);
      dragConstraints.current = {
        left: -maxDrag,
        right: 0
      };
    }
  }, [cardWidth, containerWidth, courses.length]);

  // Get level label
  const getLevelLabel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };
    return levelMap[level] || level.charAt(0).toUpperCase() + level.slice(1);
  };

  // Fallback image if course has no image
  const getFallbackImage = (title: string) => {
    const images = [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
    ];
    const index = title.length % images.length;
    return images[index];
  };

  const totalCards = courses.length;
  const maxIndex = Math.max(0, totalCards - 1);

  // Snap to nearest card on drag end
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (totalCards === 0 || cardWidth === 0) return;
    
    const threshold = cardWidth * 0.25; // 25% of card width to trigger snap
    const offset = info.offset.x;
    
    // Calculate which card we should snap to
    let newIndex = currentIndex;
    if (offset < -threshold && currentIndex < maxIndex) {
      newIndex = currentIndex + 1;
    } else if (offset > threshold && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }
    
    setCurrentIndex(newIndex);
  };

  // Calculate the x position for the carousel
  const getXPosition = () => {
    if (cardWidth === 0 || containerWidth === 0) return 0;
    const gap = 16;
    // Calculate how much to shift to show the current card
    const shift = currentIndex * (cardWidth + gap);
    // Ensure we don't go past the end
    const totalWidth = courses.length * (cardWidth + gap) - gap;
    const maxShift = Math.max(0, totalWidth - containerWidth);
    return -Math.min(shift, maxShift);
  };

  // Loading state
  if (loading) {
    return (
      <section className="mt-6 z-10 relative">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>Popular Courses</span>
            </h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-[85%] sm:w-[300px]">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-white/50">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Empty state
  if (courses.length === 0) {
    return (
      <section className="mt-6 z-10 relative">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>Popular Courses</span>
            </h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No courses available yet</p>
          <p className="text-sm text-gray-400 mt-1">Check back later for new courses</p>
        </div>
      </section>
    );
  }

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
            <span>
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
          touchAction: 'pan-y'
        }}
      >
        <motion.div
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          style={{
            width: cardWidth > 0 
              ? `${courses.length * (cardWidth + 16) - 16}px`
              : "auto",
          }}
          drag="x"
          dragConstraints={dragConstraints.current}
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
          animate={{ x: getXPosition() }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="flex-shrink-0"
              style={{ 
                width: cardWidth > 0 ? `${cardWidth}px` : '85%',
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
                    src={course.thumbnail || getFallbackImage(course.title)} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    draggable={false}
                    onError={(e) => {
                      // If image fails to load, use fallback
                      (e.target as HTMLImageElement).src = getFallbackImage(course.title);
                    }}
                  />
                  
                  {/* Level Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
                    {getLevelLabel(course.level)}
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
                      {course.lessons_count} lessons
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
                      {course.students_enrolled.toLocaleString()} students
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

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {courses.map((_, i) => (
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
      {currentIndex === 0 && courses.length > 1 && (
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