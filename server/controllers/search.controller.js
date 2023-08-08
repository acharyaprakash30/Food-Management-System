const express = require('express')
const { users, items } = require('../models')
const models = require('../models')
const { Op } = require('sequelize');


const searchItems = async (req, res) => {
    const searchQuery = req.query.query;
    const category = req.query.category
    // console.log(searchQuery);
    // console.log(category);





    try {

        if (req.query.category === 'all') {
            const searchResults = await items.findAll({
                where: {
                    name: { [Op.startsWith]: searchQuery },
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] }


            });

            console.log(searchResults);
            return res.json(searchResults);

        }

        const searchResults = await items.findAll({
            where: {
                name: {
                    //it search any letter that matches
                    // [Op.like]: `%${searchQuery}%`,
                    [Op.startsWith]: searchQuery
                },
                category: category
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json(searchResults);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong.',
            error: error,
        });
    }
};



module.exports = {
    searchItems: searchItems, // Add the searchItems controller
};