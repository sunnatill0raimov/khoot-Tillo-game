import { fetchQuestions } from "./api.js";
import { questions, currentIndex, score, nextIndex, increaseScore, resetState, unansweredQuestions, settings } from "./state.js";
import { showLoading, hideLoading } from "./ui.js";
import { loadSettings } from "./state.js";

const questionsContainer = document.getElementById("questionsContainer");
const loadingContainer = document.getElementById("loadingContainer");

// Load settings on page load
loadSettings();

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  showLoading();
  fetchQuestions();
  hideLoading();
});

// Update leaderboard function
const updateLeaderboard = () => {
  const leaderboardList = document.querySelector(".leaderboard-list");
  if (leaderboardList) {
    const userNames = localStorage.getItem("userName") || 'Player';
    const userScore = localStorage.getItem("userScore") || 0;

    leaderboardList.innerHTML = `
      <div class="player">
        <span class="rank">1</span>
        <span class="name">${userNames}</span>
        <span class="score">${userScore}</span>
      </div>
      <div class="player">
        <span class="rank">2</span>
        <span class="name">Player2</span>
        <span class="score">8</span>
      </div>
      <div class="player">
        <span class="rank">3</span>
        <span class="name">Player3</span>
        <span class="score">7</span>
      </div>
    `;
  }
};

// 🎯 Bitta savolni chiqarish
let timerInterval;
let timerTimeout;

const renderQuestion = () => {
  const item = questions[currentIndex];

  // Javoblarni arrayga yig‘amiz
  const answersArray = [
    item.correct_answer,
    ...item.incorrect_answers,
  ];

  // 🔀 SHUFFLE (correct doim yuqorida turmasin)
  answersArray.sort(() => Math.random() - 0.5);

  const timerDuration = settings.timer * 1000; // seconds to ms

  questionsContainer.innerHTML = `
    <p class="questions">
      ${currentIndex + 1} / ${questions.length}. ${item.question}
    </p>
    <div class="timer-container">
      <div class="timer-bar" id="timerBar"></div>
      <div class="timer-text" id="timerText">${settings.timer}</div>
    </div>
    <div class="answer-container">
      ${answersArray
        .map((ans) => `<div class="answer">${ans}</div>`)
        .join("")}
    </div>
    <p class="score">Score: ${score}</p>
  `;

  const answers = document.querySelectorAll(".answer");
  const timerBar = document.getElementById("timerBar");
  const timerText = document.getElementById("timerText");

  let timeLeft = settings.timer;
  const updateInterval = 100; // update every 100ms
  const decrement = updateInterval / 1000;

  // Start timer countdown
  timerInterval = setInterval(() => {
    timeLeft -= decrement;
    const percentage = (timeLeft / settings.timer) * 100;
    timerBar.style.width = `${Math.max(0, percentage)}%`;
    timerText.textContent = Math.ceil(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, updateInterval);

  // Timeout handler
  timerTimeout = setTimeout(() => {
    // Time's up - disable answers
    answers.forEach((a) => (a.style.pointerEvents = "none"));

    // Mark as unanswered and show correct answer
    unansweredQuestions.push({
      question: item.question,
      correct_answer: item.correct_answer
    });

    // Show correct answer
    answers.forEach((a) => {
      if (a.textContent === item.correct_answer) {
        a.classList.add("correct");
      } else {
        a.classList.add("timeout");
      }
    });

    // Move to next after delay
    setTimeout(nextQuestion, 1000);
  }, timerDuration);

  answers.forEach((answer) => {
    answer.addEventListener("click", () => {
      // Clear timers
      clearInterval(timerInterval);
      clearTimeout(timerTimeout);

      // 🔒 qayta bosilmasin
      answers.forEach((a) => (a.style.pointerEvents = "none"));

      if (answer.textContent === item.correct_answer) {
        answer.classList.add("correct");
        increaseScore();
      } else {
        answer.classList.add("wrong");

        // to‘g‘ri javobni ko‘rsat
        answers.forEach((a) => {
          if (a.textContent === item.correct_answer) {
            a.classList.add("correct");
          }
        });
      }

      // ⏭ keyingi savol
      setTimeout(nextQuestion, 1000);
    });
  });
};

// 🔁 NEXT QUESTION
const nextQuestion = () => {
  nextIndex();

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
};

// 🏁 NATIJA
const showResult = () => {
  // Save score to localStorage
  localStorage.setItem("userScore", score);

  let resultHTML = `
    <h2>🎉 Quiz tugadi!</h2>
    <p>Natija: <b>${score} / ${questions.length}</b></p>
  `;

  if (unansweredQuestions.length > 0) {
    resultHTML += `
      <h3>To'g'ri javoblar (vaqt tugadi):</h3>
      <div class="unanswered-list">
        ${unansweredQuestions.map((q, index) => `
          <div class="unanswered-item">
            <p><strong>${index + 1}. ${q.question}</strong></p>
            <p>To'g'ri javob: <span class="correct-answer">${q.correct_answer}</span></p>
          </div>
        `).join('')}
      </div>
    `;
  }

  resultHTML += `<button id="restartBtn">Restart</button>`;

  questionsContainer.innerHTML = resultHTML;

  document.getElementById("restartBtn").addEventListener("click", () => {
    resetState();
    fetchQuestions();
  });

  // Update leaderboard after quiz completion
  updateLeaderboard();
};

// Initialize leaderboard on page load
updateLeaderboard();
