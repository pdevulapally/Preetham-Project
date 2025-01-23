import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzSwRJM27Iyay8RYjXDbSeb_CEI7OwdGc",
  authDomain: "ai-detection-tool.firebaseapp.com",
  projectId: "ai-detection-tool",
  storageBucket: "ai-detection-tool.appspot.com",
  messagingSenderId: "70262219338",
  appId: "1:70262219338:web:4cd7ca550d40f3709ffcb3",
  measurementId: "G-SZMLKB4WQG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to display messages
function displayMessage(message, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.style.display = 'block';
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
}

// Email/Password Login
document.querySelector('.login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Logged in:', userCredential.user);
      window.location.href = 'verifier.html'; // Directly redirect
    })
    .catch((error) => {
      console.error(error.message);
      displayMessage('Error: ' + error.message, 'error');
    });
});

// Google Sign-In
document.getElementById('google-sign-in').addEventListener('click', () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Google Sign-In successful:', result.user);
      window.location.href = 'verifier.html'; // Directly redirect
    })
    .catch((error) => {
      console.error('Google Sign-In error:', error.message);
      displayMessage('Google Sign-In failed. Please try again.', 'error');
    });
});

// Forgot Password
document.getElementById('forgot-password').addEventListener('click', () => {
  const forgotPasswordModal = document.getElementById('forgotpassword');
  if (forgotPasswordModal) {
    forgotPasswordModal.style.display = 'flex';
  }
});

document.getElementById('forgot-password-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value;

  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        displayMessage(`Password reset email sent to ${email}. Please check your inbox.`, 'success');
        closeForgotPassword();
      })
      .catch((error) => {
        console.error('Password Reset error:', error.message);
        displayMessage('Error: ' + error.message, 'error');
      });
  } else {
    displayMessage("Email address is required for password reset.", 'error');
  }
});

// Function to close the forgot password modal
function closeForgotPassword() {
  const modal = document.getElementById('forgotpassword');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Add event listener for the close button
document
  .querySelector('.close-forgotpassword')
  .addEventListener('click', closeForgotPassword);

// Handle modal click outside to close
window.addEventListener('click', (e) => {
  const modal = document.getElementById('forgotpassword');
  if (modal && e.target === modal) {
    closeForgotPassword();
  }
});
