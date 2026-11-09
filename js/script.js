const carousel = document.querySelector(".portfolio_carousel");
const slides = [...document.querySelectorAll(".portfolio_slide")];
const dots = [...document.querySelectorAll(".portfolio_dot")];
const previousButton = document.querySelector(".portfolio_previous");
const nextButton = document.querySelector(".portfolio_next");
const count = document.querySelector(".portfolio_count");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeSlide = 0;
let autoplayTimer;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.hidden = !isActive;
    slide.setAttribute("aria-label", `${slideIndex + 1} / ${slides.length}`);
    dots[slideIndex].setAttribute("aria-current", String(isActive));
  });

  count.textContent = `${String(activeSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
}

function startAutoplay() {
  stopAutoplay();

  if (
    !prefersReducedMotion.matches &&
    !document.hidden &&
    !carousel.matches(":hover") &&
    !carousel.contains(document.activeElement)
  ) {
    autoplayTimer = window.setInterval(() => showSlide(activeSlide + 1), 5000);
  }
}

previousButton.addEventListener("click", () => {
  showSlide(activeSlide - 1);
  startAutoplay();
});

nextButton.addEventListener("click", () => {
  showSlide(activeSlide + 1);
  startAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startAutoplay();
  });
});

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);
carousel.addEventListener("focusin", stopAutoplay);
carousel.addEventListener("focusout", (event) => {
  if (!carousel.contains(event.relatedTarget)) {
    startAutoplay();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});

prefersReducedMotion.addEventListener("change", startAutoplay);

showSlide(activeSlide);
startAutoplay();