const User = require('./User');
const Favorite = require('./Favorite');

// Define associations
User.hasMany(Favorite, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Favorite.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, Favorite };