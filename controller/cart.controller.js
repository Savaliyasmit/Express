const { default: mongoose } = require("mongoose");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

exports.addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
      cartItem: req.body.cartItem,
      isDelete: false,
    });
    // validation cart item not add dublicate and product was not found cart not add
    if (cart) {
      return res.json({ message: "Cart already exist" });
    }
    let product = await Product.findById(req.body.cartItem);
    if (!product) {
      return res.json({ message: "Product is not found" });
    }
    // cart crate
    let newCart = await Cart.create({
      user: req.user._id,
      ...req.body,
    });
    newCart.save();
    res.json({ cart: newCart, message: "Cart is added" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

exports.getAllCart = async (req, res) => {
  try {
    let cart = await Cart.find({ user: req.user._id, isDelete: false });
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

exports.getCart = async (req, res) => {
  try {
    let cartId = new mongoose.Types.ObjectId(req.query.cartId);
    let cartItem = await Cart.findById({ _id: cartId, isDelete: false });
    if (!cartItem) {
      return res.json({ message: "cart not found" });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

// exports.updateCart = async (req, res) => {
//   try {
//     const {cartItem,quantity} = req.body
//     let cartItemId = new mongoose.Types.ObjectId(cartItem)
//     console.log(cartItemId);
//     let cartUpdate = await Cart.findByIdAndUpdate(cartItemId,{$set:{quantity:quantity}},{new:true})
//     console.log(cartUpdate);
//     if(!cartUpdate){
//       return res.json({ message: "cart not found" });
//     }
//     res.json({message:"Cart Update Sucessgully",cartUpdate})

//   }
//    catch (error) {
//     console.log(error);
//     res.status(500).json({ messsage: "Internal Server Error.." });
//   }
// };

exports.updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItemId = new mongoose.Types.ObjectId(req.query.cartItemId);

    console.log(cartItemId);

    let cartUpdate = await Cart.findOneAndUpdate(
      { cartItem: cartItemId },
      { $set: { quantity: quantity } },
      { new: true }
    );

    console.log(cartUpdate);

    if (!cartUpdate) {
      return res.json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item updated successfully", cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error.." });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cartItemId = new mongoose.Types.ObjectId(req.query.cartItemId);

    console.log(cartItemId);

    let cartDelete = await Cart.findOneAndUpdate(
      { cartItem: cartItemId },
      { $set: { isDelete: true } },
      { new: true }
    );

    console.log(cartDelete);

    if (!cartDelete) {
      return res.json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error.." });
  }
};
