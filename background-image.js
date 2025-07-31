document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slides');
  let currentSlide = 0;

  function showNextSlide() {
    slides[currentSlide].classList.remove('current');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('current');
  }

  // Set interval for changing slides (e.g., every 3 seconds)
  setInterval(showNextSlide, 3000);
});