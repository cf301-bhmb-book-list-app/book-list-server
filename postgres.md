# Create Database
CREATE DATABASE books_app;

# Create Table
CREATE TABLE books (
  book_id SERIAL PRIMARY KEY , 
  title VARCHAR(255),
  author VARCHAR(255),
  image_url VARCHAR(255)
  isbn VARCHAR (255),
  description VARCHAR(255)
);

CREATE TABLE books (book_id SERIAL PRIMARY KEY, title VARCHAR(255), author VARCHAR(255), image_url VARCHAR(255), isbn VARCHAR (255), description VARCHAR(255));

# SQL Injection for JSON Data
INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)  
VALUES (value1, value2, value3,...valueN);

INSERT INTO books (title, author, image_url, isbn, description)
VALUES (
  'Dune',
  'Frank Herbert',
  'ISBN_13 9780441013593',
  'http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  'Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.'
);

## TERMINAL VERSION
INSERT INTO books (title, author, image_url, isbn, description) VALUES ('Dune', 'Frank Herbert', 'ISBN_13 9780441013593', 'http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.');

# Useful Commands
* \c <database> = connect to database
* \dt = display current tables in database
* \l = display current databases in PSQL
* select * from books where false; = returns empty table for viewing column structure