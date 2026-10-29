var button = document.getElementById("menu-button");
var menu = document.getElementById("menu");

button.addEventListener("click", function () {
  menu.classList.toggle("show");
});