// ===================== ELEMENTLARNI TANLAB OLISH =====================
const userForm = document.getElementById("userForm");
const leaderboardList = document.querySelector(".leaderboard-list");

// ===================== USER FORM SUBMIT HANDLER =====================
userForm?.addEventListener("submit", (e) => {
  e.preventDefault(); // Formning default submit harakatini to'xtatadi (page refresh yo'q)

  // Inputdagi foydalanuvchi ismini oladi
  const userName = document.getElementById("nameInput").value;

  // Agar foydalanuvchi ismi mavjud bo'lsa
  if (userName) {
    // LocalStorage ga saqlash, keyinchalik home.html da olish mumkin
    localStorage.setItem("userName", userName);

    // 1 soniyadan keyin home.html sahifasiga o'tish
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  } else {
    // Agar input bo'sh bo'lsa, ogohlantirish chiqaradi
    alert("Iltimos, ismingizni kiriting!");
  }
});

// ===================== LEADERBOARD UPDATE =====================
// Agar leaderboard element sahifada mavjud bo'lsa (home.html)
if (leaderboardList) {
  // LocalStorage dan foydalanuvchi nomini olish
  const userNames = localStorage.getItem("userName");

  // LocalStorage dan foydalanuvchi ballini olish, agar mavjud bo'lmasa 0 ga tenglashtiriladi
  const userScore = localStorage.getItem("userScore") || 0;

  // Leaderboard DOM ni yangilash
  leaderboardList.innerHTML = `
    <div class="player">
      <span class="rank">1</span>
      <span class="name">${userNames || "Player"}</span>
      <span class="score">${userScore}</span>
    </div>
  `;
}
