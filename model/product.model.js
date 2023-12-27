const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
description: String,
    price: Number,
    brand: String,
category: [String],
isDelete: {
  type: Boolean,
  default: false,
}
});

// model function create collection in mongodb
module.exports = mongoose.model("products", productSchema);
