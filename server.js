// server.js
const express = require('express');
const dotenv = require('dotenv');
const pool = require('./db'); // Import the database connection pool

// Load the environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Your Express routes go here
// ...



// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
