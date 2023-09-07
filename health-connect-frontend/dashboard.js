const hamburger = document.querySelector(".hamburger-menu");
const hamburger_options = document.querySelector(".options");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    hamburger_options.classList.toggle("active");

})