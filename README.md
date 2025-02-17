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
Before running this project, please install the following:
1. **Node.js** (v18 or later) - [Download Node.js](https://nodejs.org/)
2. **npm** (comes with Node.js)
4. **OpenAI** 

---

## Installation Instructions

### Step 1: Clone the Repository
Open your terminal and run:
git clone https://github.com/pdevulapally/Preetham-Project.git

### Step 2: Install Dependencies
Run the following command to install the required packages:
npm install
This will install the following dependencies:

1) express: A web application framework.
2) body-parser: Middleware for parsing incoming request bodies.
3) axios: For making HTTP requests to the OpenAI API.
4) cors: Middleware to handle Cross-Origin Resource Sharing.
5) path: Node.js module for file path handling (no installation required, as it's built-in).#
6) environment variable : npm install dotenv


Step 3: Start the Server
Run the server with the following command:
node server.js
