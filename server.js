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

// API Endpoints
app.get('/api/v1/books', (request, response) => {
  let SQL = `
    SELECT book_id, title, author, image_url, isbn, description
    FROM books;
  `;
  client.query(SQL)
    .then(results => response.send(results.rows))
    .catch(console.error);
});

app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));