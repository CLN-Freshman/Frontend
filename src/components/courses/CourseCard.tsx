// CourseCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, Users } from 'lucide-react';
import type { Course } from '@/types/course';



interface CourseCardProps {
  course: Course;
  index: number;
  cardWidth: number;
  onViewCourse?: (courseId: string) => void; // Made optional for backward compatibility
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  index, 
  cardWidth,
  onViewCourse 
}) => {
  const navigate = useNavigate();

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
    const idx = title.length % images.length;
    return images[idx];
  };

  // Handle view course navigation
  const handleViewCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
      navigate(`/courses/${course.id}`);
  };

  return (
    <motion.div
      className="flex-shrink-0 cursor-pointer"
      style={{ width: cardWidth > 0 ? `${cardWidth}px` : '85%' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { delay: Math.min(index * 0.05, 0.3) }
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-white/50 h-full hover:shadow-xl transition-shadow duration-300 group">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img 
            src={course.thumbnail || getFallbackImage(course.title)} 
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            draggable={false}
            onError={(e) => {
              (e.target as HTMLImageElement).src = getFallbackImage(course.title);
            }}
          />
          
          {/* Level Badge */}
          <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
            {getLevelLabel(course.level)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors duration-200 text-left">
            {course.title}
          </h3>

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

          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              {course.students_enrolled.toLocaleString()} students
            </span>
            <motion.button
              className="text-sm cursor-pointer font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 px-4 py-1.5 rounded-lg shadow-md hover:shadow-lg"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleViewCourse}
            >
              View Course
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;