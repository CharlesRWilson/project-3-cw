// controllers/randomCardsController.js
const axios = require('axios');
const router = require('express').Router();

const getRandomCards = async () => {
  try {
    // Fetch data from the SWAPI
    const response = await axios.get('https://swapi.dev/api/people/');
    const data = response.data.results;

    // Implement logic to select random cards from the fetched data
    const randomCards = data.sort(() => 0.5 - Math.random()).slice(0, 5); // Example: Get 5 random cards

    return randomCards;
  } catch (error) {
    console.error('Error fetching random cards:', error);
    throw error;
  }
};

router.get('/', async (req, res) => {
    try {
      const cards = await getRandomCards();
      res.render('random-cards', { cards });
    } catch (error) {
      console.error('Error fetching random cards:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router ;