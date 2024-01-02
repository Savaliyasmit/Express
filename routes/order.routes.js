const orderRoutes = require("express").Router();
const { verifyToken } = require("../helpers/verifyToken");
const { addNewOrder ,cancelOrder ,getAllOrder, getOrder ,updateOrder} = require("../controller/order.controller");

orderRoutes.post('/add-order', verifyToken, addNewOrder);
orderRoutes.delete('/cancel-order',verifyToken,cancelOrder)
orderRoutes.get('/orders',verifyToken,getAllOrder)
orderRoutes.get('/order',verifyToken,getOrder)
// orderRoutes.patch('/update-order',verifyToken,updateOrder)


module.exports = orderRoutes;