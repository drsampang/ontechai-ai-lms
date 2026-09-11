import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, MessageSquare, Download } from 'lucide-react';
import LessonContent from '../components/LessonContent';
import QuizCard from '../components/QuizCard';
import { CURRICULUM_DATA } from '../types/curriculum';
import { getProgress, markDayComplete, saveNotes, getNotes, addBookmark, removeBookmark, isBookmarked } from '../utils/storage';

interface LessonPageProps {
  dayId: number;
}

const LessonPage: React.FC<LessonPageProps> = ({ dayId = 1 }) => {
  const [activeTab, setActiveTab] = useState<'lesson' | 'practical' | 'quiz' | 'notes'>('lesson');
  const [notes, setNotes] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const [completedQuiz, setCompletedQuiz] = useState(false);

  const progress = getProgress();
  const day = CURRICULUM_DATA.days[dayId - 1];

  useEffect(() => {
    setNotes(getNotes(dayId));
    setBookmarked(isBookmarked(dayId));
  }, [dayId]);

  if (!day) return <div className="p-8">Day not found</div>;

  const handleSaveNotes = () => {
    saveNotes(dayId, notes);
    alert('Notes saved successfully!');
  };

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(dayId);
      setBookmarked(false);
    } else {
      addBookmark(dayId);
      setBookmarked(true);
    }
  };

  const handleMarkComplete = () => {
    markDayComplete(dayId);
    alert('Day marked as complete!');
  };

  const quizQuestions = [
    {
      id: 1,
      question: `What is the main focus of ${day.title}?`,
      options: day.sections.map(s => s.name),
      correctAnswer: 0,
      explanation: `The main focus is ${day.sections[0].name}.`
    },
    {
      id: 2,
      question: `Which of the following is NOT covered in ${day.title}?`,
      options: ['Topic A', 'Topic B', 'Topic C', 'Unrelated Topic'],
      correctAnswer: 3,
      explanation: 'Unrelated Topic is not part of this day\'s curriculum.'
    },
    {
      id: 3,
      question: `Why is ${day.title} important for professionals?`,
      options: [
        'It provides foundational knowledge',
        'It helps with practical application',
        'It connects to real-world scenarios',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'All these aspects make this day important for professional development.'
    },
    {
      id: 4,
      question: `What should you do after completing ${day.title}?`,
      options: [
        'Take the quiz',
        'Practice the practical activity',
        'Review your notes',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'Complete all activities to solidify your learning.'
    },
    {
      id: 5,
      question: `How long should this lesson take?`,
      options: ['30 minutes', '1 hour', '2 hours', '3 hours'],
      correctAnswer: 2,
      explanation: `This lesson is designed to be completed in ${day.duration}.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 sticky top-0 z-10 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Day {dayId}: {day.title}</h1>
            <p className="text-blue-100">{day.duration}</p>
          </div>
          <button
            onClick={handleBookmark}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            {bookmarked ? (
              <BookmarkCheck className="w-6 h-6" />
            ) : (
              <Bookmark className="w-6 h-6" />
            )}
          </button>
        </div>
        <p className="text-blue-100 mb-4">{day.description}</p>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['lesson', 'practical', 'quiz', 'notes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Lesson Tab */}
        {activeTab === 'lesson' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <LessonContent
              title={day.title}
              overview={day.description}
              sections={day.sections.map(s => ({
                title: s.name,
                content: s.topics.join(', ')
              }))}
              keyTakeaway={`${day.title} provides essential knowledge for professional development.`}
            />
          </motion.div>
        )}

        {/* Practical Tab */}
        {activeTab === 'practical' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Practical Activity</h2>
            <div className="space-y-6">
              {day.sections.find(s => s.name.includes('Practical')) && (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">
                    {day.sections.find(s => s.name.includes('Practical'))?.name}
                  </h3>
                  <div className="space-y-4">
                    {day.sections
                      .find(s => s.name.includes('Practical'))?.topics.map((topic, idx) => (
                      <label key={idx} className="flex items-center gap-3 p-3 bg-white rounded hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                        <span className="text-gray-700">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all">
                Save Practical Output
              </button>
            </div>
          </motion.div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <QuizCard
              questions={quizQuestions}
              onComplete={(score) => {
                setCompletedQuiz(true);
                alert(`Quiz completed! Score: ${Math.round(score)}%`);
              }}
            />
          </motion.div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Notes</h2>
            <div className="space-y-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSaveNotes}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  <MessageSquare className="inline mr-2 w-5 h-5" />
                  Save Notes
                </button>
                <button className="flex-1 py-3 bg-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-300 transition-all">
                  <Download className="inline mr-2 w-5 h-5" />
                  Export
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-8 py-8 flex gap-4 justify-between"
      >
        <button
          disabled={dayId === 1}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous Day
        </button>

        <button
          onClick={handleMarkComplete}
          className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
        >
          ✓ Mark as Complete
        </button>

        <button
          disabled={dayId === 15}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next Day
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};

export default LessonPage;
