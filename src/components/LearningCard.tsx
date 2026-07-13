import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Clock } from 'lucide-react';

interface LearningCardProps {
  course: {
    title: string;
    chapter: string;
    progress: number;
    badge: string;
    backgroundImage: string;
  };
}

const LearningCard: React.FC<LearningCardProps> = ({ course }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="relative rounded-2xl overflow-hidden mb-4 shadow-lg"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${course.backgroundImage})`,
          backgroundBlendMode: 'overlay'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <div className="relative p-6 min-h-[220px] flex flex-col justify-between text-white">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold w-fit border border-white/10"
        >
          <BookOpen className="w-3.5 h-3.5" />
          {course.badge}
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3"
        >
          <h3 className="text-xl font-bold leading-tight flex items-center justify-start">
            {course.title}
          </h3>
          <p className="text-sm text-white/80 mt-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {course.chapter}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4"
        >
          <div className="flex items-center justify-between text-xs text-white/80 mb-1.5">
            <span>Progress</span>
            <span className="font-semibold text-white">{course.progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            />
          </div>
        </motion.div>

        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="cursor-pointer mt-4 w-full bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg"
        >
          <span>Continue Learning</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LearningCard;