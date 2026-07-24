// src/pages/Onboarding/WelcomePage2.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Award } from 'lucide-react';

interface WelcomePageProps {
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

const WelcomePage2: React.FC<WelcomePageProps> = ({ onNext, onPrev, onSkip }) => {
  const features = [
    {
      icon: Target,
      title: "Set Your Goals",
      description: "Define your learning objectives and track your progress"
    },
    {
      icon: TrendingUp,
      title: "Learn & Grow",
      description: "Access curated courses and resources to build new skills"
    },
    {
      icon: Award,
      title: "Earn Recognition",
      description: "Complete challenges and earn badges for your achievements"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-green-50 via-white to-blue-50"
    >
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          What You'll Get 🚀
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Everything you need to succeed in your learning journey
        </p>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-2 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3 justify-center mt-8">
          <button
            onClick={onPrev}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back
          </button>
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
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePage2;