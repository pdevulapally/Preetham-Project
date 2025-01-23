// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


app.use(express.static(__dirname));

// ChatGPT API key
const CHATGPT_API_KEY = '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';

// Endpoint to verify news
app.post('/verify', async (req, res) => {
    const { input } = req.body;

    console.log('Received Input:', input);

    if (!input) {
        console.error('Error: No input provided.');
        return res.status(400).json({ error: 'Input is required' });
    }

    try {
  
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
                        content: `Based on the news given to you, check whether it is correct or not based on it's facts. Return the answer in one word i.e. Real or Fake . ${input}`
                    }
                ],
                max_tokens: 500,
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
        console.log('GPT Analysis Result:', analysisResult);

        // Sends back the result to the frontend
        res.json({
            input,
            analysis: analysisResult,
            result: analysisResult
        });

    } catch (error) {
        console.error('Error during verification:', error);
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

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('404 Not Found');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});