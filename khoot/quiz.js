import {
  questions,
  currentIndex,
  nextIndex,
  increaseScore,
} from "./state.js";
import { renderQuestion, showResult } from "./ui.js";

export const handleAnswerClick = (answer) => {
  const item = questions[currentIndex];
  const answers = document.querySelectorAll(".answer");

  answers.forEach(a => (a.style.pointerEvents = "none"));

  if (answer.textContent === item.correct_answer) {
    answer.classList.add("correct");
    increaseScore();
  } else {
    answer.classList.add("wrong");
    answers.forEach(a => {
      if (a.textContent === item.correct_answer) {
        a.classList.add("correct");
      }
    });
  }

  setTimeout(() => {
    nextIndex();
    currentIndex < questions.length ? renderQuestion() : showResult();
  }, 1000);
};
