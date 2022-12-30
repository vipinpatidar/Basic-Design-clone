const featureSection = document.querySelector(".featured-section");
const locomoVideoSection = document.querySelector(".locomo-video-section");
const newsSection = document.querySelector(".news-section");
const viewAllBtn = document.querySelector(".viewall-btn");
const aboutBtn = document.querySelector(".about-btn");
const headerDotsBtn = document.querySelectorAll(".basic-dots-btn span");

// sticky navigation bar

const headerCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    headerOfPage.classList.add("sticky");
    headerOfPage.style.backgroundColor = "#f4f4f4";
    headerDotsBtn.forEach((dotsBtn) => {
      dotsBtn.style.backgroundColor = "#000";
    });
    headerOfPage.style.color = "#252422";
  } else {
    headerOfPage.classList.remove("sticky");
    headerOfPage.style.backgroundColor = "transparent";
    headerOfPage.style.color = "#f4f4f4";
    headerDotsBtn.forEach((dotsBtn) => {
      dotsBtn.style.backgroundColor = "#f4f4f4";
    });
  }
};

headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${86}px`,
};

const headerObserver = new IntersectionObserver(headerCallback, headerOptions);

headerObserver.observe(reelPlaySection);

//? hidding navigation when we scrolling down

let lastScroll = window.scrollY;

function hiddingNavOnScroll() {
  if (lastScroll < window.scrollY) {
    headerOfPage.classList.add("nav--hidding");
  } else {
    headerOfPage.classList.remove("nav--hidding");
  }
  lastScroll = window.scrollY;
}

window.addEventListener("scroll", hiddingNavOnScroll);

// background color to white when we hit the locomo video section end

function blackWhiteBackground(color1, color2) {
  locomoVideoSection.style.backgroundColor = color1;
  locomoVideoSection.style.color = color2;
  newsSection.style.backgroundColor = color1;
  newsSection.style.color = color2;
  featureSection.style.backgroundColor = color1;
  featureSection.style.color = color2;
  headerOfPage.style.backgroundColor = color1;
  headerOfPage.style.color = color2;
}

function locomoSectionCallback(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    blackWhiteBackground("#f4f4f4", "#252422");
    viewAllBtn.classList.remove("viewInDark");
    aboutBtn.classList.remove("aboutInDark");
    headerDotsBtn.forEach((dotsBtn) => {
      dotsBtn.style.backgroundColor = "#000";
    });
  } else {
    blackWhiteBackground("#252422", "#f9cdcd");
    viewAllBtn.classList.add("viewInDark");
    aboutBtn.classList.add("aboutInDark");
    headerDotsBtn.forEach((dotsBtn) => {
      dotsBtn.style.backgroundColor = "#f9cdcd";
    });
  }
  // observer.unobserve(entry.target);
}

const locmoVideoOptions = {
  root: null,
  threshold: 0.23,
  rootMargin: "-136px",
};

const locmoSectionObserver = new IntersectionObserver(
  locomoSectionCallback,
  locmoVideoOptions
);

locmoSectionObserver.observe(locomoVideoSection);

//!changing navigation color when page load

window.addEventListener("load", () => {
  headerOfPage.style.backgroundColor = "transparent";
  headerOfPage.style.color = "#f4f4f4";
  headerDotsBtn.forEach((dotsBtn) => {
    dotsBtn.style.backgroundColor = "#f4f4f4";
  });
});

/*Consts ////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*C ////////////////////////////////////////////////////////////////////////////////////////////////////*/

const internalSection = document.querySelector(".internal-section");
const interSectionBox = document.querySelector(".inter-section-box");
const closeInternalBtn = document.querySelector(".close-internal");
const headerBtn = document.querySelector(".basic-dots-btn");

const movinginterBtn = document.querySelector(".btn-inter-hover");
const onPageinterBtn = document.querySelector(".onPage-inter-circle");
const interSpanDownToUP = document.querySelector(
  ".inter-btn > span:not(.btn-inter-bg):nth-child(2) span"
);
const interSpanUptoUP = document.querySelector(
  ".inter-btn > span:not(.btn-inter-bg):nth-child(1) span"
);
const interBtnSection = document.querySelector(".internal-items");
const interArrows = document.querySelector(".arrows-inter");
const interItem = document.querySelectorAll(".inter-border");

const interLinks = document.querySelectorAll(".inter-link a");
const interLinksBody = document.querySelectorAll(".list-item-project__body");
const interLinksPera = document.querySelectorAll(".list-item-project__body p");

// implementing drag functionality in internal section

function internalDragBtnMove(e) {
  interSpanDownToUP.style.transform = "translateY(0%)";
  interSpanUptoUP.classList.add("fadeText");
  onPageinterBtn.style.opacity = 0;
  movinginterBtn.style.opacity = 1;
  const interRect = interSectionBox.getBoundingClientRect();
  // movinginterBtn.style.top = e.pageY - interSectionBox.offsetTop - 50 + "px";
  // movinginterBtn.style.left = e.pageX - interSectionBox.offsetTop - 50 + "px";
  movinginterBtn.style.top = e.clientY - interRect.top - 50 + "px";
  movinginterBtn.style.left = e.clientX - 135 + "px";
}

interSectionBox.addEventListener("mousemove", internalDragBtnMove);

interSectionBox.addEventListener("mouseout", function () {
  // setTimeout(() => {
  interSpanDownToUP.style.transform = "translateY(100%)";
  interSpanUptoUP.classList.remove("fadeText");
  // }, 200);
  movinginterBtn.style.opacity = 0;
  onPageinterBtn.style.opacity = 1;
});

// show text when button on links
interLinks.forEach((link) => {
  link.addEventListener("mouseover", function (e) {
    document.querySelector(".btn-inter-hover").classList.add("mixBlend");
    document.querySelectorAll(".inter-text-hide").forEach((text) => {
      console.log(text);
      text.classList.add("hide-text");
    });
  });
  link.addEventListener("mouseout", function (e) {
    document.querySelector(".btn-inter-hover").classList.remove("mixBlend");
    document.querySelectorAll(".inter-text-hide").forEach((text) => {
      console.log(text);
      text.classList.remove("hide-text");
    });
  });
});

//! drag functionality implemented

let startPoint;
let scrollLeftDistance;
let isOnScreen;

interBtnSection.addEventListener("mousedown", function (e) {
  interArrows.style.opacity = 1;
  movinginterBtn.classList.add("active");
  isOnScreen = true;
  startPoint = e.pageX - interBtnSection.offsetLeft;

  scrollLeftDistance = interBtnSection.scrollLeft;
});

interBtnSection.addEventListener("mouseup", function (e) {
  isOnScreen = false;
  interArrows.style.opacity = 0;
  movinginterBtn.classList.remove("active");
});

interBtnSection.addEventListener("mousemove", function (e) {
  if (!isOnScreen) return;
  e.preventDefault();
  const dis = e.pageX - interBtnSection.offsetLeft;

  const walkOn = (dis - startPoint) * 3;

  interBtnSection.scrollLeft = scrollLeftDistance - walkOn;
});

// show and hide internal section

headerBtn.addEventListener("click", function () {
  internalSection.style.transform = "translateX(0%)";
  disableScrolling();
});

closeInternalBtn.addEventListener("click", function () {
  internalSection.style.transform = "translateX(100%)";
  enableScrolling();
});

function disableScrolling() {
  const x = window.scrollX;
  const y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}

function enableScrolling() {
  window.onscroll = function () {};
}

// !Mobile related methods

const mobileNavCloseBtn = document.querySelector(".close-mobile-nav");
const mobileNavOpenBtn = document.querySelector(".menu-heading");
const mobileNav = document.querySelector(".mobile-nav");
const mobileShowInter = document.querySelector(".show-internal");
const mobileHideInter = document.querySelector(".inter-mobile-arrow");

mobileNavOpenBtn.addEventListener("click", function () {
  mobileNav.style.transform = "translateX(0%)";
  disableScrolling();
});

mobileNavCloseBtn.addEventListener("click", function () {
  mobileNav.style.transform = "translateX(100%)";
  internalSection.style.transform = "translateX(100%)";
  enableScrolling();
});

// * show internal when we on mobile devices

mobileShowInter.addEventListener("click", function (e) {
  internalSection.style.transform = "translateX(0%)";
  enableScrolling();
});

mobileHideInter.addEventListener("click", function (e) {
  internalSection.style.transform = "translateX(100%)";
});
