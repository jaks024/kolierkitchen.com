const navOpenBtn = document.getElementById("navOpenBtn");
const navCloseBtn = document.getElementById("navCloseBtn");
const navBar = document.getElementById("navbar");
const navUnderlay = document.getElementById("navUnderlay");

const C_SHOW = "show";
const C_SHOW60px = "show60px";
const C_HIDE = "hide";

const imgColumns = [document.getElementById("imgCol0"),
    document.getElementById("imgCol1")
];

const IMG_CSS_CLASS = "img-item"
const IMG_DIR = "imgs/";
const IMG_DIR_CAT = ["thumbnails/", "countertops/"];
const IMG_TN_CAT = "imgs/thumbnails/"
const IMG_EXT = ".webp";
const IMG_COUNT = [100, 2];
const IMG_LOAD_DELAY = 150;

var currentCatInd = 1;

const NAV_SELECTED_CLASS = "nav-selected";
const catBtns = [document.getElementById("catCabinet"),
    document.getElementById("catCountertops")
];
catBtns[0].addEventListener("click", () => {
    switchCategory(0);
});
catBtns[1].addEventListener("click", () => {
    switchCategory(1);
});


navOpenBtn.addEventListener("click", setNavActive);
navCloseBtn.addEventListener("click", setNavDisable);

window.onload = initialLoad;

function setNavActive() {
    navBar.classList.add(C_SHOW);
    navBar.classList.remove(C_HIDE)
    navUnderlay.classList.add(C_HIDE);
    navUnderlay.classList.remove(C_SHOW60px)
}

function setNavDisable() {
    navBar.classList.add(C_HIDE);
    navBar.classList.remove(C_SHOW)
    navUnderlay.classList.add(C_SHOW60px);
    navUnderlay.classList.remove(C_HIDE)
}

const timer = ms => new Promise(res => setTimeout(res, ms))

async function loadImages() {
    let curCol = 0;
    for (let i = 0; i < IMG_COUNT[currentCatInd]; ++i) {
        let img = document.createElement("img");
        img.className = IMG_CSS_CLASS;
        img.src = IMG_TN_CAT + i + IMG_EXT;
        imgColumns[curCol].appendChild(img);
        curCol = curCol == 0 ? 1 : 0;
        await timer(IMG_LOAD_DELAY);
    }
}

function clearImages() {
    imgColumns[0].textContent = "";
    imgColumns[1].textContent = "";
}

function switchCategory(i) {
    if (currentCatInd == i) {
        return;
    }
    clearImages();
    currentCatInd = i;
    loadImages();
    catBtns[currentCatInd].classList.add(NAV_SELECTED_CLASS);
    catBtns[currentCatInd == 0 ? 1 : 0].classList.remove(NAV_SELECTED_CLASS);
}

function initialLoad (){
    switchCategory(0);
}