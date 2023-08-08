const express = require("express");
const { users } = require("../models");
const models = require("../models");
const { Op } = require("sequelize");

const getAllUsers = async (req, res) => {
  console.log("got here");
  console.log(req.query);
  const { userName } = req.query;
  const query = userName
    ? {
        where: {
          userName: { [Op.startsWith]: userName },
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      }
    : {};

  try {
    if (req.query.userName === "all") {
      const allUsers = await users.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      // console.log(allUsers);

      return res.json(allUsers);
    }
    const allUsers = await users.findAll(query);

    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  console.log("here");

  try {
    const user = await models.users.findOne({
      where: { id: req.params.id },

      attributes: [
        "id",
        "email",
        "phoneNumber",
        "role",
        "address",
        "userName",
        "image",
      ],
    });
    // console.log(user);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
      });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const isExists = await models.users.findOne({ where: { id: id } });
    // console.log(isExists);
    if (!isExists)
      return res.status(404).json({
        message: "User not found.",
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
  console.log(req.body);

  const userToUpdate = {
    userName: req.body.userName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  };
  // console.log(postToCreate);
  // console.log(userToUpdate);

  try {
    const result = await models.users.update(userToUpdate, {
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!result[0]) {
      return res.status(409).json({
        message: "Update unsuccessful.",
      });
    }
    console.log("updated sucessful");
    console.log(result);

    return res.status(200).json({
      message: "Update successfull.",
      updatedUser: userToUpdate,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong.",
      error: error,
    });
  }
};

const updateUserPicture = async (req, res) => {
  const id = req.params.id;
  console.log("here");
  console.log(id);
  try {
    const isExists = await models.users.findOne({ where: { id: id } });
    // console.log(isExists);
    if (!isExists)
      return res.status(404).json({
        message: "User not found.",
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
  console.log(req.body);

  const userToUpdate = {
    image: req.body.image,
  };
  // console.log(postToCreate);
  // console.log(userToUpdate);
  console.log(userToUpdate);
  try {
    const result = await models.users.update(userToUpdate, {
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log(result);

    if (!result[0]) {
      return res.status(409).json({
        message: "Update unsuccessful.",
      });
    }
    console.log("updated sucessful");
    console.log(result);

    return res.status(200).json({
      message: "Update successfull.",
      updatedUser: userToUpdate,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong.",
      error: error,
    });
  }
};

module.exports = {
  getAllUsers: getAllUsers,
  getUser: getUser,
  updateUser: updateUser,
  updateUserPicture: updateUserPicture,
};
