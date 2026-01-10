// ===================== IMPORT =====================
// API fetch, state va UI funksiyalarini import qilamiz
import { fetchQuestions } from "./api.js";
import { questions, currentIndex, score, nextIndex, increaseScore, resetState, settings } from "./state.js";
import { showLoading, hideLoading } from "./ui.js";
import { loadSettings } from "./state.js";

// ===================== DOM ELEMENTS =====================
const questionsContainer = document.getElementById("questionsContainer");
const loadingContainer = document.getElementById("loadingContainer");

// ===================== LOAD SETTINGS =====================
loadSettings(); // LocalStorage dan oldingi sozlamalarni yuklash

// ===================== INITIALIZE APP =====================
document.addEventListener("DOMContentLoaded", async () => {
  showLoading();          // Loading ekranini ko‘rsatish
  await fetchQuestions(); // Savollarni API dan olish
  renderQuestion();       // Birinchi savolni render qilish
});

// ===================== LEADERBOARD =====================
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

// ===================== RENDER QUESTION =====================
let timerInterval;
let timerTimeout;

const renderQuestion = () => {
  hideLoading(); // Loading ekranini yashirish

  if (questions.length === 0) {
    questionsContainer.innerHTML = '<p class="questions">Savollar yuklanmadi. Qayta urinib ko\'ring.</p>';
    return;
  }

  const item = questions[currentIndex];

  // Javoblarni arrayga yig‘amiz va shuffle qilamiz
  const answersArray = [item.correct_answer, ...item.incorrect_answers];
  answersArray.sort(() => Math.random() - 0.5);

  const timerDuration = settings.timer * 1000; // sekundni millisekundga o‘zgartirish

  // HTML render
  questionsContainer.innerHTML = `
    <p class="questions">
      ${currentIndex + 1} / ${questions.length}. ${item.question}
    </p>
    <div class="timer-container">
      <div class="timer-bar" id="timerBar"></div>
      <div class="timer-text" id="timerText">🕒 ${settings.timer}</div>
    </div>
    <div class="answer-container">
      ${answersArray.map((ans) => `<div class="answer">${ans}</div>`).join("")}
    </div>
    <p class="score">Score: ${score}</p>
  `;

  const answers = document.querySelectorAll(".answer");
  const timerBar = document.getElementById("timerBar");
  const timerText = document.getElementById("timerText");

  // ===================== TIMER =====================
  let timeLeft = settings.timer;
  const updateInterval = 100; // ms
  const decrement = updateInterval / 1000;

  timerInterval = setInterval(() => {
    timeLeft -= decrement;
    const percentage = (timeLeft / settings.timer) * 100;
    timerBar.style.width = `${Math.max(0, percentage)}%`;
    timerText.textContent = `🕒 ${Math.ceil(timeLeft)}`;

    if (timeLeft <= 0) clearInterval(timerInterval);
  }, updateInterval);

  // Timeout handler
  timerTimeout = setTimeout(() => {
    answers.forEach((a) => (a.style.pointerEvents = "none")); // Javoblarni bloklash

    answers.forEach((a) => {
      if (a.textContent === item.correct_answer) a.classList.add("correct");
      else a.classList.add("wrong");
    });

    setTimeout(nextQuestion, 1000); // Keyingi savolga o‘tish
  }, timerDuration);

  // ===================== ANSWER CLICK =====================
  answers.forEach((answer) => {
    answer.addEventListener("click", () => {
      clearInterval(timerInterval);
      clearTimeout(timerTimeout);

      answers.forEach((a) => (a.style.pointerEvents = "none")); // Boshqa clickni bloklash

      if (answer.textContent === item.correct_answer) {
        answer.classList.add("correct");
        increaseScore(); // Ball qo‘shish
      } else {
        answer.classList.add("wrong");
        // To‘g‘ri javobni ko‘rsatish
        answers.forEach((a) => {
          if (a.textContent === item.correct_answer) a.classList.add("correct");
        });
      }

      setTimeout(nextQuestion, 1000); // Keyingi savolga o‘tish
    });
  });
};

// ===================== NEXT QUESTION =====================
const nextQuestion = () => {
  nextIndex();
  if (currentIndex < questions.length) renderQuestion();
  else showResult();
};

// ===================== SHOW RESULT =====================
const showResult = () => {
  localStorage.setItem("userScore", score); // Natijani saqlash

  questionsContainer.innerHTML = `
    <div class="result-container">
      <h2 class="result-title">🎉 Quiz tugadi!</h2>
      <p class="result-score">Natija: <b>${score} / ${questions.length}</b></p>
      <button id="restartBtn" class="restart-btn">Qayta o'ynash</button>
    </div>
  `;

  document.getElementById("restartBtn").addEventListener("click", async () => {
    resetState();        // Quizni reset qilish
    await fetchQuestions(); // Savollarni qayta yuklash
    renderQuestion();    // Birinchi savolni render qilish
  });

  updateLeaderboard(); // Leaderboardni yangilash
};

// ===================== INITIAL LEADERBOARD =====================
updateLeaderboard(); // Sahifa yuklanganda leaderboardni render qilish
