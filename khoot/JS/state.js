// ===================== QUIZ STATE =====================
// Hozirgi savollar ro'yxati
export let questions = [];
// Hozirgi savol indeksi
export let currentIndex = 0;
// Hozirgi score
export let score = 0;
// Javobsiz qolgan savollar (agar timeout bo‘lsa ishlatish mumkin)
export let unansweredQuestions = [];

// ===================== DEFAULT SETTINGS =====================
const defaultSettings = {
  amount: 10,       // Savollar soni
  category: 21,     // Default category (General Knowledge)
  difficulty: 'easy', // Savol qiyinligi
  timer: 10         // Savol vaqti (sekund)
};

// ===================== SETTINGS MANAGEMENT =====================
export let settings = { ...defaultSettings };

// LocalStorage dan saqlangan sozlamalarni yuklash
export const loadSettings = () => {
  const saved = localStorage.getItem('khootSettings');
  if (saved) {
    settings = { ...defaultSettings, ...JSON.parse(saved) };
  }
};

// Yangi sozlamalarni saqlash
export const saveSettings = (newSettings) => {
  settings = { ...settings, ...newSettings };
  localStorage.setItem('khootSettings', JSON.stringify(settings));
};

// Hozirgi sozlamalarni olish
export const getSettings = () => {
  return { ...settings };
};

// ===================== QUESTIONS MANAGEMENT =====================
// Savollarni state ga o‘rnatish
export const setQuestions = (data) => {
  questions = data;
};

// ===================== QUIZ PROGRESS =====================
// Keyingi savolga o‘tish
export const nextIndex = () => {
  currentIndex++;
};

// Score ni oshirish
export const increaseScore = () => {
  score++;
};

// ===================== RESET =====================
// Quizni qayta boshlash uchun state ni tozalash
export const resetState = () => {
  questions = [];
  currentIndex = 0;
  score = 0;
  unansweredQuestions = [];
};
