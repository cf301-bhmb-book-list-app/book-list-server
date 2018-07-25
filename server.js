'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;

let conString = '';
if (process.platform === 'win32') {
  //windows
  conString = 'postgres://localhost:5432/books_app';
} else if (process.platform === 'darwin') {
  //mac
  conString = 'postgres://localhost:5432';
} else if (process.platform === 'linux') {
  //linux
  conString = 'postgres://localhost:5432';
} else {
  console.log('Unsupported OS for database connectivity. Please add variable.');
}

const client = new pg.Client(conString);

// app.get('/', (req,res) => res.send('Testing 1, 2, 3'));
// app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

const client = new pg.Client(process.env.DATABASE.url);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/tasks', (request, response) => {
    let SQL = `SELECT * FROM books_app;`;
    
    client.query(SQL)
      .then(results => res.send(results.rows))
      .catch(console.error);
  });
  
  app.get('*', (request, response) => res.status(403).send('This route does not exist'));
  
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  
  // PORT=3000
  
  // Mac:
  // DATABASE_URL=postgres://localhost:5432/task_app
  
  // Windows:
  // DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/task_app