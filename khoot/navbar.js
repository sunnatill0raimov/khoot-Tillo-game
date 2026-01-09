const homeBtn = document.querySelector("#home");
const aboutBtn = document.querySelector("#about");
const settingsBtn = document.querySelector("#settings");


homeBtn.addEventListener("click", () => {
   window.location.href = 'home.html'
})

aboutBtn.addEventListener("click", () => {
   window.location.href = 'about.html'
})

settingsBtn.addEventListener("click", () => {
   window.location.href = 'settings.html'
})

