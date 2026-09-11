import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {label && <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
        />
      </div>
      <p className="text-xs text-gray-600 mt-1">
        {current} of {total} completed
      </p>
    </div>
  );
};

export default ProgressBar;
