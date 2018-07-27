'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT; //port assignment

// Database Setup
let conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(cors());

// API Endpoint
app.get('/api/v1/books', (request, response) => {
  let SQL = `
    SELECT book_id, title, author, image_url, isbn, description
    FROM books;
  `;
  client.query(SQL)
    .then(results => response.send(results.rows).status(200))
    .catch(console.error);
});

// Handle all other bad endpoints
app.get('*', (request, response) => {
  response.status(404).send('404 Error: Page does not exist');
});

// Displays the server listening port (visual cue only)
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));