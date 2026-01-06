import { fetchQuestions } from "./api.js";
import { showLoading, hideLoading } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    showLoading();
    fetchQuestions();
    hideLoading();
});
