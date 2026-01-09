import { setQuestions, getSettings } from "./state.js";
import { renderQuestion } from "./ui.js";

export const fetchQuestions = async () => {
  try {
    const settings = getSettings();
    const questionsApi = `https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`;

    const res = await fetch(questionsApi);
    const data = await res.json();

    if (data?.results?.length) {
      setQuestions(data.results);
      renderQuestion();
    }
  } catch (err) {
    console.error("API error:", err);
  }
};
