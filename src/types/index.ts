export interface Day {
  id: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  completed: boolean;
  locked: boolean;
}

export interface Lesson {
  id: number;
  dayId: number;
  title: string;
  content: LessonContent;
  practical: PracticalActivity;
  quiz: QuizQuestion[];
  assignment: Assignment;
}

export interface LessonContent {
  overview: string;
  sections: LessonSection[];
  keyTakeaway: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export interface PracticalActivity {
  title: string;
  description: string;
  steps: string[];
  output: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  points: number;
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  quizScores: Record<number, number>;
  notes: Record<number, string>;
  bookmarks: number[];
  portfolioItems: PortfolioItem[];
}

export interface PortfolioItem {
  type: 'prompt' | 'report' | 'document' | 'content' | 'presentation' | 'automation' | 'analysis' | 'assistant';
  title: string;
  content: string;
  date: string;
}

export interface FinalProject {
  profession: string;
  problem: string;
  research: string;
  aiSolution: string;
  workflow: string;
  output: string;
  verification: string;
  implementation: string;
}
