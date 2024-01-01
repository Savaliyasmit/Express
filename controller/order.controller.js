const Cart = require('../model/cart.model');
const Order = require('../model/order.model');


exports.addNewOrder = async (req, res) => {
    try {
        // find cartitems and joint with populate
        const cartItems = await Cart.find({user:req.user._id,isDelete:false}).populate('cartItem');
        // console.log(cartItems);
        // caritmes make array of product items and after use map and acess from array
        let orderItems = cartItems.map((ele)=>({
            cartItem: ele.cartItem,
            quantity: ele.quantity,
            price: ele.cartItem.price
        }));
        // console.log(orderItems);
        // use reduce to price Quntity * price 
        let totalPrice = orderItems.reduce((total, item)=> total + (item.quantity * item.price),0);
        // console.log(totalPrice);
        
        // all create array  and save database
        let newOrder = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount: totalPrice
        });
        newOrder.save();
        // remove from cart
        await Cart.updateMany({user: req.user._id}, {isDelete: true});
        res.json({order: newOrder, message: 'Order palced'});
       
    } catch (error) {
        console.log(error);
        res.json({message: 'Server Error'});
    }
}