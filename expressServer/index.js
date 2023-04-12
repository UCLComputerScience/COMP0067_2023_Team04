// Import the mysql2 module
const mysql = require('mysql2');

// Create a connection object with the required configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: '0067group4',
    password: '0lwduw-W@lrxNc43',
    database: 'device_loan_sys'
});

// Connect to the database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the MySQL server.');
});

// Your code to interact with the database will go here

// Query the `device` table
connection.query('SELECT * FROM device', (error, results, fields) => {
    if (error) {
        console.error('Error querying the database:', error);
        return;
    }
    console.log('Device table results:', results);
});

// Close the connection when done
connection.end();
