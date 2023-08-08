'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {

    static associate(models) {

      cart.belongsTo(models.users);

      cart.belongsToMany(models.items, { through: models.cartItem, onDelete: 'CASCADE' });


      cart.hasMany(models.cartItem);



    }
  }
  cart.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'

      }
    },

  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};