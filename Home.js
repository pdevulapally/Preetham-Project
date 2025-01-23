document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger-menu');
  const nav = document.querySelector('.nav-menu');
  const body = document.body;

  burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      body.classList.toggle('no-scroll');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
          burger.classList.remove('active');
          nav.classList.remove('active');
          body.classList.remove('no-scroll');
      }
  });

  // Close menu when clicking nav links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          burger.classList.remove('active');
          nav.classList.remove('active');
          body.classList.remove('no-scroll');
      });
  });
});