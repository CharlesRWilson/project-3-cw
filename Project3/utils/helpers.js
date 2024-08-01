// helpers.js
const { favorite } = require('../models/favorite'); // Assuming you have a favorite model

async function getfavorites(userId) {
  return await favorite.findAll({ where: { user_id: userId } });
}

async function savefavorite(userId, cardData) {
  return await favorite.create({ user_id: userId, card_data: cardData });
}

module.exports = { getfavorites, savefavorite };

// module.exports = {
//   format_date: (date) => {
//     // Format date as MM/DD/YYYY
//     return date.toLocaleDateString();
//   },
//   format_amount: (amount) => {
//     // format large numbers with commas
//     return parseInt(amount).toLocaleString();
//   },
//   get_emoji: () => {
//     const randomNum = Math.random();

//     // Return a random emoji
//     if (randomNum > 0.7) {
//       return `<span for="img" aria-label="lightbulb">💡</span>`;
//     } else if (randomNum > 0.4) {
//       return `<span for="img" aria-label="laptop">💻</span>`;
//     } else {
//       return `<span for="img" aria-label="gear">⚙️</span>`;
//     }
//   },
// };
