const hamburger = document.querySelector(".hamburger-menu");
// const hamburger_options = document.querySelector(".options");
const aside = document.querySelector('aside');

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    aside.classList.toggle("aside-active");
    // if (hamburger.classList.contains('active')) {
    //     aside.style.display = "block";
    //     aside.style.position = "fixed";
    // }
    // else {
    //     aside.style.display = "none";
    //     aside.style.position = "";
    // }

})