const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Your MySQL password if you have one
  database: process.env.DB_DATABASE || 'homework_one'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes

// Get all members
app.get('/api/member', (req, res) => {
  db.query('SELECT * FROM member', (err, results) => {
    if (err) {
      console.error('Error fetching members:', err);
      res.status(500).json({ error: 'Error fetching members' });
      return;
    }
    res.json(results);
  });
});

// Get a specific member by id_member
app.get('/api/member/:id', (req, res) => {
  const memberId = req.params.id;
  db.query('SELECT * FROM member WHERE id_member = ?', memberId, (err, results) => {
    if (err) {
      console.error('Error fetching member details:', err);
      res.status(500).json({ error: 'Error fetching member details' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Member not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM member WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: 'Username or password is incorrect' });
      return;
    }

    res.json({ message: 'Login successful', user: results[0] });
  });
});

app.post('/api/register', (req, res) => {
  const {
    username,
    password,
    number,
    firstname,
    lastname,
    rank,
    agency,
    position
  } = req.body;

  const sql = 'INSERT INTO member (username, password, number, firstname, lastname, rank, agency, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [username, password, number, firstname, lastname, rank, agency, position], (err, result) => {
    if (err) {
      console.error('Error registering member:', err);
      res.status(500).json({ success: false, message: 'Registration failed' });
    } else {
      console.log('Member registered successfully');
      res.status(200).json({ success: true, message: 'Registration successful' });
    }
  });
});

// Update member data
app.put('/api/member/:id', (req, res) => {
  const {username, password, firstname, lastname, number, rank, agency } = req.body;
  const sql = 'UPDATE member SET username=?, password=?, firstname = ?, lastname = ?, number = ?, rank = ?, agency = ? WHERE id_member = ?';
  const values = [username, password, firstname, lastname, number, rank, agency, req.params.id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating member data:', err);
      res.status(500).json({ error: 'Error updating member data' });
      return;
    }
    res.json({ message: 'Member updated successfully' });
  });
});

// Ranks data
const ranks = [
  { id: 1, value: 'นาย' },
  { id: 2, value: 'นางสาว' },
  { id: 3, value: 'นาง' },
  { id: 4, value: 'จ.ต.' },
  { id: 5, value: 'จ.ต.หญิง' },
  { id: 6, value: 'จ.ท.' },
  { id: 7, value: 'จ.ท.หญิง' },
  { id: 8, value: 'จ.อ.' },
  { id: 9, value: 'จ.อ.หญิง' },
  { id: 10, value: 'พ.อ.ต.' },
  { id: 11, value: 'พ.อ.ต.หญิง' },
  { id: 12, value: 'พ.อ.ท.' },
  { id: 13, value: 'พ.อ.ท.หญิง' },
  { id: 14, value: 'พ.อ.อ.' },
  { id: 15, value: 'พ.อ.อ.หญิง' },
  { id: 16, value: 'ร.ต.' },
  { id: 17, value: 'ร.ต.หญิง' },
  { id: 18, value: 'ร.ท.' },
  { id: 19, value: 'ร.ท.หญิง' },
  { id: 20, value: 'ร.อ.' },
  { id: 21, value: 'ร.อ.หญิง' },
  { id: 22, value: 'น.ต.' },
  { id: 23, value: 'น.ต.หญิง' },
  { id: 24, value: 'น.ท.' },
  { id: 25, value: 'น.ท.หญิง' },
  { id: 26, value: 'น.อ.' },
  { id: 27, value: 'น.อ.หญิง' },
  // Add other ranks here...
];

app.get('/ranks', (req, res) => {
  res.json(ranks);
});


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
