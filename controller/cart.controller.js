const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

exports.addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
      cartItem: req.body.cartItem,
      isDelete: false
    });

    if(cart){
        return res.json({message: 'Cart already exist'});
    }
    let product = await Product.findById(req.body.cartItem);
    if(!product){
        return res.json({message: 'Product is not found'});
    }
    let newCart = await Cart.create({
        user: req.user._id,
        ...req.body
    });
    newCart.save();
    res.json({cart: newCart, message: 'Cart is added'});
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

exports.getAllCart = async(req,res)=>{
  try {
    let cart = Cart.find({isDelete:false})
     res.json(cart)
  } catch (error) {
    console.log(console.error());
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
     
}