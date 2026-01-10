// ===================== IMPORT =====================
// State.js dan saveSettings funksiyasini chaqiramiz
import { saveSettings } from "./state.js";

// ===================== DOM ELEMENTS =====================
const CategoryApi = 'https://opentdb.com/api_category.php'; // Open Trivia DB kategoriyalar API
const categoryContainer = document.getElementById('category-questions'); // select input
const settingsForm = document.getElementById('settings-form'); // form element

// ===================== FETCH CATEGORIES =====================
const fetchCategory = async () => {
    const res = await fetch(CategoryApi); // API dan ma'lumot olish
    const data = await res.json();        // JSON ga parse qilish
    renderCategory(data.trivia_categories); // DOM ga chiqarish
}
fetchCategory(); // funksiya ishga tushadi

// ===================== RENDER CATEGORIES =====================
const renderCategory = (categories) => {
    categories.forEach(category => {
        categoryContainer.innerHTML += `
            <option value="${category.id}">${category.name}</option>
        `
    })
}

// ===================== FORM SUBMIT =====================
settingsForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Formni default submit qilinishini to'xtatish

    const settingsObject = {} // Sozlamalar obyekti

    // Formdagi qiymatlarni olish
    const formData = new FormData(settingsForm)
    formData.forEach((value, key) => {
        if (key === 'amount' || key === 'category' || key === 'timer') {
            settingsObject[key] = parseInt(value); // number qiymatga o'zgartirish
        } else if (key === 'difficulty') {
            settingsObject[key] = value; // string qiymat
        }
    })

    // ===================== SAVE SETTINGS =====================
    // LocalStorage ga saqlash
    saveSettings(settingsObject);

    // ===================== REDIRECT =====================
    // 1.5 sekunddan keyin home.html ga o'tkazish
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1500);
})
