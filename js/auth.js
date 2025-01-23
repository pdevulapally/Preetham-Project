const auth = firebase.auth();
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userProfile = document.querySelector('.user-profile');
const userProfileImg = document.getElementById('userProfileImg');

// Google Sign In
loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .catch(error => console.error(error));
});

// Sign Out
logoutBtn.addEventListener('click', () => {
    auth.signOut()
        .catch(error => console.error(error));
});

// Auth State Changes
auth.onAuthStateChanged(user => {
    if (user) {
        loginBtn.classList.add('hidden');
        userProfile.classList.remove('hidden');
        userProfileImg.src = user.photoURL || 'assets/images/default-avatar.png';
    } else {
        loginBtn.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
}); 