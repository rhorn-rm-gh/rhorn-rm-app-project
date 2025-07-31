document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slides');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  let currentSlide = 0;
  let slideInterval;

  // Initialize slideshow
  function initSlideshow() {
    if (slides.length === 0) return;
    
    showSlide(0);
    startAutoSlide();
    
    // Add event listeners for manual controls
    if (prevBtn) prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      previousSlide();
      startAutoSlide();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
    
    // Add event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
      });
    });
    
    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
      slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
      slideshowContainer.addEventListener('mouseleave', startAutoSlide);
    }
  }

  function showSlide(index) {
    // Remove current class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('current'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add current class to selected slide and indicator
    if (slides[index]) {
      slides[index].classList.add('current');
      currentSlide = index;
    }
    
    if (indicators[index]) {
      indicators[index].classList.add('active');
    }
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function previousSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startAutoSlide() {
    if (slides.length <= 1) return;
    slideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Mobile menu toggle
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Update aria-expanded attribute
      const isExpanded = navMenu.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    navMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', false);
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', false);
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Initialize everything
  initSlideshow();
  
  // Handle visibility change (pause slideshow when tab is not visible)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });
});
