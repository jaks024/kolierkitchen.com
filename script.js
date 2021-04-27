var isMobile = false; //initiate as false
// device detection
checkMobile();
function checkMobile() {
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    } else {
        isMobile = false;
    }
}

const content = document.getElementById("content");

let curImgInd = 0;
let curColInd = 0;
const sbcontent = document.getElementById("scroll-detect");
sbcontent.addEventListener('scroll', dynamicLoadImage);

 function dynamicLoadImage(){
    if (!isLoadingImages && 
        sbcontent.scrollTop > 0.8 * imgColumns[0].offsetHeight  - content.offsetHeight) {
        loadImages();
    }
}


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
const IMG_DIR_CAT = ["finished_works/", "countertops/", "handles/", "hardwood/", "gloss/", "accessories/"];
const IMG_EXT = ".webp";
const IMG_COUNT = [96, 33, 8, 18, 3, 13];
const IMG_LOAD_DELAY = 150;
const IMG_SCROLL_COUNT = 15;

var currentCatInd = 1;
var isLoadingImages = false;

window.onload = initialLoad;


const timer = ms => new Promise(res => setTimeout(res, ms))

async function loadImages() {
    for (let i = 0; i < IMG_SCROLL_COUNT; ++i) {
        isLoadingImages = true;
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
        await timer(IMG_LOAD_DELAY);
    }
    isLoadingImages = false;
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
    loadImages();
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
    document.getElementById("catHandles"),
    document.getElementById("catHardwood"),
    document.getElementById("catGloss"),
    document.getElementById("catAccessories")
];

for (let i = 0; i < catBtns.length; ++i) {
catBtns[i].addEventListener("click", () => {
    switchCategory(i);
});
}

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


let resettedZoom = false;
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
    checkMobile();
    console.log(isMobile);
    if (!isMobile && imgZoomWrapper.offsetWidth > 550) {
        imgZoomSrc.style.height = zoomPercents[curZoomIndex];
        imgZoomSrc.style.width = "auto";
    } else {
        imgZoomSrc.style = "";
    }
}

function imgZoom(){
    
    checkMobile();
    console.log(isMobile);
    if (isMobile || (!isMobile && imgZoomWrapper.offsetWidth <= 550)) {
        resetZoom();
        return;
    }
    resettedZoom = false;
    ++curZoomIndex;
    if(curZoomIndex >= zoomPercents.length) {
        curZoomIndex = 0;
    }
    imgZoomSrc.style.height = zoomPercents[curZoomIndex];
}

function resetZoom(){
    if (!resettedZoom) {
        console.log("resetting");
        imgZoomSrc.style = "";
        curZoomIndex = 0;
        resettedZoom = true;
    }
}
   
new ResizeObserver(resetZoom).observe(imgZoomWrapper)