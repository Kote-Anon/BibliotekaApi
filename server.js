const express = require('express');
const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Endpoint to send data to MySQL
app.post('/data', (req, res) => {
    const { info } = req.body;
    const query = 'INSERT INTO your_table (info) VALUES (?)';

    connection.query(query, [info], (error, results) => {
        if (error) {
            console.error('Error inserting data: ' + error.stack);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        res.status(200).json({ success: true, message: 'Data inserted successfully' });
    });
});

// Endpoint to retrieve data from MySQL
app.get('/data', (req, res) => {
    const query = 'SELECT * FROM your_table';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving data: ' + error.stack);
            res.status(500).json({ error: 'Error retrieving data' });
            return;
        }
        res.status(200).json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
