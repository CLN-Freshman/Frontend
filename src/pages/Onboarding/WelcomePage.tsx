import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen} from 'lucide-react';

interface WelcomePageProps {
  onNext: () => void;
  onSkip: () => void;
}

const WelcomePage1: React.FC<WelcomePageProps> = ({ onNext, onSkip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-green-50"
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to LearnHub! 🎓
        </h1>
        
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Your personalized learning journey starts here. Master new skills and track your progress every step of the way.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onSkip}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={onNext}
            className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Next →
          </button>
        </div>

        <div className="mt-6 flex gap-2 justify-center">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePage1;