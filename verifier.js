  // Toggle Sidebar Visibility
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
  }

  document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".tutorial-step");
    const progressSteps = document.querySelectorAll(".progress-step");
    const nextButton = document.getElementById("next-tutorial");
    const prevButton = document.getElementById("prev-tutorial");
    const skipButton = document.getElementById("skip-tutorial");
    const overlay = document.getElementById("tutorial-overlay");

    let currentStep = 0;

    // Checks if the tutorial has already been skipped
    function checkTutorialStatus() {
      const tutorialSkipped = localStorage.getItem("tutorialSkipped");
      if (tutorialSkipped === "true") {
        overlay.style.display = "none";
      }
    }

    // Marks the tutorial as skipped
    function markTutorialSkipped() {
      localStorage.setItem("tutorialSkipped", "true");
      overlay.style.display = "none";
    }

    // Function to display the current step
    function showStep(index) {
      steps.forEach((step, idx) => {
        step.classList.toggle("active", idx === index);
        progressSteps[idx].classList.toggle("active", idx <= index);
      });

      prevButton.style.display = index === 0 ? "none" : "inline-block";
      nextButton.textContent = index === steps.length - 1 ? "Finish" : "Next";
    }

    // Next Button Click
    nextButton.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      } else {
        markTutorialSkipped(); // Marks tutorial as skipped when finished
      }
    });

    // Previous Button Click
    prevButton.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });

    // Skip Button Click
    skipButton.addEventListener("click", markTutorialSkipped);

    // Initialize the tutorial
    showStep(currentStep);
    checkTutorialStatus(); // Check skip status on page load
  });

      // Accessibility Widget Functionality
      document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.querySelector('.accessibility-toggle');
        const menu = document.querySelector('.accessibility-menu');
        let fontSize = 16;
  
        // Toggle menu
        toggle.addEventListener('click', () => {
          menu.classList.toggle('active');
        });
  
        // Font size controls
        document.getElementById('font-size-increase').addEventListener('click', () => {
          fontSize = Math.min(fontSize + 2, 24);
          document.body.style.fontSize = `${fontSize}px`;
        });
  
        document.getElementById('font-size-decrease').addEventListener('click', () => {
          fontSize = Math.max(fontSize - 2, 12);
          document.body.style.fontSize = `${fontSize}px`;
        });
  
        // Dyslexia font toggle
        document.getElementById('toggle-dyslexia-font').addEventListener('click', () => {
          document.body.classList.toggle('dyslexia-font');
        });
  
        // High contrast toggle
        document.getElementById('toggle-high-contrast').addEventListener('click', () => {
          document.body.classList.toggle('high-contrast');
        });
  
        // Negative contrast toggle
        document.getElementById('toggle-negative-contrast').addEventListener('click', () => {
          document.body.classList.toggle('negative-contrast');
        });
  
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
          }
        });
      });