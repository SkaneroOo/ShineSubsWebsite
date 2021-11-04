const btn = document.querySelector(".up-btn");



function scrollFunction() {
  (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? btn.style.opacity = 1 : btn.style.display = 0;
}

function goUp() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
}
window.onscroll = function() {scrollFunction()};