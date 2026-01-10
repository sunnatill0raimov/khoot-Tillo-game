// ===================== ELEMENTLARNI TANLAB OLISH =====================
const userForm = document.getElementById("userForm");
const leaderboardList = document.querySelector(".leaderboard-list");

// ===================== USER FORM SUBMIT HANDLER =====================
userForm?.addEventListener("submit", (e) => {
  e.preventDefault();
 // 
 const userName = document.getElementById("nameInput").value;
 if (userName) {
    localStorage.setItem("userName", userName);
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  } else {
    alert("Iltimos, ismingizni kiriting!");
  }
});

// ===================== LEADERBOARD UPDATE =====================
if (leaderboardList) {
  const userNames = localStorage.getItem("userName");
  const userScore = localStorage.getItem("userScore") || 0;
  leaderboardList.innerHTML = `
    <div class="player">
      <span class="rank">1</span>
      <span class="name">${userNames || "Player"}</span>
      <span class="score">${userScore}</span>
    </div>
  `;
}
