function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
  }
    
    // Logout function (add this if not already defined elsewhere)
    function handleLogout() {
      // This assumes you've defined firebase auth elsewhere
      if (confirm("Are you sure you want to log out?")) {
        firebase.auth().signOut().then(() => {
          window.location.href = "login.html";
        }).catch((error) => {
          console.error("Error logging out:", error);
        });
      }
    }