
// IGNORE THIS FILE IT IS A DUPLICATE OF SERVER.JS with news api 

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const path = require('path');

// Initialize the app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// API keys (replace with your actual keys)
const NEWS_API_KEY = '87c6939d9075406082319397438550f2';
const CHATGPT_API_KEY = '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';

// Helper function to fetch webpage content
async function fetchWebpageContent(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        return $('body').text(); // Extract text content from the webpage
    } catch (error) {
        console.error('Error fetching webpage content:', error.message);
        throw new Error('Failed to fetch webpage content.');
    }
}

// Endpoint to verify news
app.post('/verify', async (req, res) => {
    const { input } = req.body;

    console.log('Received Input:', input); // Log input

    if (!input) {
        console.error('Error: No input provided.');
        return res.status(400).json({ error: 'Input is required' });
    }

    try {
        let inputContent = input;

        // Check if the input is a URL
        if (input.startsWith('http://') || input.startsWith('https://')) {
            console.log('Input is a URL. Extracting content...');
            inputContent = await fetchWebpageContent(input);
            console.log('Extracted Content:', inputContent); // Log extracted content
        }

        // Step 1: Fetch news data from NewsAPI
        console.log('Fetching news data for:', inputContent);
        const newsResponse = await axios.get(`https://newsapi.org/v2/everything`, {
            params: {
                q: inputContent,
                apiKey: NEWS_API_KEY
            }
        });

        const newsArticles = newsResponse.data.articles;
        console.log('Fetched News Articles:', newsArticles); // Log news articles

        if (newsArticles.length === 0) {
            console.warn('No relevant news articles found.');
            return res.status(404).json({
                message: 'No relevant news articles found for the input.'
            });
        }

        // Step 2: Use GPT-3.5 API to cross-check
        console.log('Sending data to GPT API for analysis...');
        const chatGPTResponse = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an AI assisting in fake news detection.' },
                    { role: 'user', content: `Analyze the following input and news data to determine if the information is fake or real: \n\nInput Content: ${inputContent}\nNews Articles: ${JSON.stringify(newsArticles)}` }
                ],
                max_tokens: 300
            },
            {
                headers: {
                    'Authorization': `Bearer ${CHATGPT_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const analysisResult = chatGPTResponse.data.choices[0]?.message?.content || 'No analysis result available';
        console.log('GPT Analysis Result:', analysisResult); // Log GPT response

        // Step 3: Send back the result
        res.json({
            input,
            extractedContent: input.startsWith('http') ? inputContent : undefined,
            newsArticles,
            analysis: analysisResult,
            result: analysisResult
        });
    } catch (error) {
        console.error('Error during verification:', error); // Log the entire error object
        res.status(500).json({ error: 'An error occurred during verification.' });
    }
});

// Route to serve the login.html file
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Route to serve the home.html file
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
});

// Route to serve the verifier.html file
app.get('/verifier', (req, res) => {
    res.sendFile(path.join(__dirname, 'verifier.html'));
});

// Default route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the AI Fake News Detection API. Use /home, /login, or /verifier for the interface.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
