'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {


      models.users.hasOne(models.cart);
      models.users.hasMany(models.orders)


    }
  }
  users.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false


    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};