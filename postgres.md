CREATE DATABASE books_app;

CREATE TABLE books_app (
  book_id SERIAL PRIMARY KEY , 
  title VARCHAR(255),
  author VARCHAR(255),
  image_url VARCHAR(255)
  isbn VARCHAR (255),
  description VARCHAR(255)
);



 CREATE TABLE books_app (book_id SERIAL PRIMARY KEY , title VARCHAR(255), author VARCHAR(255),image_url VARCHAR(255), isbn VARCHAR (255), description VARCHAR(255));
