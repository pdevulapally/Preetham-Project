// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// API key for GPT
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

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

        // Using  GPT-4o-mini API to analyze the input content
        console.log('Sending data to GPT API for analysis...');
        const chatGPTResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
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
                max_tokens: 1000,
                temperature: 1
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

        // Sends back the result
        res.json({
            input,
            extractedContent: input.startsWith('http') ? inputContent : undefined,
            analysis: analysisResult,
            result: analysisResult
        });
    } catch (error) {
        console.error('Error during verification:', error); // Log the entire error object
        res.status(500).json({ error: 'An error occurred during verification.' });
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
    res.status(500).send('Something broke!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
