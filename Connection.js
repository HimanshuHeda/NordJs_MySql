// Connection.js
const mysql = require('mysql');

// Create a connection to the database
const con = mysql.createConnection({
  host: 'localhost',    // Database host
  user: 'root',         // Your MySQL username
  password: '',         // Your MySQL password (leave blank if none)
  database: 'school'    // The name of your database
});

// Connect to the database
con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Export the connection
module.exports = con;
