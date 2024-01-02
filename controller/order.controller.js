const Cart = require('../model/cart.model');
const Order = require('../model/order.model');


exports.addNewOrder = async (req, res) => {
    try {
        // find cartitems and joint with populate
        const cartItems = await Cart.find({user:req.user._id,isDelete:false}).populate('cartItem');
        console.log(cartItems);
        // caritmes make array of product items and after use map and acess from array
        let orderItems = cartItems.map((ele)=>({
            cartItem: ele.cartItem,
            quantity: ele.quantity,
            price: ele.cartItem.price
        }));
        console.log(orderItems);
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

exports.cancelOrder = async (req,res)=>{
    try {
        let orderId = new mongoose.Types.ObjectId(req.query.orderId);
        let order = await Order.findOne({user:req.user._id,isDelete:false})
        if(!order){
            return res.json({message:"order not found"});
        }
        let deleteOrder = await Order.updateOne({_id:orderId},{isDelete:true})
        res.json({message:"cancel order sucessfully...",order:deleteOrder})
        
    } catch (error) {
        console.log(error);
        res.json({message: 'Server Error'});
    }
}

exports.getAllOrder = async (req,res)=>{
try {
    let order = await Order.findOne({user:req.user._id,isDelete:false})
        if(!order){
            return res.json({message:"order not found"});
        }
        res.json({massage:"all orders found",order})
} catch (error) {
    console.log(error);
    res.json({message: 'Server Error'});
}
}

exports.getOrder = async (req,res)=>{
   try {
     let orderId = new mongoose.Types.ObjectId(req.query.id)
     console.log(orderId);
     let order = await Order.findOne({_id:orderId,isDelete:false})
     if (!order) {
        return res.json({massage:"order not found"})
     } 
     res.json({massage:"spacific order found ",order})
   } catch (error) {
    console.log(error);
    res.json({message: 'Server Error'});
   }
}

// exports.updateOrder = async (req,res)=>{
//     try {
//         const { id, quantity, cartItem } = req.body;
//     let order = await Order.findOne({ user: req.user._id, _id: id });
//     if (!order) {
//           return res.json("You have not any order");
//         }

//         order = await Cart.findOne({
//           cartItem: cartItem,
//           isDelete: true,
//         });
//         if (!order) {
//           return res.json("Item is not ordered You");
//         }

//         order = await Cart.updateOne(
//           { cartItem: cartItem },
//           {
//             $set: { quantity: quantity },
//           },
//           { new: true }
//         );
    
//         order = await Cart.find({ user: req.user._id, isDelete: true }).populate("cartItem");
    
//         let orderItem = order.map((ele) => ({
//           cartItem: ele.cartItem._id,
//           quantity: ele.quantity,
//           price: ele.cartItem.price,
//         }));
    
//         let totalPrice = orderItem.reduce((total, item) => (total += item.quantity * item.price), 0);
        
//         let updateOrder = await Order.findOneAndUpdate(
//           { user: req.user._id },
//           {
//             $set: { items: orderItem, totalAmount: totalPrice },
//           },
//           { new: true }
//         );
    
//         updateOrder.save();
//         res.json({ message: "update order success", updateOrder });
//       } catch (err) {
//         console.log(err);
//         res.json("Internal server error");
//       }
//     };
    
