document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     Theme Switcher Logic
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Load saved theme or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = htmlElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'light') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }

  /* ==========================================================================
     Mobile Navigation Menu Toggle
     ========================================================================== */
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const navbarMenu = document.getElementById('navbar');

  mobileToggleBtn.addEventListener('click', () => {
    mobileToggleBtn.classList.toggle('open');
    navbarMenu.classList.toggle('open');
  });

  // Close mobile menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggleBtn.classList.remove('open');
      navbarMenu.classList.remove('open');
    });
  });

  /* ==========================================================================
     Scroll Progress Indicator & Header Resize
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scroll-progress');
  const mainHeader = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // Update scroll bar progress
    scrollProgressBar.style.width = `${scrollPercentage}%`;

    // Compact header on scroll
    if (scrollTop > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     Dynamic Hero Typing Animation
     ========================================================================== */
  const typingText = document.getElementById('typing-text');
  const titles = ["Bioinformatician", "Computational Biologist", "Meta-Omics Researcher", "DNA Nanotech Enthusiast"];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      typingText.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // faster deletion
    } else {
      typingText.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150; // regular typing
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500; // brief pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* ==========================================================================
     Portfolio Filter Logic
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Manage active state of buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hide');
          // Add subtle fade-in transition
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     Active Link Highlighting on Scroll (Intersection Observer)
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  
  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  /* ==========================================================================
     Scroll Reveal (Fade-in elements entering viewport)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

});
