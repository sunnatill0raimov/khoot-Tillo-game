// ===================== IMPORT =====================
// State.js dan kerakli funksiyalar va qiymatlarni import qilamiz
import {
  questions,      // Savollar arrayi
  currentIndex,   // Hozirgi savol indeksi
  nextIndex,      // Keyingi indeksga o'tish funksiyasi
  increaseScore,  // Ball qo'shish funksiyasi
} from "./state.js";

import { renderQuestion, showResult } from "./ui.js"; // Savol va natijani render qilish

// ===================== HANDLE ANSWER CLICK =====================
export const handleAnswerClick = (answer) => {
  const item = questions[currentIndex]; // Hozirgi savolni olamiz
  const answers = document.querySelectorAll(".answer"); // Barcha javob elementlari

  // Bir martalik click qilish (bir nechta clickni oldini olish)
  answers.forEach(a => (a.style.pointerEvents = "none"));

  // ===================== JAVOB TEKSHIRISH =====================
  if (answer.textContent === item.correct_answer) {
    // To'g'ri javobni yashil qilish
    answer.classList.add("correct");
    increaseScore(); // Ball qo'shish
  } else {
    // Noto'g'ri javob qizil bo'ladi
    answer.classList.add("wrong");

    // To'g'ri javobni ko'rsatish
    answers.forEach(a => {
      if (a.textContent === item.correct_answer) {
        a.classList.add("correct");
      }
    });
  }

  // ===================== KEYINGI SAVOL =====================
  setTimeout(() => {
    nextIndex(); // Keyingi savolga indeksni oshirish

    // Agar savollar tugamagan bo'lsa render qilamiz, aks holda natijani ko'rsatamiz
    currentIndex < questions.length ? renderQuestion() : showResult();
  }, 1000); // 1 sekund kutish (javobni ko‘rsatish va keyin o‘tish)
};
