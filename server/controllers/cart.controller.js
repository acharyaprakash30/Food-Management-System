const express = require('express')
const models = require('../models')



const addItemToCart = async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        let cartExists = await models.cart.findOne({
            where: {
                userId: userId
            }
        });
        const getItem = await models.items.findByPk(itemId, { attributes: ['name'] })
        // console.log(getItem);

        // console.log(cartExists);


        if (!cartExists) {
            await models.sequelize.transaction(async (transaction) => {
                // Create a new cart
                const newCart = await models.cart.create({ userId: userId }, { transaction });

                // Create a new cartItem entry
                const createCartItem = await models.cartItem.create(
                    {
                        cartId: newCart.id,
                        itemId: itemId,
                        quantity: 1,
                    },
                    { transaction }
                );

                // const getItem = await models.items.findByPk(itemId, { attributes: ['name'] })
                // console.log(getItem);

                return res.status(201).json({
                    item: getItem.name
                })
            });
        }
        else {
            const itemInCart = await models.cartItem.findOne({
                where: { cartId: cartExists.id, itemId: itemId },

            })


            // console.log(itemInCart);
            // return res.json(itemInCart)

            if (itemInCart) {
                // console.log('here');

                return incrementQuantity(req, res)
            } else {
                console.log('here');
                await models.cartItem.create(
                    {
                        cartId: cartExists.id,
                        itemId: itemId,
                        quantity: 1,
                    }
                );

                return res.status(201).json(
                    {
                        item: getItem.name
                    }
                );
            }

        }
    }


    catch (error) {
        // console.log(error.message);
        res.status(500).json({
            message: 'Failed to create cart.',
            error: error
        });
    }

};




const incrementQuantity = async (req, res) => {
    const { userId } = req.body;
    const itemId = req.params.itemId || req.body.itemId


    try {
        let cartExists = await models.cart.findOne({
            where: {
                userId: userId
            }
        });

        if (!cartExists) {
            return res.status(404).json({ message: 'Cart not found.' });
        }




        const cartItem = await models.cartItem.findOne({
            where: { cartId: cartExists.id, itemId: itemId }
        });

        console.log(cartItem);

        if (cartItem) {
            const updatedCartItem = { ...cartItem, quantity: cartItem.quantity + 1 };

            await models.cartItem.update(updatedCartItem, {
                where: {
                    cartId: cartExists.id,
                    itemId: itemId,
                },
            });
            return res.status(200).json({
                message: "Quantity updated successfully."
            })
        } else {

            return res.status(404).json(

                { message: 'Item not found in the cart.' }
            );
        }
    } catch (error) {
        console.log(error.message);

        res.status(500).json(
            {
                message: 'Error updating quantity.',
                error: error
            }
        );
    }

}

const decrementQuantity = async (req, res) => {
    const { userId } = req.body;
    const itemId = req.params.itemId || req.body.itemId


    try {
        let cartExists = await models.cart.findOne({
            where: {
                userId: userId
            }
        });

        if (!cartExists) {
            return res.status(404).json({ message: 'Cart not found.' });
        }




        const cartItem = await models.cartItem.findOne({
            where: { cartId: cartExists.id, itemId: itemId }
        });

        console.log(cartItem);
        if (cartItem.quantity === 1) {
            await models.cartItem.destroy({
                where: {
                    cartId: cartExists.id,
                    itemId: itemId,
                },
            });
            return res.status(200).json({
                message: "Item removed from cart successfully."
            })
        }

        if (cartItem) {
            const updatedCartItem = { ...cartItem, quantity: cartItem.quantity - 1 };

            await models.cartItem.update(updatedCartItem, {
                where: {
                    cartId: cartExists.id,
                    itemId: itemId,
                },
            });
            return res.status(200).json({
                message: "Quantity updated successfully."
            })
        } else {

            return res.status(404).json(

                { message: 'Item not found in the cart.' }
            );
        }
    } catch (error) {
        console.log(error.message);

        res.status(500).json(
            {
                message: 'Error updating quantity.',
                error: error
            }
        );
    }

}



const getCartItems = async (req, res) => {
    try {
        const cart = await models.cart.findOne({
            where: {
                userId: req.params.userId,
            },
            attributes: ['id'],
            include: {
                model: models.cartItem,
                attributes: ['itemId', 'quantity'],
            },
        });
        console.log('--------------------------------');
        // console.log(cart);
        // if (!cart)
        //     return res.status(200).json([])

        const cartItems = cart ? cart.cartItems : [];
        console.log(cartItems);

        if (!cartItems.length) {
            return res.status(200).json(cartItems);
        }

        const itemIds = cartItems?.map(cartItem => cartItem.itemId);

        const items = await models.items.findAll({
            where: {
                id: itemIds,
            },
            attributes: ['id', 'price', 'name', 'image', 'category'],
            include: {
                model: models.cartItem,
                attributes: ['quantity'],
                where: {
                    cartId: cart.id,
                },
            },
        });

        const itemsWithQuantity = items?.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            quantity: item?.cartItems[0]?.quantity,
        }));

        res.status(200).json({
            cartId: cart.id,
            cartItems: itemsWithQuantity
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Failed to get cart items',
            error: error,
        });
    }
};
























module.exports = {
    addItemToCart: addItemToCart,
    getCartItems: getCartItems,
    incrementQuantity: incrementQuantity,
    decrementQuantity: decrementQuantity,

}