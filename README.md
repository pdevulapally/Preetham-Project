AI Fake News Detection Website
Student: Preetham Devulapally
Student ID: W1887103
Project: Final Year Project – University of Westminster
Supervisor: Klaus Draeger
Submission: April 2025

**Project Overview**
This project is a real-time AI-based fake news detection website that uses OpenAI’s GPT-4o (Search Preview) model to evaluate the credibility of news headlines or URLs. Users receive a verdict, confidence level, explanation, and verified sources.

**Requirements**
Before running the project, ensure you have the following installed:

**Node.js (v18+ recommended)**

An OpenAI API key with access to gpt-4o-search-preview in the .env file 

A modern browser (e.g. Chrome, Firefox)

**Step-by-Step Setup Instructions**
1. 🔓 Extract the ZIP File
After downloading w1887103_AI-Fake-news-project.zip, extract it to any folder on your local computer.

2. **Open Terminal in your preffered code editor**
Navigate to the extracted folder:

cd path/to/extracted/project

3.  **Install Dependencies**
Run the following command to install required packages:

**npm install**

This will install express, cors, dotenv, and openai.


4. **Start the Server**
Launch the application by running:

**node server.js**

You should see:
Server running on http://localhost:5000

🌐 Access the Website
Once the server is running, open your browser and go to:

**http://localhost:5000**


**5. Create account and login**

From there, you can:

Paste a news headline or URL

Click the "Verify Now" button

View results: Verdict, Confidence %, Explanation, and Sources

📁 Project Pages
Page	URL	Description
Verifier Page	/ or /verifier	Main page to check fake news
Home	/home	Homepage introduction
Login	/login	User login
Report	/report	User can report news items
About	/about	About the platform
Contact	/contact	Contact form
History	/history	View past verified results
Admin Panel	/admin	Admin dashboard
Admin Login	/admin-login	Login page for admin

💬 How It Works
User inputs a headline or URL

Request is sent to OpenAI GPT-4o using a structured prompt

GPT-4o does real-time web lookups

It returns:

Verdict (Likely Real or Likely Fake)

Confidence %

Detailed Explanation

Sources Checked

The result is displayed on the page

🔒 Notes for Examiners
No database is required for testing basic functionality.

Firebase auth and history saving are built in but optional to test.

Internet connection is required for GPT-4o real-time verification.

❗ Troubleshooting
Server not starting?

Make sure Node.js is installed (node -v)

Check if your .env file is correctly formatted

No response from GPT?

Confirm the OpenAI API key is valid and has GPT-4o access

HTML pages not loading?

Ensure static files are in the same folder as server.js

📫 Contact
If you face any issues while reviewing this project, please contact:

Preetham Devulapally
Email: w1887103@my.westminster.ac.uk 
Student ID: W1887103

