// src/pages/Onboarding/WelcomePage3.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomePageProps {
  onComplete: () => void;
  onPrev: () => void;
}

const WelcomePage3: React.FC<WelcomePageProps> = ({ onComplete, onPrev }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-purple-50 via-white to-blue-50"
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          You're All Set! 🎉
        </h2>
        
        <p className="text-gray-600 text-lg mb-4">
          Ready to start your learning journey?
        </p>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 text-left">
            <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Start exploring courses, track your progress, and achieve your goals today!
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onPrev}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back
          </button>
          <motion.button
            onClick={onComplete}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="mt-6 flex gap-2 justify-center">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePage3;