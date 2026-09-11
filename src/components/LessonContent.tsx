import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check } from 'lucide-react';

interface LessonSection {
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
  isPrompt?: boolean;
}

interface LessonContentProps {
  title: string;
  overview: string;
  sections: LessonSection[];
  keyTakeaway: string;
}

const LessonContent: React.FC<LessonContentProps> = ({
  title,
  overview,
  sections,
  keyTakeaway,
}) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-700 leading-relaxed">{overview}</p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-4">
        <AnimatePresence>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 flex items-center justify-between text-left transition-colors"
              >
                <h3 className="font-bold text-gray-900">{section.title}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    expandedSections.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedSections.includes(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-6 space-y-4 bg-white">
                      <div>
                        {section.isPrompt ? (
                          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
                            {section.content}
                          </div>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{section.content}</p>
                        )}

                        {section.isPrompt && (
                          <button
                            onClick={() => copyToClipboard(section.content, `prompt-${index}`)}
                            className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            {copiedId === `prompt-${index}` ? (
                              <>
                                <Check className="w-4 h-4" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy Prompt
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {section.subsections && (
                        <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
                          {section.subsections.map((sub, subIndex) => (
                            <div key={subIndex}>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {sub.title}
                              </h4>
                              <p className="text-gray-700">{sub.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Key Takeaway */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300"
      >
        <h3 className="font-bold text-green-900 mb-2">🎯 Key Takeaway</h3>
        <p className="text-green-800 leading-relaxed">{keyTakeaway}</p>
      </motion.div>
    </div>
  );
};

export default LessonContent;
