// routes/authRoutes.js
const { error } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {User, Favorite} = require('../models');
const axios = require('axios');
// Middleware to parse JSON bodies
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    console.log(userData);

    // Fetch random cards from SWAPI
    const response = await axios.get('https://swapi.dev/api/people/');
    const characters = response.data.results;

    // Map the characters to the card format
    const cards = characters.map(character => ({
      id: character.url.split('/').slice(-2, -1)[0],
      title: character.name,
      description: `Birth Year: ${character.birth_year}`
    }));

    res.render('test', { loggedIn: !!userData, body: '<p>Welcome to Random Cards!</p>', cards });
  } catch (error) {
    console.error('Error fetching data from SWAPI:', error);
    res.status(500).send('Internal Server Error');
  }
});
// router.get('/', async(req, res) => {
//   const userData = await User.findByPk(req.session.user_id);
//   console.log(userData);
//   if (userData) {
//     const cards = [
//       { title: 'Card 1', description: 'Description for card 1' },
//       { title: 'Card 2', description: 'Description for card 2' },
//       // Add more cards as needed
//     ];
  
//     res.render('test', { loggedIn: true, body: '<p>Welcome to Random Cards!</p>', cards });
//       // name: user.name,
//       // favorites: user.favorites || [],
//       // loggedIn: req.session.logged_in
//   //   });
//   }
//   else {
//     res.status(500).json (error); // Redirect to login if user data is not available
//   }
//   });
// Define the route for user creation
// router.post('/api/user', (req, res) => {
//     const user = req.body;
//     // Handle user creation logic here
//     // Save user to database (this is just a placeholder)
//     res.status(201).json({ message: 'User created successfully', user });
//   });

// //Render the home page
// router.get('/', (req, res) => {
//   res.render('home');
// });

// Render the login page
router.get('/login', (req, res) => {
  res.render('login');
  // console.log(req.session.user); // Ensure you have a login.handlebars file in your views directory
});

// Render the signup page (if separate)
// router.get('/signup', (req, res) => {
//   res.render('signup'); // Ensure you have a signup.handlebars file in your views directory
// });

// Handle favorite action
router.post('/favorite', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const { cardId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    // Save favorite card to the database
    await Favorite.create({ userId, cardId });

    res.status(201).json({ message: 'Card favorited successfully' });
  } catch (error) {
    console.error('Error favoriting card:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Render the profile page
router.get('/profile', async(req, res) => {
  const userData = await User.findByPk(req.session.user_id);

if (userData) {
  res.render('profile', {
    name: userData.name,
    favorites: userData.favorites || [],
    loggedIn: req.session.logged_in
  });
}
else {
  res.redirect('/login'); // Redirect to login if user data is not available
}
});

// Handle signup form submission
// router.post('/signup', (req, res) => {
//     const { name, email, password } = req.body;
//     const newUser = { name, email, password };
  
//     const userDataPath = path.join(__dirname, './userData.json');
//     fs.readFile(userDataPath, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading user data:', err);
//         return res.status(500).send({ message: 'Internal server error' });
//       }
  
//       const users = JSON.parse(data);
//       users.push(newUser);
  
//       // Write updated users back to userData.json
//       fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//           console.error('Error writing user data:', err);
//           return res.status(500).send({ message: 'Internal server error' });
//         }
  
//         console.log('User created:', newUser);
//         // If registration is successful
//         res.status(201).send({ message: 'User created successfully' });
//       });
//     });
// 
module.exports = router;