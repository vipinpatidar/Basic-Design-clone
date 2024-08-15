"use strict";

const animiLogo = document.querySelector(".animi-logo");
const animiLogoHeading = document.querySelector(".fade-heading");
const movingPlayBtn = document.querySelector(".btn-hover");
const movingDragBtn = document.querySelector(".btn-drag-hover");
const reelPlaySection = document.querySelector(".basic-videos");
const headerOfPage = document.querySelector(".basic-header");
const onPageCircleBtn = document.querySelector(".onPage-circle");
const onPageDragBtn = document.querySelector(".onPage-drag-circle");
const introPageReel = document.querySelector(".intro-home-poster-reel");
const introPageVideo = document.querySelector(".intro-home-video");
const introVideo = document.querySelector(".intro-home-video video");
const playPushBtn = document.querySelector(".reel-btn");
const btnBackGra = document.querySelector(".btn-bg");
const spanDownToUP = document.querySelector(
  ".reel-btn > span:not(.btn-bg):nth-child(2) span"
);
const spanUptoUP = document.querySelector(
  ".reel-btn > span:not(.btn-bg):nth-child(1) span"
);
const dragSpanDownToUP = document.querySelector(
  ".drag-btn > span:not(.btn-drag-bg):nth-child(2) span"
);
const dragSpanUptoUP = document.querySelector(
  ".drag-btn > span:not(.btn-drag-bg):nth-child(1) span"
);
const controlBarTime = document.querySelector(".controlbar-time");
const dragBtnSection = document.querySelector(".drag-drop-section");
const dragArrows = document.querySelector(".arrows-drag");

let time;

// control bar time runing showed

function runTime() {
  // Update transform and text content every 16ms (approximately 60fps)
  time = setInterval(() => {
    const currentTime = introVideo.currentTime;
    const duration = introVideo.duration;
    if (!introVideo.paused) {
      // add a small threshold (0.1 seconds)
      controlBarTime.style.transform = `translateX(${
        (currentTime / duration) * 100
      }%)`;
      controlBarTime.textContent = `00:${Math.floor(currentTime)}/00:59`;
    }
  }, 16);
}

// Putting hover effect and playing reel

//* Moving Reel Btn
const showPlayReelBtn = function (e) {
  spanDownToUP.style.transform = "translateY(0%)";
  spanUptoUP.classList.add("fadeText");
  onPageCircleBtn.style.opacity = 0;
  movingPlayBtn.style.opacity = 1;
  movingPlayBtn.style.top = e?.pageY - 40 + "px";
  movingPlayBtn.style.left = e?.pageX - 40 + "px";
};
//*Opacity
function opacity(element, num) {
  element.style.opacity = `${num}`;
}
// * Scalign btn on click
function scaleBtn() {
  playPushBtn.style.transform = "scale(0.8)";
  btnBackGra.style.zIndex = 2;

  setTimeout(() => {
    playPushBtn.style.transform = "scale(1)";
    opacity(btnBackGra, 0);
    opacity(movingPlayBtn, 0);
    playPushBtn.style.cursor = "auto";
  }, 200);
}

//* Add and remove class
function addAndRemove(element1, element2) {
  element1.classList.add("show");
  element2.classList.remove("show");
}

// * Playing video on Click
const onClickMovingBtn = function () {
  addAndRemove(introPageReel, introPageVideo);

  introVideo.play();
  runTime();
  opacity(headerOfPage, 0);
  opacity(onPageCircleBtn, 0);
  scaleBtn();
  setTimeout(() => {
    introPageVideo.style.zIndex = 3;
  }, 500);
};
//* Stoping video on click
const onClickIntorPageVideo = function () {
  introVideo.pause();
  introVideo.currentTime = 0;
  clearInterval(time);
  controlBarTime.style.transform = `translateX(${0}%)`;
  opacity(movingPlayBtn, 1);
  opacity(headerOfPage, 1);
  addAndRemove(introPageVideo, introPageReel);
  playPushBtn.style.cursor = "none";
  introPageVideo.style.zIndex = 0;
  showPlayReelBtn();
  onPageCircleBtn.style.opacity = 1;
};
introVideo.onended = function () {
  onClickIntorPageVideo();
  opacity(onPageCircleBtn, 1);
  controlBarTime.style.transform = "translateX(100%)";
};

