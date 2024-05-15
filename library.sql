CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(25),
    author_id INT,
    category_id INT
);

CREATE TABLE authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25),
    last_name VARCHAR(25)
);

CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(25)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE books
ADD CONSTRAINT fk_author
    FOREIGN KEY (author_id) REFERENCES authors (author_id);

ALTER TABLE books
ADD CONSTRAINT fk_category
    FOREIGN KEY (category_id) REFERENCES book_categories (category_id);

CREATE TABLE loaned_books (
    loan_id INT PRIMARY KEY AUTO_INCREMENT,
    loan_date DATE,
    return_date DATE,
    book_id INT,
    FOREIGN KEY (book_id) REFERENCES books (book_id),
    reader_id INT,
    FOREIGN KEY (users_id) REFERENCES readers (reader_id)
);

ALTER TABLE books 
DROP COLUMN borrowing_id;
