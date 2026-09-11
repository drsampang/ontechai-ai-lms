import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, BookOpen, Users, Settings, LogOut } from 'lucide-react';
import Hero3D from './components/Hero3D';
import Dashboard from './pages/Dashboard';
import CourseOverview from './pages/CourseOverview';
import LessonPage from './pages/LessonPage';
import Portfolio from './pages/Portfolio';
import FinalProject from './pages/FinalProject';
import AIToolkit from './pages/AIToolkit';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentDayId, setCurrentDayId] = useState<number>(1);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'course', label: 'Course', icon: Users },
    { id: 'portfolio', label: 'Portfolio', icon: BookOpen },
    { id: 'toolkit', label: 'AI Toolkit', icon: Settings },
    { id: 'project', label: 'Final Project', icon: Users },
  ];

  const handleNavigation = (id: string) => {
    setCurrentPage(id);
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex h-screen bg-slate-900 text-gray-900">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-6 shadow-2xl z-40 md:relative md:translate-x-0"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OnTechai.AI
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-slate-700 pt-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-all">
              <LogOut className="w-5 h-5" />
              Reset Progress
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <div className="bg-white shadow-lg p-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-xl font-bold text-gray-900">AI Professional Mastery</h2>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              DR
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {currentPage === 'home' && <Hero3D />}
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'course' && <CourseOverview />}
            {currentPage === 'portfolio' && <Portfolio />}
            {currentPage === 'toolkit' && <AIToolkit />}
            {currentPage === 'project' && <FinalProject />}
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </div>
    </Router>
  );
};

export default App;
