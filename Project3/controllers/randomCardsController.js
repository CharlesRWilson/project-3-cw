// controllers/randomCardsController.js
const axios = require('axios');

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

  module.exports = { getRandomCards };