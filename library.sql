CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    info TEXT
);

CREATE TABLE author (
    id_author INT PRIMARY KEY AUTO_INCREMENT, 
    author_name VARCHAR(25) NOT NULL,
    author_surname VARCHAR(25) NOT NULL
);

CREATE TABLE book_category (
    id_category INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(25) NOT NULL
);

CREATE TABLE readers (
    id_reader INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL
);

CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

ALTER TABLE books
ADD COLUMN id_author INT,
ADD COLUMN id_category INT;

ALTER TABLE books
ADD CONSTRAINT fk_author
    FOREIGN KEY(id_author) REFERENCES author(id_author);

ALTER TABLE books
ADD CONSTRAINT fk_category
    FOREIGN KEY(id_category) REFERENCES book_category(id_category);

CREATE TABLE borrowings (
    id_borrowing INT PRIMARY KEY AUTO_INCREMENT,
    borrowing_date DATE,
    return_date DATE,
    id_book INT,
    id_reader INT,
    FOREIGN KEY(id_book) REFERENCES books(id),
    FOREIGN KEY(id_reader) REFERENCES readers(id_reader)
);

ALTER TABLE books 
DROP COLUMN id_borrowing;
