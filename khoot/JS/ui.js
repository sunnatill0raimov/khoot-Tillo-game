// ===================== ELEMENTLARNI TANLAB OLISH =====================
// Savollar va loading containerlarini tanlab olamiz
const questionsContainer = document.getElementById("questionsContainer");
const loadingContainer = document.getElementById("loadingContainer");

// ===================== LOADING SHOW / HIDE FUNKSIYALARI =====================
export const showLoading = () => {
  // Loading container ko'rinadi, savollar yashirinadi
  loadingContainer.classList.remove("hidden");
  questionsContainer.classList.add("hidden");
};

export const hideLoading = () => {
  // Loading container yashirinadi, savollar ko'rinadi
  loadingContainer.classList.add("hidden");
  questionsContainer.classList.remove("hidden");
};

// ===================== SAVOLNI RENDER QILISH =====================
export const renderQuestion = () => {
  // Hozirgi savolni olish
  const item = questions[currentIndex];

  // Javoblarni aralashtirish
  const answers = [item.correct_answer, ...item.incorrect_answers].sort(
    () => Math.random() - 0.5
  );

  // Savol va javoblarni DOM ga qo'yish
  questionsContainer.innerHTML = `
    <p class="questions">
      ${currentIndex + 1} / ${questions.length}. ${item.question}
    </p>
    <div class="answer-container">
      ${answers.map((a) => `<div class="answer">${a}</div>`).join("")}
    </div>
    <p class="score">Score: ${score}</p>
  `;

  // Har bir javobga click event qo'shish
  document.querySelectorAll(".answer").forEach((answer) => {
    answer.addEventListener("click", () => handleAnswerClick(answer));
  });
};

// ===================== NATIJA EKRANI =====================
export const showResult = () => {
  // Savol containerini natija bilan yangilash
  questionsContainer.innerHTML = `
    <h2>🎉 Quiz tugadi!</h2>
    <p>Natija: <b>${score} / ${questions.length}</b></p>
    <button id="restartBtn">Restart</button>
  `;

  // Restart tugmasini bosganda sahifani reload qilish
  document
    .getElementById("restartBtn")
    .addEventListener("click", () => location.reload());
};
