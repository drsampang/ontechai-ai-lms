import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, TrendingUp, BookOpen } from 'lucide-react';
import { getProgress } from '../utils/storage';
import { CURRICULUM_DATA } from '../types/curriculum';

const Dashboard: React.FC = () => {
  const progress = getProgress();
  const completedPercentage = (progress.completedDays.length / 15) * 100;

  const stats = [
    {
      label: 'Days Completed',
      value: progress.completedDays.length,
      total: 15,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Total Hours',
      value: progress.completedDays.length * 2,
      total: 30,
      icon: Clock,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Portfolio Items',
      value: progress.portfolioItems.length,
      total: 8,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Target Audience',
      value: CURRICULUM_DATA.targetAudience.length,
      total: CURRICULUM_DATA.targetAudience.length,
      icon: Users,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome to AI Professional Mastery
        </h1>
        <p className="text-xl text-gray-600">
          {CURRICULUM_DATA.coursePromise}
        </p>
      </motion.div>

      {/* Main Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-2xl mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Course Progress</h2>
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-2">Your Journey</p>
                  <div className="text-4xl font-bold">
                    {Math.round(completedPercentage)}%
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{progress.completedDays.length}</p>
                  <p className="text-blue-100 text-sm">of 15 days</p>
                </div>
              </div>

              <div className="w-full bg-blue-900/50 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completedPercentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-green-400 to-blue-300"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-700/50 p-4 rounded-lg">
                <p className="text-blue-100 text-sm">Quiz Attempts</p>
                <p className="text-2xl font-bold">{Object.keys(progress.quizScores).length}</p>
              </div>
              <div className="bg-purple-700/50 p-4 rounded-lg">
                <p className="text-blue-100 text-sm">Avg Score</p>
                <p className="text-2xl font-bold">
                  {Object.keys(progress.quizScores).length > 0
                    ? (
                        Object.values(progress.quizScores).reduce((a, b) => a + b, 0) /
                        Object.keys(progress.quizScores).length
                      ).toFixed(0)
                    : '—'}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-500">
                  {stat.value}/{stat.total}
                </span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">{stat.label}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.value / stat.total) * 100}%` }}
                  transition={{ duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.color}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Current Day Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Session</h2>
        {progress.currentDay <= 15 ? (
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-600 font-bold text-lg">Day {progress.currentDay}</p>
              <h3 className="text-3xl font-bold text-gray-900 my-2">
                {CURRICULUM_DATA.days[progress.currentDay - 1]?.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {CURRICULUM_DATA.days[progress.currentDay - 1]?.description}
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all">
                Continue Learning
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-2xl font-bold text-gray-900 mb-2">🎉 Course Completed!</p>
            <p className="text-gray-600">You've completed all 15 days. Great job!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
