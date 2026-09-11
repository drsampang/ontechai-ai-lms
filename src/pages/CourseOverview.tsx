import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DayCard from '../components/DayCard';
import { CURRICULUM_DATA } from '../types/curriculum';
import { getProgress, markDayComplete } from '../utils/storage';

const CourseOverview: React.FC = () => {
  const progress = getProgress();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'professional', label: 'Core Professional Skills', days: [1, 2, 3] },
    { id: 'leaders', label: 'Leadership & Government', days: [4] },
    { id: 'business', label: 'Business & Entrepreneurship', days: [5] },
    { id: 'project', label: 'Project Management', days: [6, 7] },
    { id: 'student', label: 'Education & Learning', days: [8] },
    { id: 'content', label: 'Content & Communication', days: [9, 10, 11] },
    { id: 'advanced', label: 'Advanced Systems', days: [12, 13, 14, 15] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          15-Day Advanced AI Professional Mastery
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {CURRICULUM_DATA.coursePromise}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>📚 {CURRICULUM_DATA.duration}</span>
          <span>🎯 {CURRICULUM_DATA.level}</span>
          <span>👥 {CURRICULUM_DATA.targetAudience.length} Target Audiences</span>
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 flex flex-wrap gap-2"
      >
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Days
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURRICULUM_DATA.days.map((day, index) => {
          const category = categories.find((cat) => cat.days.includes(day.id));
          if (selectedCategory && category?.id !== selectedCategory) return null;

          return (
            <DayCard
              key={day.id}
              dayId={day.id}
              title={day.title}
              description={day.description}
              completed={progress.completedDays.includes(day.id)}
              locked={day.id > progress.currentDay}
              onStart={() => {
                // Navigate to lesson
                console.log(`Starting Day ${day.id}`);
              }}
            />
          );
        })}
      </div>

      {/* Target Audience Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 20 }}
        className="mt-12 bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Target Audience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURRICULUM_DATA.targetAudience.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200"
            >
              <p className="font-semibold text-gray-900">{audience}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CourseOverview;
