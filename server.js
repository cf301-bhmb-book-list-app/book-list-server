'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
// TODO: review superagent what is this? 
// const superagent = require('superagent');


// Application Setup
const app = express();
const PORT = process.env.PORT; //port assignment
// const TOKEN = process.env.TOKEN; // token assignment

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
//  checking with adminView 
app.get('/api/v1/admin', (request, response) => response.send(TOKEN === parseInt(request.query.token)));

// request/response where info comes frm one book
app.get('/api/v1/books/:id', (request, response) => {
  let SQL = `
    SELECT book_id, title, author, image_url, isbn, description
    FROM books WHERE book_id=$1;`;  
  let values = [req.params.id];

  client.query(SQL, values)
    .then(results => response.send(results.rows).status(200))
    .catch(console.error);
});

// Handle the posting of API data to database
app.post('/api/v1/books', (request, response) => {
  let {title, author, isbn, image_url, description} = request.body;

  let SQL = `INSERT INTO books(title, author, isbn, image_url, description) VALUES($1, $2, $3, $4, $5);`;
  let values = [title, author, isbn, image_url, description];

  client.query(SQL, values)
    .then(response.sendStatus(201))
    .catch(console.error);
});

//this should be behind a password
app.put('/api/v1/books/:id', (request, response) => {
  let {title, author, isbn, image_url, description}= request.body;
  let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5 WHERE book_id=$6;`;
  let values = [title, author, isbn, image_url, description, request.params.id];

  client.query(SQL, values)
    .then(response.sendStatus(204))
    .catch(console.error);
});

//this should be behind a password
app.delete('/api/v1/books/:id', (request, response) => {
  let SQL = `DELETE FROM books WHERE book_id=$1;`;
  let values = [request.params.id];

  client.query(SQL, values)
    .then(() => response.sendStatus(204))
    .catch(console.error);
});

// Handle all other bad endpoints
app.get('*', (request, response) => {
  response.status(404).send('404 Error: Page does not exist');
});

// Displays the server listening port (visual cue only)
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));