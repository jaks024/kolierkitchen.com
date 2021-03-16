const navOpenBtn = document.getElementById("navOpenBtn");
const navCloseBtn = document.getElementById("navCloseBtn");
const navBar = document.getElementById("navbar");
const navUnderlay = document.getElementById("navUnderlay");

const C_SHOW = "show";
const C_HIDE = "hide";

navOpenBtn.addEventListener("click", setNavActive);
navCloseBtn.addEventListener("click", setNavDisable);

function setNavActive() {
    navBar.classList.add(C_SHOW);
    navBar.classList.remove(C_HIDE)
    navUnderlay.classList.add(C_HIDE);
    navUnderlay.classList.remove(C_SHOW)
}

function setNavDisable() {
    navBar.classList.add(C_HIDE);
    navBar.classList.remove(C_SHOW)
    navUnderlay.classList.add(C_SHOW);
    navUnderlay.classList.remove(C_HIDE)
}