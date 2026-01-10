// ===================== IMPORT =====================
// State bilan ishlash uchun funksiyalar import qilinadi
import { setQuestions, getSettings } from "./state.js";

// ===================== FETCH QUESTIONS =====================
// Savollarni OpenTDB API dan olish funksiyasi
export const fetchQuestions = async () => {
  try {
    // 1️⃣ Avval settings (sozlamalarni) olish
    const settings = getSettings();

    // 2️⃣ API URL yaratish, parametrlar settings ga mos
    const questionsApi = `https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`;

    // 3️⃣ API ga fetch yuborish
    const res = await fetch(questionsApi);

    // 4️⃣ JSON formatida javobni olish
    const data = await res.json();

    // 5️⃣ Savollarni state ga saqlash
    setQuestions(data.results || []); // agar results bo‘lmasa bo‘sh array
  } catch (err) {
    // 6️⃣ Xatolik bo‘lsa console ga chiqarish va savollarni bo‘sh array qilish
    console.error("API error:", err);
    setQuestions([]);
  }
};
