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
          references: {
            model: 'user',
            key: 'id',
          },
        },
        cardId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'favorite',
      }
    );

module.exports = Favorite;