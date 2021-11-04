const hamburger = document.querySelector(".burger");
const burgermenu = document.querySelector(".menu");

hamburger.addEventListener("click", ()=> {
    burgermenu.classList.toggle("displaying");
})