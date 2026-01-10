import { questions, currentIndex, score } from "./state.js";
import { handleAnswerClick } from "./quiz.js";

const questionsContainer = document.getElementById("questionsContainer");
const loadingContainer = document.getElementById("loadingContainer");

export const showLoading = () => {
  loadingContainer.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
};

export const hideLoading = () => {
  loadingContainer.classList.add("hidden");
  questionsContainer.classList.remove("hidden");
};

export const renderQuestion = () => {
  const item = questions[currentIndex];

  const answers = [
    item.correct_answer,
    ...item.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  questionsContainer.innerHTML = `
    <p class="questions">
      ${currentIndex + 1} / ${questions.length}. ${item.question}
    </p>
    <div class="answer-container">
      ${answers.map(a => `<div class="answer">${a}</div>`).join("")}
    </div>
    <p class="score">Score: ${score}</p>
  `;

  document.querySelectorAll(".answer").forEach(answer => {
    answer.addEventListener("click", () => handleAnswerClick(answer));
  });
};

export const showResult = () => {
  questionsContainer.innerHTML = `
    <h2>🎉 Quiz tugadi!</h2>
    <p>Natija: <b>${score} / ${questions.length}</b></p>
    <button id="restartBtn">Restart</button>
  `;

  document
    .getElementById("restartBtn")
    .addEventListener("click", () => location.reload());
};
