export let questions = [];
export let currentIndex = 0;
export let score = 0;

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
};


