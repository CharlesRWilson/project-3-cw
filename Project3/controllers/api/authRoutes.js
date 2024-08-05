// // controllers/api/authRoutes.js
// const router = require('express').Router();
// const passport = require('passport');

// // Route for user login
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }));

// // Route for user logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

// // Route for user registration (example, you need to implement user creation logic)
// router.post('/register', async (req, res) => {
//   // Implement user registration logic here
//   res.redirect('/login');
// });

// module.exports = router;