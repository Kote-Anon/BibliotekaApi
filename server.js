const express = require('express');
const mysql = require('mysql');
const handleAccount = require('./handleAccount');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/account', handleAccount);

app.post('/data', (req, res) => {
    const { title, author, category, info } = req.body;
    if (!title || !author || !category) {
        return res.status(400).json({ error: 'Missing data' });
    }
    const query = 'INSERT INTO books (title, author, category, info) VALUES (?, ?, ?, ?)';
    pool.query(query, [title, author, category, info], (error, results) => {
        if (error) {
            console.error('Error inserting data: ' + error.stack);
            return res.status(500).json({ error: 'Error inserting data' });
        }
        res.status(200).json({ success: true, message: 'Data inserted successfully' });
    });
});

app.get('/data', (req, res) => {
    const query = 'SELECT * FROM books';
    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving data: ' + error.stack);
            return res.status(500).json({ error: 'Error retrieving data' });
        }
        res.status(200).json(results);
    });
});

app.get('/data/author/:author', (req, res) => {
    const { author } = req.params;
    const query = 'SELECT * FROM books WHERE author = ?';
    pool.query(query, [author], (error, results) => {
        if (error) {
            console.error('Error retrieving data: ' + error.stack);
            return res.status(500).json({ error: 'Error retrieving data' });
        }
        res.status(200).json(results);
    });
});

app.get('/data/category/:category', (req, res) => {
    const { category } = req.params;
    const query = 'SELECT * FROM books WHERE category = ?';
    pool.query(query, [category], (error, results) => {
        if (error) {
            console.error('Error retrieving data: ' + error.stack);
            return res.status(500).json({ error: 'Error retrieving data' });
        }
        res.status(200).json(results);
    });
});

app.get('/data/loaned/:bookId', (req, res) => {
    const { bookId } = req.params;
    const query = 'SELECT * FROM loaned_books WHERE book_id = ?';
    pool.query(query, [bookId], (error, results) => {
        if (error) {
            console.error('Error retrieving loan data: ' + error.stack);
            return res.status(500).json({ error: 'Error retrieving loan data' });
        }
        if (results.length > 0) {
            res.status(200).json({ loaned: true, loaned_to: results[0].loaned_to, loan_date: results[0].loan_date });
        } else {
            res.status(200).json({ loaned: false });
        }
    });
});

app.post('/data/loan', (req, res) => {
    const { book_id, loaned_to, loan_date } = req.body;
    if (!book_id || !loaned_to || !loan_date) {
        return res.status(400).json({ error: 'Missing data' });
    }
    const query = 'INSERT INTO loaned_books (book_id, loaned_to, loan_date) VALUES (?, ?, ?)';
    pool.query(query, [book_id, loaned_to, loan_date], (error, results) => {
        if (error) {
            console.error('Error loaning book: ' + error.stack);
            return res.status(500).json({ error: 'Error loaning book' });
        }
        res.status(200).json({ success: true, message: 'Book loaned successfully' });
    });
});

app.delete('/data/loan/:bookId', (req, res) => {
    const { bookId } = req.params;
    const query = 'DELETE FROM loaned_books WHERE book_id = ?';
    pool.query(query, [bookId], (error, results) => {
        if (error) {
            console.error('Error returning loaned book: ' + error.stack);
            return res.status(500).json({ error: 'Error returning loaned book' });
        }
        if (results.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Book returned successfully' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        pool.end((err) => {
            if (err) {
                console.error('Error closing MySQL pool: ' + err.stack);
            } else {
                console.log('MySQL pool closed');
            }
        });
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
