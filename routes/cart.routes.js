const cartRoutes = require('express').Router();
const {verifyToken} = require('../helpers/verifyToken');
const {addToCart,getAllCart} = require('../controller/cart.controller');

cartRoutes.post('/add-cart', verifyToken, addToCart);
cartRoutes.get('/Allcarts',getAllCart);

module.exports = cartRoutes;