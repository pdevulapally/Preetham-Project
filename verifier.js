document.addEventListener("DOMContentLoaded", () => {
  const verifyButton = document.getElementById("verify-button");
  const newsInput = document.getElementById("news-input");
  const loadingGif = document.getElementById("loading-gif");
  const resultsContent = document.getElementById("results-content");

  /**
   * Display the loading animation while processing the request.
   */
  function showLoading() {
    loadingGif.style.display = "block"; // Show the loading GIF
    resultsContent.style.display = "none"; // Hide results while loading
    resultsContent.innerHTML = ""; // Clear any previous content
  }

  /**
   * Hide the loading animation and display the result content.
   * @param {string} resultHtml - HTML content to display in the results section.
   */
  function hideLoading(resultHtml) {
    loadingGif.style.display = "none"; // Hide the loading GIF
    resultsContent.style.display = "block"; // Show the results
    resultsContent.innerHTML = resultHtml; // Insert the result content
  }

  /**
   * Handles the verification process by sending a POST request to the backend.
   */
  async function verifyNews() {
    const newsText = newsInput.value.trim();

    if (!newsText) {
      alert("Please enter a news URL or text."); // Alert if input is empty
      return;
    }

    showLoading(); // Show loading animation

    try {
      // Send POST request to the backend server
      const response = await fetch("http://127.0.0.1:3000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ news_article: newsText }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON response

      // Validate if the response has expected properties
      if (!data.result || !data.relatedArticles) {
        throw new Error("Invalid response from the server");
      }

      // Create the result HTML
      const resultHtml = `
        <p><strong>Analysis:</strong> ${data.result}</p>
        <h3>Related Articles:</h3>
        <ul>
          ${data.relatedArticles
            .map(
              (article) =>
                `<li><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></li>`
            )
            .join("")}
        </ul>
        <p><em>Verified on: ${data.timestamp}</em></p>
      `;

      hideLoading(resultHtml); // Hide loading and display results
    } catch (error) {
      console.error("Error verifying news:", error); // Log the error for debugging

      // Show a detailed error message to the user
      const errorMessage =
        error.message === "Failed to fetch"
          ? "Unable to connect to the server. Please ensure the server is running and try again."
          : `An error occurred: ${error.message}`;
      hideLoading(`<p>${errorMessage}</p>`);
    }
  }

  // Attach the click event listener to the Verify Now button
  verifyButton.addEventListener("click", verifyNews);
});
