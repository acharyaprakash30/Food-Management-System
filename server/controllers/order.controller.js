const express = require('express')
const models = require('../models')
const { Op } = require('sequelize');


const createOrder = async (req, res) => {
    const transaction = await models.sequelize.transaction(); // Start a transaction
    // console.log(transaction);
    try {
        console.log(req.body);
        // Retrieve cart items
        const cartItems = await models.cartItem.findAll({
            where: { cartId: req.body.cartId },
            // include: { model: models. },
            attributes: ['itemId', 'quantity']
        });
        // console.log(cartItems);
        // res.json(cartItems)


        const itemIds = cartItems.map((item => item.itemId))
        const allItems = await models.items.findAll({
            where: { id: itemIds },
            attributes: ['id', 'name', 'price', 'image', 'category']
        })

        const itemsWithQuantities = allItems.map(item => {
            const cartItem = cartItems.find(cartItem => cartItem.itemId === item.id);
            return {
                id: item.id,
                price: item.price,
                quantity: cartItem ? cartItem.quantity : 0
            };
        });



        const totalAmount = itemsWithQuantities.reduce((sum, item) => {
            const itemTotal = item.quantity * item.price;
            // console.log(`${item.name} - Price: ${item.price}, Quantity: ${item.quantity}, Total: ${itemTotal}`);
            return sum + itemTotal;
        }, 0);

        // console.log(`Total Amount: ${totalAmount}`);


        // res.json(orderItemsToCreate)
        const order = await models.orders.create({
            userId: req.body.userId,
            totalAmount: totalAmount,
            status: "Preparing"

        }, { transaction })

        const orderItemsToCreate = itemsWithQuantities.map(item => {
            return {
                itemId: item.id,
                orderId: order.id,
                quantity: item.quantity
            }

        }

        )
        const createOrderItems = await models.orderItems.bulkCreate(orderItemsToCreate, { transaction }); //passing transaction
        await models.cart.destroy({
            where: {
                id: req.body.cartId
            }
        })
        await transaction.commit(); // Commit the transaction

        // res.json('okay')
        console.log(createOrderItems);
        res.status(201).json({
            message: "Your order has been placed."
        });
    }
    catch (err) {
        await transaction.rollback(); // Rollback the transaction on error

        console.log(err.message);
        return res.json({
            error: err.message,
            message: 'Failed to place  an order.'


        })
    }









}

const getUserAllOrder = async (req, res) => {

    try {
        const userOrders = await models.orders.findAll(
            {
                where: {
                    userId: req.params.userId
                },
                attributes: ['id', 'totalAmount', 'status', 'createdAt']
            }
        )


        res.status(200).json(userOrders)
    }
    catch (err) {
        console.log(err.message);
        return res.json({
            error: err.message,
            message: 'Failed to get orders.'


        })

    }

}

















module.exports = {
    createOrder: createOrder,
    getUserAllOrder: getUserAllOrder

}