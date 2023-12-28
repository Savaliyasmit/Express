const Cart = require('../model/cart.model');
const Order = require('../model/order.model');


exports.addNewOrder = async (req, res) => {
    try {
        const cartItems = await Cart.find({user:req.user._id,isDelete:false}).populate('cartItem');
        // console.log(cartItems);
        let orderItems = cartItems.map((ele)=>({
            cartItem: ele.cartItem,
            quantity: ele.quantity,
            price: ele.cartItem.price
        }));
        // console.log(orderItems);
        let totalPrice = orderItems.reduce((total, item)=> total + (item.quantity * item.price),0);
        // console.log(totalPrice);

        let newOrder = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount: totalPrice
        });
        newOrder.save();
        await Cart.updateMany({user: req.user._id}, {isDelete: true});
        res.json({order: newOrder, message: 'Order palced'});
       
    } catch (error) {
        console.log(error);
        res.json({message: 'Server Error'});
    }
}