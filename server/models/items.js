'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {

    static associate(models) {

      items.belongsToMany(models.cart, { through: models.cartItem, onDelete: 'CASCADE' });

      items.hasMany(models.cartItem);

      items.belongsToMany(models.orders, { through: models.orderItems, onDelete: 'CASCADE' });




    }
  }
  items.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false

    },

    category: {
      type: DataTypes.ENUM,
      values: ['drinks', 'pizzas', 'soups', 'chinese', 'burgers', 'pastas'],
      allowNull: false
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};