import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2 } from 'lucide-react';
import { getPortfolioItems, getProgress } from '../utils/storage';
import { CURRICULUM_DATA } from '../types/curriculum';

const Portfolio: React.FC = () => {
  const portfolioItems = getPortfolioItems();
  const progress = getProgress();

  const portfolioRequirements = [
    { type: 'prompt', label: '20 Professional Prompts', required: 20, completed: portfolioItems.filter(p => p.type === 'prompt').length },
    { type: 'report', label: 'Research Report', required: 1, completed: portfolioItems.filter(p => p.type === 'report').length },
    { type: 'document', label: 'Business/Policy Document', required: 1, completed: portfolioItems.filter(p => p.type === 'document').length },
    { type: 'content', label: 'Content System', required: 1, completed: portfolioItems.filter(p => p.type === 'content').length },
    { type: 'presentation', label: 'Presentation', required: 1, completed: portfolioItems.filter(p => p.type === 'presentation').length },
    { type: 'automation', label: 'Automation', required: 1, completed: portfolioItems.filter(p => p.type === 'automation').length },
    { type: 'analysis', label: 'Data Analysis', required: 1, completed: portfolioItems.filter(p => p.type === 'analysis').length },
    { type: 'assistant', label: 'Personal AI Assistant', required: 1, completed: portfolioItems.filter(p => p.type === 'assistant').length },
  ];

  const totalRequirements = portfolioRequirements.reduce((sum, req) => sum + req.required, 0);
  const totalCompleted = portfolioRequirements.reduce((sum, req) => sum + req.completed, 0);
  const completionPercentage = (totalCompleted / totalRequirements) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Professional Portfolio</h1>
        <p className="text-xl text-gray-600">
          Build your AI mastery portfolio by completing course assignments and projects.
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-2xl mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-blue-100 mb-2">Portfolio Completion</p>
            <div className="text-5xl font-bold mb-2">{Math.round(completionPercentage)}%</div>
            <div className="w-full bg-blue-900/50 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-green-400"
              />
            </div>
          </div>
          <div>
            <p className="text-blue-100 mb-2">Items Completed</p>
            <div className="text-5xl font-bold">{totalCompleted}/{totalRequirements}</div>
          </div>
          <div>
            <p className="text-blue-100 mb-2">Course Progress</p>
            <div className="text-5xl font-bold">{progress.completedDays.length}/15</div>
          </div>
        </div>
      </motion.div>

      {/* Portfolio Requirements */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioRequirements.map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-lg border-2 transition-all ${
                req.completed >= req.required
                  ? 'bg-green-50 border-green-300'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{req.label}</h3>
                  <p className="text-sm text-gray-600">
                    {req.completed}/{req.required} completed
                  </p>
                </div>
                {req.completed >= req.required && (
                  <Award className="w-6 h-6 text-green-600" />
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(req.completed / req.required) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full transition-colors ${
                    req.completed >= req.required
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                      : 'bg-gradient-to-r from-blue-400 to-purple-500'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Portfolio Items */}
      {portfolioItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-blue-600 uppercase">{item.type}</p>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <button className="p-2 hover:bg-white rounded transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{item.content}</p>
                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 20 }}
        className="mt-8 flex gap-4 justify-center"
      >
        <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all">
          <Download className="w-5 h-5" />
          Export Portfolio
        </button>
        <button className="flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-bold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-all">
          <Share2 className="w-5 h-5" />
          Share Portfolio
        </button>
      </motion.div>
    </div>
  );
};

export default Portfolio;
