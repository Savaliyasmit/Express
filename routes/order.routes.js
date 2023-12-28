const orderRoutes = require("express").Router();
const { verifyToken } = require("../helpers/verifyToken");
const { addNewOrder } = require("../controller/order.controller");

orderRoutes.post('/add-order', verifyToken, addNewOrder);

module.exports = orderRoutes;