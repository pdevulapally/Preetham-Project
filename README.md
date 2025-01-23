# AI Fake News Verifier

This project is a Node.js-based web application designed to verify the authenticity of news articles. It uses the OpenAI GPT API to analyze user-provided news and classify it as **Real** or **Fake**.

---

## Features
- Verifies news articles using AI-powered analysis.
- Integrates with OpenAI GPT API for intelligent news verification.
- Includes multiple frontend pages:
  - **Home**: Welcome page.
  - **Verifier**: Main tool to verify news.
  - **Login**: User login page.
  - **Report**: Generates reports based on verification.
  - **About**: Information about the application.
  - **Contact**: Contact form for user inquiries.
  - **History**: Displays the user's verification history. (incomplete and unecessary)
- Provides user-friendly error handling with 404 and other error pages.

---

## Prerequisites
Before running this project, ensure you have the following installed on your system:
1. **Node.js** (v18 or later) - [Download Node.js](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Git** - [Download Git](https://git-scm.com/)
4. **OpenAI GPT API Key** 

---

## Installation Instructions

### Step 1: Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/pdevulapally/Preetham-Project.git

### Step 2: Install Dependencies
Run the following command to install the required packages:
npm install
This will install the following dependencies:

express: A web application framework.
body-parser: Middleware for parsing incoming request bodies.
axios: For making HTTP requests to the OpenAI API.
cors: Middleware to handle Cross-Origin Resource Sharing.
path: Node.js module for file path handling (no installation required, as it's built-in).


Step 3: Start the Server
Run the server with the following command:
node server.js
