const userForm = document.getElementById("userForm");
const leaderboardList = document.querySelector(".leaderboard-list");

userForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = document.getElementById("nameInput").value;

  if (userName) {
    localStorage.setItem("userName", userName);
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  } else {
    alert("Iltimos, ismingizni kiriting!");
  }
  console.log(userName);
});

// Update leaderboard if it exists (only on home.html)
if (leaderboardList) {
  const userNames = localStorage.getItem("userName");
  const userScore = localStorage.getItem("userScore") || 0;

  leaderboardList.innerHTML = `
    <div class="player">
      <span class="rank">1</span>
      <span class="name">${userNames || 'Player'}</span>
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
