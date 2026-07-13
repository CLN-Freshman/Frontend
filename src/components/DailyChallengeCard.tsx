import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface DailyChallengeCardProps {
  challenge: {
    dayStreak: number;
    title: string;
    description: string;
    quote: string;
  };
}

const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({ challenge }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6"
    >
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="flex flex-col items-center justify-center min-w-[80px]"
        >
          <div className="text-4xl mb-1">🔥</div>
          <div className="text-3xl font-bold text-orange-500 leading-none">
            {challenge.dayStreak}
          </div>
          <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-0.5">
            Day Streak
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex-1"
        >
          <h4 className="text-sm font-semibold text-gray-800">
            {challenge.title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {challenge.description}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <p className="text-xs text-green-600 font-medium italic">
              "{challenge.quote}"
            </p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-green-500 text-white w-14 h-14 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors shadow-md shadow-green-500/20 flex flex-col items-center justify-center gap-0.5"
        >
          <Target className="w-6 h-6" />
          <span className="text-[8px] font-medium">Quiz</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DailyChallengeCard;