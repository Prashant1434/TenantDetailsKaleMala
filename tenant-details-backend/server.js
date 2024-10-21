const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '20mb' })); // Increase this as needed

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ketaki@04',
  database: 'tenant_details',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Endpoint to receive data from the React app
app.post('/api/submit', (req, res) => {
  const data = req.body;

  // Insert data into the users table
  const userSql = `INSERT INTO users (roomNo, fullName, address, panNo, aadharNo, mobileNo, altMobileNo, photo, aadharPhoto, panPhoto) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const userValues = [
      data.roomNo,
      data.fullName,
      data.address,
      data.panNo,
      data.aadharNo,
      data.mobileNo,
      data.altMobileNo,
      data.photo,
      data.aadharPhoto,
      data.panPhoto,
  ];

  // Execute the user insert query
  db.query(userSql, userValues, (err, userResults) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }

      const userId = userResults.insertId; // Get the ID of the inserted user

      // Prepare to insert dependents
      const dependentInsertSql = `INSERT INTO dependents (userId, name, relation, dependentMobileNo) VALUES ?`;
      const dependentValues = data.dependents.map(dependent => [
          userId, 
          dependent.name, 
          dependent.relation, 
          dependent.dependentMobileNo
      ]);

      // Execute the dependents insert query
      db.query(dependentInsertSql, [dependentValues], (err) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }

          // Respond with success
          res.status(200).json({ message: 'User and dependents inserted successfully!' });
      });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
