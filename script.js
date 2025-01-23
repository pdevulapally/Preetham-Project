import { updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

// FAQ/Verification Tips Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = question.nextElementSibling;
        
        // Toggle active class
        faqItem.classList.toggle('active');
        
        // Toggle answer height
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = 0;
        }
        
        // Rotate icon
        const icon = question.querySelector('i');
        icon.classList.toggle('fa-minus');
        icon.classList.toggle('fa-plus');
    });
});
  