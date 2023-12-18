const express = require("express");
const productRoutes = express.Router();

const {
  createNewProduct,
  getAllProduct,
  getProduct,
  replaceProduct,
  updateProduct,
  deleteProduct
} = require("../controller/product.controller.js");

// get all data from products
productRoutes.post("/", createNewProduct);

productRoutes.get("/", getAllProduct);

// get spcific data
productRoutes.get("/:id", getProduct);

// put method replace all boject when pass body json
// productRoutes.put("/:id", replaceProduct);

// patch for use for update your data
productRoutes.patch("/:id", updateProduct);

// delete
productRoutes.delete("/:id", deleteProduct);

module.exports = productRoutes;
