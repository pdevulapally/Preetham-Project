import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile, updateEmail, updatePassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzSwRJM27Iyay8RYjXDbSeb_CEI7OwdGc",
  authDomain: "ai-detection-tool.firebaseapp.com",
  projectId: "ai-detection-tool",
  storageBucket: "ai-detection-tool.firebasestorage.app",
  messagingSenderId: "70262219338",
  appId: "1:70262219338:web:4cd7ca550d40f3709ffcb3",
  measurementId: "G-SZMLKB4WQG",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const profileImage = document.getElementById("profile-image");
const displayNameInput = document.getElementById("display-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const profileForm = document.getElementById("profile-form");
const updateMessage = document.getElementById("update-message");

// Check if a user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Populate user data
    profileName.textContent = user.displayName || "User Name";
    profileEmail.textContent = user.email || "user@example.com";
    profileImage.style.backgroundImage = user.photoURL
      ? `url(${user.photoURL})`
      : `url('https://via.placeholder.com/120?text=User')`;

    // Pre-fill form inputs
    displayNameInput.value = user.displayName || "";
    emailInput.value = user.email || "";
  } else {
    // Redirect to login page if no user is logged in
    window.location.href = "login.html";
  }
});

// Handle Profile Update
profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newDisplayName = displayNameInput.value.trim();
  const newEmail = emailInput.value.trim();
  const newPassword = passwordInput.value.trim();

  const user = auth.currentUser;

  try {
    // Update display name
    if (newDisplayName && newDisplayName !== user.displayName) {
      await updateProfile(user, { displayName: newDisplayName });
      profileName.textContent = newDisplayName;
    }

    // Update email
    if (newEmail && newEmail !== user.email) {
      await updateEmail(user, newEmail);
      profileEmail.textContent = newEmail;
    }

    // Update password
    if (newPassword) {
      await updatePassword(user, newPassword);
    }

    // Show success message
    updateMessage.textContent = "Profile updated successfully!";
    updateMessage.className = "update-message success";
    updateMessage.style.display = "block";

    // Clear the password field
    passwordInput.value = "";
  } catch (error) {
    // Show error message
    updateMessage.textContent = `Error: ${error.message}`;
    updateMessage.className = "update-message error";
    updateMessage.style.display = "block";
  }

  // Hide the message after 3 seconds
  setTimeout(() => {
    updateMessage.style.display = "none";
  }, 3000);
});
