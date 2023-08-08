const express = require('express');
const { checkAuthentication } = require('../middlewares/authentication');
const { addItemToCart, getCartItems, incrementQuantity, decrementQuantity } = require('../controllers/cart.controller');

const router = express.Router();

router.post('/', checkAuthentication, addItemToCart)
router.get('/:userId', getCartItems)
router.put('/increment/:itemId', checkAuthentication, incrementQuantity)
router.put('/decrement/:itemId', checkAuthentication, decrementQuantity)



module.exports = router;