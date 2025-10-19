// Import required modules
const express = require('express');
const axios = require('axios');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});

// Define the /me endpoint
app.get('/me', async (req, res) => {
    try {
        // Fetch a random cat fact from the Cat Facts API
        const catFactResponse = await axios.get('https://catfact.ninja/fact', {
            timeout: 5000 // 5-second timeout
        });
        const catFact = catFactResponse.data.fact;

        // Get the current UTC time in ISO 8601 format
        const timestamp = new Date().toISOString();

        // Define the response object
        const response = {
            status: 'success',
            user: {
                email: 'victorosaikh@gmail.com',
                name: 'Victor Osaikhuiwuomwan',
                stack: 'Node.js/Express'
            },
            timestamp: timestamp, // Fixed syntax
            fact: catFact || 'No cat fact available at this time.'
        };

        // Send the JSON response with status 200
        res.status(200).json(response);
    } catch (error) {
        // Handle errors (e.g., Cat Facts API is down)
        console.error('Error fetching cat fact:', error.message);
        const response = {
            status: 'success',
            user: {
                email: 'victorosaikh@gmail.com',
                name: 'Victor Osaikhuiwuomwan',
                stack: 'Node.js/Express'
            },
            timestamp: new Date().toISOString(),
            fact: 'Failed to fetch a cat fact. Please try again later.'
        };
        res.status(200).json(response);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});