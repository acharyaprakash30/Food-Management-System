const express = require("express");
const models = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config({ path: ".env.local" });

const register = async (req, res) => {
  try {
   



    //check existing user
    const user = await models.users.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { userName: req.body.userName }],
      },
    });
    // console.log(user);
    // console.log(req.body);

    if (user) {
      // console.log('user exists');
      // status code for useralready exits
      return res.status(409).json({
        message: "User already exists !",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Something went wrong !",
      error: err,
    });
  }

  const salt = await bcrypt.genSalt(10);
  // console.log(typeof (req.body.password));
  // console.log(password);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const userData = {
    email: req.body.email,
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    password: hash,
    role: "customer",
  };

  try {
    const user = await models.users.create(userData);
    console.log(user);
    return res.status(200).json({
      message: "Signup sucessfully !",
      user: user.dataValues,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong !",
      error: err,
    });
  }
};

const login = async (req, res) => {
  try {
    //check existing user
    // console.log(req.body);

    const user = await models.users.findOne({
      where: { email: req.body.email },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    // console.log(user);
    // console.log(req.body);

    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials." });
    }

    const checkPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    // console.log(checkPassword);
    if (!checkPassword)
      return res.status(400).json({ message: "Wrong password ." });


      console.log("=======================================here")

    // if usrnm and pw correct then send jwt toktne
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        userName: user.userName,
        image: user.image,
        role: user.role,
      },
      'thisismysecretcode',
      { expiresIn: "10h" }
    );

    console.log(token,"==============================token")


    // console.log(user.dataValues);
    // const { id, email, userName } = user;

    res
      .status(200)
      .json({ message: "Login successful.", token: token, id: user.id });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong !",
      error: err.message,
    });
  }
};
const logout = (req, res) => {
  res.clearCookie("access_token").status(200).json("User logged out !");
};

module.exports = {
  register: register,
  login: login,
  logout: logout,
};
