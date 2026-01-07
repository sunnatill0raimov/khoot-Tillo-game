import { setQuestions } from "./state.js";
import { renderQuestion } from "./ui.js";

const questionsApi =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

export const fetchQuestions = async () => {
  try {
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
