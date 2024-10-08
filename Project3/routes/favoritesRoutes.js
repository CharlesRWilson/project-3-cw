// // routes/favoritesRoutes.js
// const express = require('express');
// const router = express.Router();
// const { getfavorites, savefavorite } = require('../controllers/favoritesController');

// router.get('/favorites', async (req, res) => {
//   if (!req.isAuthenticated()) {
//     console.log('Unauthorized access attempt to /favorites');
//     return res.redirect('/login');
//   }
//   try {
//     const favorites = await getFavorites(req.user.id);
//     res.render('favorites', { cards: favorites });
//   } catch (error) {
//     console.error('Error fetching favorites:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// router.post('/favorites', async (req, res) => {
//   if (!req.isAuthenticated()) {
//     console.log('Unauthorized access attempt to POST /favorites');
//     return res.status(401).send('Unauthorized');
//   }
//   try {
//     await saveFavorite(req.user.id, req.body.cardData);
//     res.send('Favorite saved');
//   } catch (error) {
//     console.error('Error saving favorite:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// module.exports = router;