# Book Management System

## Introduction
This Node.js application is a Book Management System designed to facilitate CRUD operations on a collection of books, manage loan transactions, and provide user authentication. It utilizes the Express framework for handling HTTP requests, interacts with a MySQL database for data storage, and implements user authentication using JWT tokens.

## Setup and Configuration
1. Ensure Node.js and npm are installed on your system.
2. Install dependencies by running `npm install`.
3. Set up a MySQL database and configure connection parameters in a `.env` file based on `.env.example`.
4. Start the application with `npm start`.

## Endpoints

### 1. `/status` (GET)
- Description: Checks the status of the database connection.
- Response:
  - `200 OK`: If the database connection is active.
  - `500 Internal Server Error`: If the database connection fails.

### 2. `/data` (POST)
- Description: Inserts a new book into the database.
- Request Body:
  - `title`: Title of the book (required).
  - `author`: Author of the book (required).
  - `category`: Category of the book (required).
  - `info`: Additional information about the book.
- Response:
  - `200 OK`: If the data insertion is successful.
  - `400 Bad Request`: If required data is missing in the request body.
  - `500 Internal Server Error`: If an error occurs during data insertion.

### 3. `/data` (GET)
- Description: Retrieves all books from the database.
- Response:
  - `200 OK`: Returns an array of books.
  - `500 Internal Server Error`: If an error occurs during data retrieval.

### 4. `/data/author/:author` (GET)
- Description: Retrieves books by a specific author.
- Request Parameter:
  - `author`: Name of the author.
- Response:
  - `200 OK`: Returns an array of books by the specified author.
  - `500 Internal Server Error`: If an error occurs during data retrieval.

### 5. `/data/category/:category` (GET)
- Description: Retrieves books by a specific category.
- Request Parameter:
  - `category`: Category of the books.
- Response:
  - `200 OK`: Returns an array of books in the specified category.
  - `500 Internal Server Error`: If an error occurs during data retrieval.

### 6. `/data/loaned/:bookId` (GET)
- Description: Checks if a book is currently loaned and provides loan information.
- Request Parameter:
  - `bookId`: ID of the book.
- Response:
  - `200 OK`: Returns loan information if the book is loaned.
  - `200 OK`: Returns `{ "loaned": false }` if the book is not loaned.
  - `500 Internal Server Error`: If an error occurs during data retrieval.

### 7. `/data/loan` (POST)
- Description: Records a loan transaction for a book.
- Request Body:
  - `book_id`: ID of the book (required).
  - `loaned_to`: Name of the person to whom the book is loaned (required).
  - `loan_date`: Date of the loan (required).
- Response:
  - `200 OK`: If the loan transaction is successful.
  - `400 Bad Request`: If required data is missing in the request body.
  - `500 Internal Server Error`: If an error occurs during the loan transaction.

### 8. `/data/loan/:bookId` (DELETE)
- Description: Removes a loan record for a specific book.
- Request Parameter:
  - `bookId`: ID of the book.
- Response:
  - `200 OK`: If the book is successfully returned.
  - `404 Not Found`: If the book is not found.
  - `500 Internal Server Error`: If an error occurs during the return transaction.

### 9. `/register` (POST)
- Description: Registers a new user.
- Request Body:
  - `username`: Username of the user.
  - `password`: Password of the user.
- Response:
  - `200 OK`: If registration is successful.
  - `400 Bad Request`: If username or password is missing.
  - `500 Internal Server Error`: If an error occurs during registration.

### 10. `/login` (POST)
- Description: Authenticates a user and generates a JWT token.
- Request Body:
  - `username`: Username of the user.
  - `password`: Password of the user.
- Response:
  - `200 OK`: If login is successful, returns a JWT token.
  - `400 Bad Request`: If username or password is missing or invalid.
  - `500 Internal Server Error`: If an error occurs during login.

### 11. `/loans` (GET)
- Description: Retrieves books loaned by the authenticated user within the last 90 days.
- Authentication: Requires a valid JWT token in the `Authorization` header.
- Response:
  - `200 OK`: Returns an array of loaned books with their titles and loan dates.
  - `403 Forbidden`: If no token is provided.
  - `500 Internal Server Error`: If an error occurs during data retrieval.

## Conclusion
This documentation provides an overview of the application's architecture, endpoints, and functionality, including user authentication and loan tracking features. By following the setup instructions and understanding the defined endpoints, users can effectively utilize and interact with the Book Management System.
