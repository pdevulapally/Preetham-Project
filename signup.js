import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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
const auth = getAuth(app);

// Function to validate password
function isPasswordValid(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

// Password validation function
function updatePasswordInstruction() {
  const password = document.querySelector('#signup-password').value;

  // Check each requirement
  const lengthRequirement = password.length >= 8;
  const uppercaseRequirement = /[A-Z]/.test(password);
  const lowercaseRequirement = /[a-z]/.test(password);
  const numberRequirement = /\d/.test(password);
  const specialRequirement = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Update styles based on requirements
  updateRequirementStyle('length-requirement', lengthRequirement);
  updateRequirementStyle('uppercase-requirement', uppercaseRequirement);
  updateRequirementStyle('lowercase-requirement', lowercaseRequirement);
  updateRequirementStyle('number-requirement', numberRequirement);
  updateRequirementStyle('special-requirement', specialRequirement);
}

// Helper function to update the style of each requirement
function updateRequirementStyle(elementId, isValid) {
  const element = document.getElementById(elementId);
  if (isValid) {
    element.style.color = '#00d1b2'; // Green for valid
  } else {
    element.style.color = '#ff6b6b'; // Red for invalid
  }
}

// Sign-Up Form Handler
document.querySelector('.signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;

  console.log('Sign Up button clicked');
  console.log('Email:', email);
  console.log('Password:', password);

  if (!isPasswordValid(password)) {
    alert('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Account created:', user);
      alert('Account created successfully!');
      window.location.href = 'login.html'; // Redirect to login
    })
    .catch((error) => {
      console.error('Error creating account:', error.message);
      alert('Error: ' + error.message);
    });
});

// Attach event listener to password input
document.querySelector('#signup-password').addEventListener('input', updatePasswordInstruction);
