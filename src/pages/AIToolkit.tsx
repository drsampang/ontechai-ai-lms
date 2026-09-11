import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';

const AIToolkit: React.FC = () => {
  const tools = {
    'AI Chat & Reasoning': [
      { name: 'ChatGPT', url: 'https://chatgpt.com', description: 'Advanced AI assistant for writing, analysis, and coding', stars: 5 },
      { name: 'Gemini', url: 'https://gemini.google.com', description: 'Google\'s powerful AI for research and analysis', stars: 5 },
      { name: 'Claude', url: 'https://claude.ai', description: 'Anthropic\'s AI focused on safety and nuance', stars: 5 },
      { name: 'Perplexity', url: 'https://perplexity.ai', description: 'AI search engine with real-time web access', stars: 4 },
    ],
    'Document Intelligence': [
      { name: 'NotebookLM', url: 'https://notebooklm.google.com', description: 'Google\'s tool for analyzing long documents and PDFs', stars: 5 },
      { name: 'ChatGPT (File Upload)', url: 'https://chatgpt.com', description: 'Upload documents for analysis and extraction', stars: 4 },
    ],
    'Image Generation': [
      { name: 'DALL-E 3', url: 'https://openai.com/dall-e-3', description: 'High-quality image generation from text', stars: 5 },
      { name: 'Midjourney', url: 'https://midjourney.com', description: 'Artistic AI image generation', stars: 5 },
      { name: 'Adobe Firefly', url: 'https://firefly.adobe.com', description: 'Generative fill and image creation', stars: 4 },
    ],
    'Design & Presentation': [
      { name: 'Canva AI', url: 'https://canva.com', description: 'AI-powered design and presentation tools', stars: 5 },
      { name: 'Gamma', url: 'https://gamma.app', description: 'AI presentation and document creation', stars: 4 },
    ],
    'Video & Audio': [
      { name: 'Synthesia', url: 'https://synthesia.io', description: 'AI video generation with avatars', stars: 4 },
      { name: 'Descript', url: 'https://descript.com', description: 'AI-powered video and audio editing', stars: 5 },
    ],
    'Automation': [
      { name: 'Make', url: 'https://make.com', description: 'Visual automation platform (No-code)', stars: 5 },
      { name: 'Zapier', url: 'https://zapier.com', description: 'Connect apps and automate workflows', stars: 5 },
      { name: 'n8n', url: 'https://n8n.io', description: 'Open-source automation and workflow tool', stars: 4 },
    ],
    'Data & Analysis': [
      { name: 'Google Sheets + AI', url: 'https://sheets.google.com', description: 'Spreadsheet with built-in AI functions', stars: 5 },
      { name: 'Excel + Copilot', url: 'https://microsoft.com/excel', description: 'Microsoft Excel with AI assistance', stars: 4 },
      { name: 'Tableau', url: 'https://tableau.com', description: 'Business intelligence and data visualization', stars: 5 },
    ],
    'Coding & Development': [
      { name: 'GitHub Copilot', url: 'https://github.com/copilot', description: 'AI code generation and assistance', stars: 5 },
      { name: 'Claude (Coding)', url: 'https://claude.ai', description: 'Advanced coding assistance and debugging', stars: 5 },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Toolkit Directory</h1>
        <p className="text-xl text-gray-600">
          Curated collection of professional AI tools organized by use case.
        </p>
      </motion.div>

      {/* Toolkit Categories */}
      <div className="space-y-8">
        {Object.entries(tools).map(([ category, toolList], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {toolList.map((tool, toolIndex) => (
                <motion.a
                  key={toolIndex}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < tool.stars
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Philosophy Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Tool Selection Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">❌ DON'T Ask:</h3>
            <p className="text-blue-100">
              "What is the best AI tool?"
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">✅ DO Ask:</h3>
            <p className="text-blue-100">
              "Which tool or combination of tools is best for my specific task?"
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-blue-400">
          <p className="text-blue-100">
            Remember: <strong>Prompt is a command. Workflow is a system.</strong> Choose tools based on your problem, not the other way around.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AIToolkit;
