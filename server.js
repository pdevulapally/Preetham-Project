// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const path = require('path');
require('dotenv').config();

const app = express();

// Environment variables
const {
    PORT = 5000,
    NODE_ENV = 'development',
    CHATGPT_API_KEY,
    OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions',
    OPENAI_MODEL = 'gpt-4o-mini',
    MAX_TOKENS = 1000,
    TEMPERATURE = 1
} = process.env;

// Validate required environment variables
if (!CHATGPT_API_KEY) {
    console.error('Error: CHATGPT_API_KEY is required');
    process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Helper function to fetch webpage content
async function fetchWebpageContent(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        return $('body').text();
    } catch (error) {
        console.error('Error fetching webpage content:', error.message);
        throw new Error('Failed to fetch webpage content.');
    }
}

// Endpoint to verify news
app.post('/verify', async (req, res) => {
    const { input } = req.body;

    console.log('Received Input:', input);

    if (!input) {
        console.error('Error: No input provided.');
        return res.status(400).json({ error: 'Input is required' });
    }

    try {
        let inputContent = input;

        if (input.startsWith('http://') || input.startsWith('https://')) {
            console.log('Input is a URL. Extracting content...');
            inputContent = await fetchWebpageContent(input);
            console.log('Extracted Content:', inputContent);
        }

        console.log('Sending data to GPT API for analysis...');
        const chatGPTResponse = await axios.post(
            OPENAI_API_URL,
            {
                model: OPENAI_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You work as a reporter whose task is to check and verify the news given by the user.'
                    },
                    {
                        role: 'user',
                        content: `Based on the news given to you, check whether it is correct or not based on its facts. Return the answer in one word i.e. Real or Fake. ${inputContent}`
                    }
                ],
                max_tokens: parseInt(MAX_TOKENS),
                temperature: parseFloat(TEMPERATURE)
            },
            {
                headers: {
                    'Authorization': `Bearer ${CHATGPT_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const analysisResult = chatGPTResponse.data.choices[0]?.message?.content || 'No analysis result available';
        console.log('GPT Analysis Result:', analysisResult);

        res.json({
            input,
            extractedContent: input.startsWith('http') ? inputContent : undefined,
            analysis: analysisResult,
            result: analysisResult
        });
    } catch (error) {
        console.error('Error during verification:', error);
        const errorMessage = NODE_ENV === 'development' 
            ? error.message 
            : 'An error occurred during verification.';
        res.status(500).json({ error: errorMessage });
    }
});

// Routes for all pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'verifier.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/verifier', (req, res) => {
    res.sendFile(path.join(__dirname, 'verifier.html'));
});

app.get('/report', (req, res) => {
    res.sendFile(path.join(__dirname, 'report.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, 'history.html'));
});

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const errorMessage = NODE_ENV === 'development' 
        ? err.stack 
        : 'Something broke!';
    res.status(500).send(errorMessage);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on http://localhost:${PORT}`);
});
