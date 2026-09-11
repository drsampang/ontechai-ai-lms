import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, CheckCircle } from 'lucide-react';

interface DayCardProps {
  dayId: number;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
  onStart: () => void;
}

const DayCard: React.FC<DayCardProps> = ({
  dayId,
  title,
  description,
  completed,
  locked,
  onStart,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`p-6 rounded-lg border-2 transition-all ${
        completed
          ? 'bg-green-50 border-green-300'
          : 'bg-white border-gray-200 hover:border-blue-400'
      } ${locked ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-blue-600">DAY {dayId}</span>
            {completed && <CheckCircle className="w-5 h-5 text-green-600" />}
            {locked && <Lock className="w-5 h-5 text-gray-400" />}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={onStart}
          disabled={locked}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            locked
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
          }`}
        >
          {completed ? 'Continue' : 'Start'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default DayCard;
