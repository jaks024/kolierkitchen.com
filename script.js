const content = document.getElementById("content");

let curImgInd = 0;
let curColInd = 0;
const sbcontent = document.getElementById("scroll-detect");
sbcontent.addEventListener('scroll', () => {
    if (sbcontent.scrollTop > 0.8 * imgColumns[0].offsetHeight  - content.offsetHeight) {
        loadImages();
    }
});


const C_SHOW = "show";
const C_SHOW60px = "show60px";
const C_HIDE = "hide";

const imgColumns = [document.getElementById("imgCol0"),
    document.getElementById("imgCol1")
];

const IMG_ALT = "Kitchen Cabinet image made by Kolier Kitchen.";
const IMG_CSS_CLASS = "img-item"
const IMG_DIR = "imgs/";
const IMG_ZOOM_DIR = "imgs/magnified/";
const IMG_DIR_CAT = ["finished_works/", "countertops/", "handles/"];
const IMG_EXT = ".webp";
const IMG_COUNT = [96, 0, 0];
const IMG_LOAD_DELAY = 150;
const IMG_SCROLL_COUNT = 15;

var currentCatInd = 1;

window.onload = initialLoad;


const timer = ms => new Promise(res => setTimeout(res, ms))

async function loadImages(isInit) {
    for (let i = 0; i < IMG_SCROLL_COUNT; ++i) {
        if (curImgInd >= IMG_COUNT[currentCatInd]) {
            break;
        }
        let img = document.createElement("img");
        img.className = IMG_CSS_CLASS;
        img.src = IMG_DIR + IMG_DIR_CAT[currentCatInd] + curImgInd + IMG_EXT;
        img.alt = IMG_ALT;
        imgColumns[curColInd].appendChild(img);
        let zoomSrc = IMG_ZOOM_DIR + IMG_DIR_CAT[currentCatInd] + curImgInd + IMG_EXT;
        img.addEventListener("click", () => {
            enableImgZoom(zoomSrc);
        });
        curColInd = curColInd == 0 ? 1 : 0;
        ++curImgInd;
        if (!isInit) {
            await timer(IMG_LOAD_DELAY);
        }
    }
}

function clearImages() {
    imgColumns[0].textContent = "";
    imgColumns[1].textContent = "";
    curImgInd = 0;
    curColInd = 0;
}

function switchCategory(i) {
    if (currentCatInd == i) {
        return;
    }
    clearImages();
    currentCatInd = i;
    loadImages(true);
    catBtns[currentCatInd].classList.add(NAV_SELECTED_CLASS);
    for (let i = 0; i < catBtns.length; ++i) {
        if (i != currentCatInd) {
            catBtns[i].classList.remove(NAV_SELECTED_CLASS);
        }
    }
}

function initialLoad() {
    switchCategory(0);
}



const navOpenBtn = document.getElementById("navOpenBtn");
const navCloseBtn = document.getElementById("navCloseBtn");
const navBar = document.getElementById("navbar");
const navUnderlay = document.getElementById("navUnderlay");

const NAV_SELECTED_CLASS = "nav-selected";
const catBtns = [document.getElementById("catCabinet"),
    document.getElementById("catCountertops"),
    document.getElementById("catHandles")
];
catBtns[0].addEventListener("click", () => {
    switchCategory(0);
});
catBtns[1].addEventListener("click", () => {
    switchCategory(1);
});
catBtns[2].addEventListener("click", () => {
    switchCategory(2);
});

navOpenBtn.addEventListener("click", setNavActive);
navCloseBtn.addEventListener("click", setNavDisable);

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



let imgZoomEnabled = false;
let curZoomIndex = 0;
let zoomPercents = ["100%", "125%", "150%", "200%"];
const imgZoomSrc = document.getElementById("img-zoom-src");
const imgZoomWrapper =  document.getElementById("img-zoom-wrapper");
const imgZoomCloseBtn = document.getElementById("img-zoom-close-btn");
imgZoomCloseBtn.addEventListener("click", () => {
    imgZoomWrapper.style.display = imgZoomEnabled ? "none" : "block";
    imgZoomEnabled = !imgZoomEnabled;
});

imgZoomSrc.addEventListener("click", imgZoom);

function enableImgZoom(source){
    imgZoomEnabled = true;
    imgZoomWrapper.style.display = "block";
    imgZoomSrc.src = source;
    curZoomIndex = 0;
    imgZoomSrc.style.height = zoomPercents[curZoomIndex];
}

function imgZoom(){
    ++curZoomIndex;
    if(curZoomIndex >= zoomPercents.length) {
        curZoomIndex = 0;
    }
    imgZoomSrc.style.height = zoomPercents[curZoomIndex];
}
