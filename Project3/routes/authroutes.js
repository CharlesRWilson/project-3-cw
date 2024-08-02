// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Middleware to parse JSON bodies
router.use(express.json());

// Define the route for user creation
router.post('/api/users', (req, res) => {
    const user = req.body;
    // Handle user creation logic here
    // Save user to database (this is just a placeholder)
    res.status(201).json({ message: 'User created successfully', user });
  });

// Render the login page
router.get('/login', (req, res) => {
  res.render('login'); // Ensure you have a login.handlebars file in your views directory
});

// Render the signup page (if separate)
router.get('/signup', (req, res) => {
  res.render('signup'); // Ensure you have a signup.handlebars file in your views directory
});

// Handle login form submission
router.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
  
    console.log('Login attempt:', { email, password });

    // Read existing users from userData.json
    const userDataPath = path.join(__dirname, './userData.json');
    fs.readFile(userDataPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading user data:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }
  
      const users = JSON.parse(data);
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        console.log('User logged in:', user);
  
        // Log successful login attempt
        const loginAttemptsPath = path.join(__dirname, 'loginAttempts.json');
        fs.readFile(loginAttemptsPath, 'utf8', (err, data) => {
          let loginAttempts = [];
          if (!err) {
            loginAttempts = JSON.parse(data);
          }
          loginAttempts.push({ email, timestamp: new Date().toISOString() });
  
          fs.writeFile(loginAttemptsPath, JSON.stringify(loginAttempts, null, 2), (err) => {
            if (err) {
              console.error('Error writing login attempts:', err);
            }
          });
        });
  
        res.status(200).send({ message: 'Login successful' });
      } else {
        console.log('User not found');
        res.status(404).send({ message: 'User not found' });
      }
    });
  });
// Handle signup form submission
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = { name, email, password };
  
    const userDataPath = path.join(__dirname, './userData.json');
    fs.readFile(userDataPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading user data:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }
  
      const users = JSON.parse(data);
      users.push(newUser);
  
      // Write updated users back to userData.json
      fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error('Error writing user data:', err);
          return res.status(500).send({ message: 'Internal server error' });
        }
  
        console.log('User created:', newUser);
        // If registration is successful
        res.status(201).send({ message: 'User created successfully' });
      });
    });
  });
module.exports = router;