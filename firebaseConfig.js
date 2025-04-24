// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// Firebase configuration (replace with environment variables)
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

export { app, auth };
