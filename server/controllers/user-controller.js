const connection = require('../models/config'); // Update the path as per your project structure
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const { name, surname, email, password, phone, role } = req.body;
  console.log(req.body);

  if (!name || !surname || !email || !password || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const insertUserQuery = 'INSERT INTO users (user_name, user_surname, user_email, user_password, user_phone_num, user_role) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(insertUserQuery, [name, surname, email, hashedPassword, phone, role], (insertErr, result) => {
      if (insertErr) {
        console.error('Error inserting user data:', insertErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('User registered successfully');
      res.status(201).json({ message: 'User registered successfully' });
    });
  });

};

const login = (req, res) => {
 
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

 
  const query = 'SELECT * FROM users WHERE user_email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  
     if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    
    const user = results[0];
    const user_role = user.user_role;

    bcrypt.compare(password, user.user_password, (bcryptErr, match) => {
      if (bcryptErr) {
        console.error('Error comparing passwords:', bcryptErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    
      if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.user_id, userEmail: user.user_email, userRole: user.user_role }, 'meri_secret_key', { expiresIn: '1h' });

      res.cookie('uuid', token, { 
        withCredentials: true,
        httpOnly: false },);

      res.status(200).json({ message: 'Login successful', token, user_role});
    });
  });
  }

module.exports = { register,login };
