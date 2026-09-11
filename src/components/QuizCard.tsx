import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (answered) return;

    setSelected(optionIndex);
    setAnswered(true);

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setCompleted(true);
      onComplete((score + (selected === questions[currentQuestion].correctAnswer ? 1 : 0)) / questions.length * 100);
    }
  };

  const question = questions[currentQuestion];
  const isCorrect = selected === question.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
    >
      {completed ? (
        <div className="text-center space-y-4">
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {Math.round((score / questions.length) * 100)}%
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Quiz Completed!
          </h3>
          <p className="text-gray-600">
            You got {score} out of {questions.length} questions correct
          </p>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setSelected(null);
              setAnswered(false);
              setScore(0);
              setCompleted(false);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Question {currentQuestion + 1}/{questions.length}
              </h3>
              <div className="text-sm font-semibold text-blue-600">
                Score: {score}/{questions.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: answered ? 1 : 1.02 }}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selected === index
                    ? isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{option}</span>
                  {answered && selected === index && (
                    isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                isCorrect
                  ? 'bg-green-100 border border-green-300 text-green-900'
                  : 'bg-red-100 border border-red-300 text-red-900'
              }`}
            >
              <p className="font-semibold mb-2">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-sm">{question.explanation}</p>
            </motion.div>
          )}

          <button
            onClick={handleNext}
            disabled={!answered}
            className={`w-full py-3 rounded-lg font-bold transition-all ${
              answered
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default QuizCard;
