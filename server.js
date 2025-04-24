const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files (CSS, JS, images) from the root directory
app.use(express.static(path.join(__dirname)));

// Serve HTML pages
const pages = [
  { route: "/", file: "verifier.html" },
  { route: "/home", file: "Home.html" },
  { route: "/login", file: "login.html" },
  { route: "/verifier", file: "verifier.html" },
  { route: "/report", file: "report.html" },
  { route: "/about", file: "about.html" },
  { route: "/contact", file: "contact.html" },
  { route: "/history", file: "history.html" },
  { route: "/admin", file: "admin.html" },
  { route: "/admin-login", file: "admin-login.html" }

  //#endregion


];

pages.forEach(({ route, file }) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

// News Verification API Endpoint
app.post("/verify", async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "News input is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-search-preview",
      messages: [
        { 
          role: "system", 
          content: `You are an AI assistant specialized in news verification. For each analysis, you must provide:
          1. A clear verdict (Likely Real/Likely Fake)
          2. A confidence percentage (always include a number between 0-100)
          3. Detailed explanation
          4. Sources checked` 
        },
        { role: "user", content: `Verify this news: ${input}` },
      ],
    });

    const aiResponse = completion.choices[0].message.content;
    
    // Extract confidence from AI response
    const confidenceMatch = aiResponse.match(/confidence:?\s*(\d+)/i) || aiResponse.match(/(\d+)%/);
    const confidence = confidenceMatch ? `${confidenceMatch[1]}%` : "75%"; // Default to 75% if no match

    res.json({
      result: {
        verdict: aiResponse.toLowerCase().includes("fake") ? "Likely Fake" : "Likely Real",
        confidence: confidence,
        latestUpdate: new Date().toISOString().split("T")[0],
        sourcesChecked: extractSources(aiResponse),
        explanation: aiResponse,
      }
    });
  } catch (error) {
    console.error("Error verifying news:", error);
    res.status(500).json({ error: "Something went wrong while verifying news." });
  }
});

// Helper function to extract sources from AI response
function extractSources(response) {
  const sources = response.match(/(?:https?:\/\/[^\s]+)/g) || [];
  return sources.map(url => {
    // Clean up the URL by removing trailing parentheses and brackets
    return url.replace(/[\)\]]+$/, '');
  }).filter(url => url.length > 0) || ["AI analysis based on available information"];
}

// 404 Error Handling for Undefined Routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
