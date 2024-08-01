// models/favorite.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const favorite = sequelize.define('favorite', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  card_data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = favorite;