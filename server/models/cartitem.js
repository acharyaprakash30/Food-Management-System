'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {

    static associate(models) {

      // cartItem.hasMany(models.cart);
      // cartItem.hasMany(models.items)
    }
  }
  cartItem.init({

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,


    },


    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'items',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },


  }, {
    sequelize,
    modelName: 'cartItem',
  });

  return cartItem;
};