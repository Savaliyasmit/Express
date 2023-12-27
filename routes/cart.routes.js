const cartRoutes = require('express').Router();
const {verifyToken} = require('../helpers/verifyToken');
const {addToCart} = require('../controller/cart.controller');

cartRoutes.post('/add-cart', verifyToken, addToCart);

module.exports = cartRoutes;