import { UserProgress, PortfolioItem, FinalProject } from '../types';

const STORAGE_KEY = 'ontechai_user_progress';
const PORTFOLIO_KEY = 'ontechai_portfolio';
const FINAL_PROJECT_KEY = 'ontechai_final_project';

export const getProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {
    currentDay: 1,
    completedDays: [],
    quizScores: {},
    notes: {},
    bookmarks: [],
    portfolioItems: []
  };
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const markDayComplete = (dayId: number) => {
  const progress = getProgress();
  if (!progress.completedDays.includes(dayId)) {
    progress.completedDays.push(dayId);
  }
  progress.currentDay = Math.max(progress.currentDay, dayId + 1);
  saveProgress(progress);
};

export const saveQuizScore = (dayId: number, score: number) => {
  const progress = getProgress();
  progress.quizScores[dayId] = score;
  saveProgress(progress);
};

export const saveNotes = (dayId: number, notes: string) => {
  const progress = getProgress();
  progress.notes[dayId] = notes;
  saveProgress(progress);
};

export const getNotes = (dayId: number): string => {
  const progress = getProgress();
  return progress.notes[dayId] || '';
};

export const addBookmark = (dayId: number) => {
  const progress = getProgress();
  if (!progress.bookmarks.includes(dayId)) {
    progress.bookmarks.push(dayId);
  }
  saveProgress(progress);
};

export const removeBookmark = (dayId: number) => {
  const progress = getProgress();
  progress.bookmarks = progress.bookmarks.filter(id => id !== dayId);
  saveProgress(progress);
};

export const isBookmarked = (dayId: number): boolean => {
  const progress = getProgress();
  return progress.bookmarks.includes(dayId);
};

export const addPortfolioItem = (item: PortfolioItem) => {
  const portfolio = localStorage.getItem(PORTFOLIO_KEY);
  const items: PortfolioItem[] = portfolio ? JSON.parse(portfolio) : [];
  items.push(item);
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items));
};

export const getPortfolioItems = (): PortfolioItem[] => {
  const portfolio = localStorage.getItem(PORTFOLIO_KEY);
  return portfolio ? JSON.parse(portfolio) : [];
};

export const saveFinalProject = (project: FinalProject) => {
  localStorage.setItem(FINAL_PROJECT_KEY, JSON.stringify(project));
};

export const getFinalProject = (): FinalProject | null => {
  const project = localStorage.getItem(FINAL_PROJECT_KEY);
  return project ? JSON.parse(project) : null;
};

export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PORTFOLIO_KEY);
  localStorage.removeItem(FINAL_PROJECT_KEY);
};
