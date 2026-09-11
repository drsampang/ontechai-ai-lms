import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle } from 'lucide-react';
import { saveFinalProject, getFinalProject } from '../utils/storage';
import { FinalProject as FinalProjectType } from '../types';

const FinalProject: React.FC = () => {
  const [profession, setProfession] = useState('');
  const [formData, setFormData] = useState<FinalProjectType>({
    profession: '',
    problem: '',
    research: '',
    aiSolution: '',
    workflow: '',
    output: '',
    verification: '',
    implementation: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const professions = [
    'Political Leader',
    'Business Owner',
    'Contractor/Thekedar',
    'Social Worker/NGO',
    'Student/Youth Leader',
    'Teacher',
    'Other Professional',
  ];

  const steps = [
    { num: 1, title: 'Problem', description: 'Identify your core challenge' },
    { num: 2, title: 'Research', description: 'Conduct AI-powered research' },
    { num: 3, title: 'AI Solution', description: 'Define your AI approach' },
    { num: 4, title: 'Workflow', description: 'Create your system workflow' },
    { num: 5, title: 'Output', description: 'Describe expected results' },
    { num: 6, title: 'Verification', description: 'Plan verification method' },
    { num: 7, title: 'Implementation', description: 'Implementation strategy' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, profession };
    saveFinalProject(finalData);
    setSubmitted(true);
    alert('Final Project submitted successfully!');
  };

  const savedProject = getFinalProject();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Final Project: AI Masterclass</h1>
        <p className="text-xl text-gray-600">
          Transform your learning into a real-world AI system using the 7-step framework.
        </p>
      </motion.div>

      {/* 7-Step Framework Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12"
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">7-Step Project Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-gray-900 text-center">{step.title}</h3>
                <p className="text-xs text-gray-600 text-center mt-1">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute w-8 h-0.5 bg-blue-300 ml-12 mt-6" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Profession Selection */}
      {!savedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Profession</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {professions.map((prof, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => setProfession(prof)}
                className={`p-4 rounded-lg border-2 transition-all text-left font-semibold ${
                  profession === prof
                    ? 'bg-blue-50 border-blue-500 text-blue-900'
                    : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-blue-300'
                }`}
              >
                {prof}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Project Form */}
      {profession && !savedProject && (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Build Your AI System ({profession})
          </h2>

          <div className="space-y-8">
            {steps.map((step) => {
              const key = step.title.toLowerCase().replace(/[\s-]/g, '') as keyof FinalProjectType;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <label className="block">
                    <span className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-2">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                        {step.num}
                      </span>
                      {step.title}
                    </span>
                    <textarea
                      value={(formData as any)[key] || ''}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          [key]: e.target.value
                        }))
                      }
                      placeholder={`Describe the ${step.title.toLowerCase()}...`}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
                    />
                  </label>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all text-lg"
          >
            Submit Final Project
          </motion.button>
        </motion.form>
      )}

      {/* Success Message */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 p-8 rounded-2xl text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-green-900 mb-2">🎉 Congratulations!</h2>
          <p className="text-green-800 text-lg mb-6">
            You've completed your Final Project and earned your AI Professional Mastery Certificate.
          </p>
          <button className="flex items-center gap-2 mx-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all">
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
        </motion.div>
      )}

      {/* Saved Project View */}
      {savedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-50 p-8 rounded-2xl shadow-lg border-2 border-green-300"
        >
          <h2 className="text-2xl font-bold text-green-900 mb-6">Your Submitted Project</h2>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.num} className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {step.num}. {step.title}
                </h3>
                <p className="text-gray-700">
                  {(savedProject as any)[step.title.toLowerCase().replace(/[\s-]/g, '')] || 'Not provided'}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FinalProject;
