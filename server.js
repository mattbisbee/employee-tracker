const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Biznaz0814!',
    database: 'employee_db'
  },
  console.log('Connected to employee_db.')
);

db.query(`SELECT * FROM employee`, (err, rows) => {
  console.log(rows);
});


// Default response for any other request (Not Found). Should be placed LAST!
app.use((req, res) => {
  res.status(404).end();
});

// Express server function
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});