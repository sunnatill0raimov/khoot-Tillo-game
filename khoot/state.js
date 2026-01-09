export let questions = [];
export let currentIndex = 0;
export let score = 0;
export let unansweredQuestions = [];

// Default settings
const defaultSettings = {
  amount: 10,
  category: 21,
  difficulty: 'easy',
  timer: 10
};

// Settings management
export let settings = { ...defaultSettings };

export const loadSettings = () => {
  const saved = localStorage.getItem('khootSettings');
  if (saved) {
    settings = { ...defaultSettings, ...JSON.parse(saved) };
  }
};

export const saveSettings = (newSettings) => {
  settings = { ...settings, ...newSettings };
  localStorage.setItem('khootSettings', JSON.stringify(settings));
};

export const getSettings = () => {
  return { ...settings };
};

export const setQuestions = (data) => {
  questions = data;
};

export const nextIndex = () => {
  currentIndex++;
};

export const increaseScore = () => {
  score++;
};

export const resetState = () => {
  questions = [];
  currentIndex = 0;
  score = 0;
  unansweredQuestions = [];
};