// ! mouse move and mouse leave on Play reel btn

reelPlaySection.addEventListener("mousemove", showPlayReelBtn);
reelPlaySection.addEventListener("mouseleave", function (e) {
  setTimeout(() => {
    spanDownToUP.style.transform = "translateY(100%)";
    spanUptoUP.classList.remove("fadeText");
  }, 200);
  movingPlayBtn.style.opacity = 0;
  onPageCircleBtn.style.opacity = 1;
});

// ! Playing and Pausing video
movingPlayBtn.addEventListener("click", onClickMovingBtn);
introPageVideo.addEventListener("click", onClickIntorPageVideo);
onPageCircleBtn.addEventListener("click", onClickMovingBtn);

const mq = window.matchMedia("(max-width:860px)");

const phone = mq.matches;
if (phone) {
  // mq.addEventListener("change", function () {
  reelPlaySection.removeEventListener("mousemove", showPlayReelBtn);
  // });
}

// Show animation on logo on initially load

window.addEventListener("DOMContentLoaded", function () {
  this.setTimeout(() => {
    this.setTimeout(() => {
      animiLogoHeading.classList.add("active");
    }, 700);
  }, 500);

  this.setTimeout(() => {
    animiLogo.style.top = "-100vh";
  }, 2000);
});

// drag - drop Btn

const showDragBtn = function (e) {
  const rect = dragBtnSection.getBoundingClientRect();
  // console.log(rect.top, rect.right, rect.bottom, rect.left, "mousemove");
  // console.log(e.clientY, "Y", "mouseMove");
  dragSpanDownToUP.style.transform = "translateY(0%)";
  dragSpanUptoUP.classList.add("fadeText");
  onPageDragBtn.style.opacity = 0;
  movingDragBtn.style.opacity = 1;
  movingDragBtn.style.top = e.clientY - rect.top - 40 + "px";
  movingDragBtn.style.left = e.clientX - 118 + "px";
};

dragBtnSection.addEventListener("mousemove", showDragBtn);
dragBtnSection.addEventListener("mouseout", function (e) {
  setTimeout(() => {
    dragSpanDownToUP.style.transform = "translateY(100%)";
    dragSpanUptoUP.classList.remove("fadeText");
  }, 200);
  movingDragBtn.style.opacity = 0;
  onPageDragBtn.style.opacity = 1;
});

// ! implimenting drag and drop system

const dragCompaniesGrid = document.querySelector(".drag-componise-feature");
let isDown = false;
let startX;
let scrollLeftNew;

dragCompaniesGrid.addEventListener("mousedown", function (e) {
  dragArrows.style.opacity = 1;
  movingDragBtn.classList.add("active");
  // flag to check mouse is down or not
  isDown = true;
  // grabing first click position (- offsetleft to remove extra distance of margin if element have so we can get accurate point)
  startX = e.pageX - dragCompaniesGrid.offsetLeft;
  // scrollLeftNew for tracking how far we scroll in left direction and save it
  scrollLeftNew = dragCompaniesGrid.scrollLeft;
});

dragCompaniesGrid.addEventListener("mouseup", (e) => {
  isDown = false;
  dragArrows.style.opacity = 0;
  movingDragBtn.classList.remove("active");
});

dragCompaniesGrid.addEventListener("mousemove", function (e) {
  if (!isDown) return;
  e.preventDefault();
  // x will give us how much we have moved our mouse
  const x = e.pageX - dragCompaniesGrid.offsetLeft;
  // walk will give us how much we have moved our mouse from point startX to x (*3 for fast or smooth scrolling)
  const walk = (x - startX) * 3;
  // reseving scrollleft value and scrolling element to position where walk point is located
  dragCompaniesGrid.scrollLeft = scrollLeftNew - walk;
});
