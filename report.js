// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzSwRJM27Iyay8RYjXDbSeb_CEI7OwdGc",
    authDomain: "ai-detection-tool.firebaseapp.com",
    projectId: "ai-detection-tool",
    storageBucket: "ai-detection-tool.appspot.com",
    messagingSenderId: "70262219338",
    appId: "1:70262219338:web:4cd7ca550d40f3709ffcb3",
    measurementId: "G-SZMLKB4WQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Add this function to your existing report.js
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reportForm');
    const modal = document.getElementById('successModal');

    // Close modal when clicking the close button
    const closeBtn = modal.querySelector('button');
    closeBtn.onclick = closeModal;

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Check if user is authenticated
        const user = auth.currentUser;
        if (!user) {
            alert("Please sign in to submit a report");
            return;
        }

        try {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Submitting...';

            // Collect form data matching the security rules requirements
            const formData = {
                type: form.reportType.value,
                content: {
                    newsUrl: form.newsUrl.value,
                    description: form.description.value,
                    evidence: form.evidence.value || '',
                    anonymous: form.anonymous.checked
                },
                reportedBy: user.uid,
                timestamp: serverTimestamp(),
                status: 'pending'
            };

            // Add report to Firestore
            const docRef = await addDoc(collection(db, "reports"), formData);
            console.log("Report submitted with ID: ", docRef.id);

            // Show success modal
            modal.classList.add('active');

            // Reset form and button
            form.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;

        } catch (error) {
            console.error("Error submitting report: ", error);
            alert("Error submitting report. Please try again.");
            
            // Reset button state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit Report';
        }
    });
});

// Form validation
const urlInput = document.getElementById('newsUrl');
urlInput.addEventListener('input', function() {
    if (urlInput.validity.typeMismatch) {
        urlInput.setCustomValidity('Please enter a valid URL');
    } else {
        urlInput.setCustomValidity('');
    }
});