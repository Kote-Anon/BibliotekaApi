const fs = require('fs');
const mysql = require('mysql');

// Function to generate .env file content
const generateEnvContent = (dbInfo) => {
    return `DB_HOST=${dbInfo.host}
DB_USER=${dbInfo.user}
DB_PASSWORD=${dbInfo.password}
DB_DATABASE=${dbInfo.database}`;
};

// Function to read SQL server information and generate .env file
const generateEnvFile = (dbConfig) => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to SQL server:', err.stack);
            return;
        }
        console.log('Connected to SQL server as id', connection.threadId);

        // Get database information
        connection.query('SELECT @@hostname AS host, USER() AS user, DATABASE() AS database', (error, results) => {
            if (error) {
                console.error('Error retrieving SQL server info:', error.stack);
                return;
            }
            const dbInfo = results[0];
            const envContent = generateEnvContent(dbInfo);

            // Write to .env file
            fs.writeFileSync('.env', envContent, 'utf8');
            console.log('.env file generated successfully.');

            // Close connection
            connection.end((err) => {
                if (err) {
                    console.error('Error closing SQL connection:', err.stack);
                } else {
                    console.log('Connection to SQL server closed.');
                }
            });
        });
    });
};

// Replace with your SQL server configuration
const dbConfig = {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
};

// Generate .env file
generateEnvFile(dbConfig);
