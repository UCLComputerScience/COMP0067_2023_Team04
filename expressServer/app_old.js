const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: '0067group4',
    password: '0lwduw-W@lrxNc43',
    database: 'device_loan_sys'
});

connection.connect((error) => {
    if (error) {
      console.error('Error connecting: ' + error.stack);
      return;
    }
    console.log('Connected as id ' + connection.threadId);
  });

const query = 'SELECT * FROM device';

connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error executing query: ' + error.stack);
    return;
  }
  console.log('Results: ', results);
});

connection.end((error) => {
    if (error) {
      console.error('Error closing connection: ' + error.stack);
      return;
    }
    console.log('Connection closed');
  });