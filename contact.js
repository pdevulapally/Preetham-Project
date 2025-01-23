document.addEventListener('DOMContentLoaded', () => {
    // Existing Firebase code...

    // Burger Menu Functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzSwRJM27Iyay8RYjXDbSeb_CEI7OwdGc",
    authDomain: "ai-detection-tool.firebaseapp.com",
    projectId: "ai-detection-tool",
    storageBucket: "ai-detection-tool.firebasestorage.app",
    messagingSenderId: "70262219338",
    appId: "1:70262219338:web:4cd7ca550d40f3709ffcb3",
    measurementId: "G-SZMLKB4WQG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value,
            timestamp: new Date().toISOString()
        };

        try {
            await addDoc(collection(db, "contact_submissions"), formData);
            alert("Message sent successfully!");
            contactForm.reset();
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Error sending message. Please try again.");
        }
    });
});