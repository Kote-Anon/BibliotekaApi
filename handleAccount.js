const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const router = express.Router();
router.use(express.json());

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        pool.query(query, [username, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error registering user: ' + error.stack);
                return res.status(500).json({ error: 'Error registering user' });
            }
            res.status(200).json({ success: true, message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error hashing password: ' + error.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    pool.query(query, [username], async (error, results) => {
        if (error) {
            console.error('Error fetching user: ' + error.stack);
            return res.status(500).json({ error: 'Error logging in' });
        }
        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = generateToken(user);
        res.status(200).json({ success: true, token });
    });
});

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};

router.get('/loans', authenticate, (req, res) => {
    const query = `
        SELECT books.title, loaned_books.loan_date 
        FROM loaned_books 
        JOIN books ON loaned_books.book_id = books.id 
        WHERE loaned_books.user_id = ? 
        AND DATEDIFF(NOW(), loaned_books.loan_date) <= 90`;

    pool.query(query, [req.userId], (error, results) => {
        if (error) {
            console.error('Error fetching loaned books: ' + error.stack);
            return res.status(500).json({ error: 'Error fetching loaned books' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
