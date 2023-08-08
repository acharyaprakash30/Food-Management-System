'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {

    static associate(models) {
      orders.belongsTo(models.users);

      orders.belongsToMany(models.items, { through: models.orderItems, onDelete: 'CASCADE' });

    }
  }
  orders.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'

      }
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,

    },
    

    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('Preparing', 'Cancelled', 'Delivered'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};