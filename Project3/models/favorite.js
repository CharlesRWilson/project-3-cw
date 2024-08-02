const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Ensure this path is correct

class Favorite extends Model {}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'favorite',
    timestamps: false,
  }
);

module.exports = Favorite;