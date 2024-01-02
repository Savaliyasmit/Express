const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  items: [
    {
      cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalAmount: Number,
  isDelete: {
    type: Boolean,
    default: false,
  },
});


module.exports = mongoose.model('orders', orderSchema);