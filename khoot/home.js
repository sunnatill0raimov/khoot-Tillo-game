const questionsContainer = document.getElementById("questionsContainer");
const loadingContainer = document.getElementById("loadingContainer");
const questionsApi = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

let questions = [];
let currentIndex = 0;
let score = 0;

// 🔄 LOADING
const showLoading = () => {
  loadingContainer.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
};

const hideLoading = () => {
  loadingContainer.classList.add("hidden");
  questionsContainer.classList.remove("hidden");
};

const fetchQuestions = async () => {
  showLoading();
  try {
    const res = await fetch(questionsApi);
    const data = await res.json();

    if (data?.results?.length) {
      questions = data.results;
      renderQuestion();
    }
  } catch (err) {
    console.error("API error:", err);
  } finally {
    hideLoading();
  }
};

fetchQuestions();

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
const renderQuestion = () => {
  const item = questions[currentIndex];

  // Javoblarni arrayga yig‘amiz
  const answersArray = [
    item.correct_answer,
    ...item.incorrect_answers,
  ];

  // 🔀 SHUFFLE (correct doim yuqorida turmasin)
  answersArray.sort(() => Math.random() - 0.5);

  questionsContainer.innerHTML = `
    <p class="questions">
      ${currentIndex + 1} / ${questions.length}. ${item.question}
    </p>
    <div class="answer-container">
      ${answersArray
        .map((ans) => `<div class="answer">${ans}</div>`)
        .join("")}
    </div>
    <p class="score">Score: ${score}</p>
  `;

  const answers = document.querySelectorAll(".answer");

  answers.forEach((answer) => {
    answer.addEventListener("click", () => {
      // 🔒 qayta bosilmasin
      answers.forEach((a) => (a.style.pointerEvents = "none"));

      if (answer.textContent === item.correct_answer) {
        answer.classList.add("correct");
        score++;
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
  currentIndex++;

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

  questionsContainer.innerHTML = `
    <h2>🎉 Quiz tugadi!</h2>
    <p>Natija: <b>${score} / ${questions.length}</b></p>
    <button id="restartBtn">Restart</button>
  `;

  document.getElementById("restartBtn").addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    fetchQuestions();
  });

  // Update leaderboard after quiz completion
  updateLeaderboard();
};

// Initialize leaderboard on page load
updateLeaderboard();
