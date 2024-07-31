// swapiService.js
const axios = require('axios');

const SWAPI_BASE_URL = 'https://swapi.dev/api';

// Function to fetch a random set of 10 cards from the SWAPI API
async function fetchRandomSwapiCards() {
    try {
        // Fetch the total number of people available in the SWAPI API
        const response = await axios.get(`${SWAPI_BASE_URL}/people/`);
        const totalPeople = response.data.count;

        // Generate an array of random unique numbers
        const randomIndices = getRandomUniqueNumbers(10, totalPeople);

        // Fetch data for each random index
        const fetchPromises = randomIndices.map(index =>
            axios.get(`${SWAPI_BASE_URL}/people/${index}`)
        );

        // Wait for all fetch requests to complete
        const results = await Promise.all(fetchPromises);

        // Extract data from the results
        const cards = results.map(result => result.data);

        return cards;
    } catch (error) {
        console.error('Error fetching data from SWAPI:', error);
    }
}

// Helper function to generate an array of unique random numbers
function getRandomUniqueNumbers(count, max) {
    const numbers = new Set();

    while (numbers.size < count) {
        const randomNum = Math.floor(Math.random() * max) + 1;
        numbers.add(randomNum);
    }

    return Array.from(numbers);
}

module.exports = { fetchRandomSwapiCards };