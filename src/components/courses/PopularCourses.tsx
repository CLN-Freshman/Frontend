import { useState, useRef, useEffect } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import CourseCard from './CourseCard';
import type { Course } from '@/types/course';

interface PopularCoursesProps {
  searchQuery?: string;
}

function PopularCourses({ searchQuery = "" }: PopularCoursesProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // For drag/swipe
  const dragConstraints = useRef({ left: 0, right: 0 });

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.level.toLowerCase().includes(query) ||
      course.duration.toLowerCase().includes(query) ||
      String(course.lessons_count).includes(query)
    );
  });

  // Fetch courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
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
        // Cards take 85% of container width
        const cardW = Math.min(containerW * 0.85, 400);
        setCardWidth(cardW);
      }
    };

    // Initial calculation
    setTimeout(calculateWidths, 50);
    
    window.addEventListener('resize', calculateWidths);
    return () => window.removeEventListener('resize', calculateWidths);
  }, [courses.length]);

  // Update drag constraints based on filtered courses
  useEffect(() => {
    if (containerWidth > 0 && cardWidth > 0 && filteredCourses.length > 0) {
      const gap = 16;
      const totalWidth = filteredCourses.length * (cardWidth + gap);
      const maxDrag = Math.max(0, totalWidth - containerWidth);

      dragConstraints.current = {
        left: -maxDrag,
        right: 0
      };
    }
  }, [cardWidth, containerWidth, filteredCourses.length]);

  // Reset carousel when search changes or filtered results change
  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredCourses.length, searchQuery]);

  // Clamp current index when filtered results change
  useEffect(() => {
    if (currentIndex > filteredCourses.length - 1 && filteredCourses.length > 0) {
      setCurrentIndex(0);
    }
  }, [filteredCourses.length, currentIndex]);

  // Snap to nearest card on drag end
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!cardWidth || filteredCourses.length === 0) return;

    const threshold = cardWidth * 0.2;
    const maxIndex = filteredCourses.length - 1;

    if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (info.offset.x > threshold) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Calculate the x position for the carousel
  const getXPosition = () => {
    if (
      cardWidth === 0 ||
      containerWidth === 0 ||
      filteredCourses.length === 0
    ) {
      return 0;
    }
    
    const gap = 16;
    const shift = currentIndex * (cardWidth + gap);
    const totalWidth = filteredCourses.length * (cardWidth + gap);
    const maxShift = Math.max(0, totalWidth - containerWidth);
    return -Math.min(shift, maxShift);
  };

  const totalCards = filteredCourses.length;
  const maxIndex = Math.max(0, totalCards - 1);

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

  // Empty state - improved with search context
  if (filteredCourses.length === 0) {
    return (
      <section className="mt-6 z-10 relative">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>Popular Courses</span>
            </h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-blue-100">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-full">
              {searchQuery.trim() ? (
                <Search className="h-12 w-12 text-blue-400" />
              ) : (
                <BookOpen className="h-12 w-12 text-gray-300" />
              )}
            </div>
          </div>
          {searchQuery.trim() ? (
            <>
              <p className="text-gray-600 font-medium">
                No courses found for "{searchQuery.trim()}"
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Try adjusting your search terms
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500">No courses available yet</p>
              <p className="text-sm text-gray-400 mt-1">Check back later for new courses</p>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      className="mt-6 z-10 relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>Popular Courses</span>
            {searchQuery.trim() && (
              <span className="text-sm font-normal text-gray-400">
                ({totalCards} result{totalCards !== 1 ? 's' : ''})
              </span>
            )}
          </h2>
        </div>
        
        {/* Course counter - prevent 1/0 */}
        <div className="text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
          {totalCards === 0 ? 0 : currentIndex + 1} / {totalCards}
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden rounded-xl touch-pan-y w-full"
        ref={containerRef}
        style={{ 
          touchAction: 'pan-y',
          minHeight: '380px'
        }}
      >
        <motion.div
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={dragConstraints.current}
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
          animate={{ x: getXPosition() }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            width: cardWidth > 0 && filteredCourses.length > 0
              ? `${filteredCourses.length * (cardWidth + 16)}px`
              : "auto",
          }}
        >
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              cardWidth={cardWidth}
            />
          ))}
        </motion.div>

        {/* Gradient Overlays for scroll indication */}
        {currentIndex > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/80 to-transparent pointer-events-none" />
        )}
        {currentIndex < maxIndex && filteredCourses.length > 1 && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Dot Indicators - only show if more than 1 card */}
      {filteredCourses.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {filteredCourses.map((_, i) => (
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
      )}
    </motion.section>
  );
}

export default PopularCourses;