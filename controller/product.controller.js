// const productsData = require("../public/products.json");
const Product = require("../model/product.model.js");

//post
exports.createNewProduct = async (req, res) => {
  try {
    let { title, description, price, brand, category } = req.body;
    let product = await Product.findOne({ title: title });
    if (product) {
      return res.json("product is already exits");
    }
    product = await Product.create({title,description,price,brand,category,});
    product.save();
    res.json({ messsage: "product created", product });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

//   get all products
exports.getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({ isDelete: false });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

// get spacific data
exports.getProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

// patch update data
exports.updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    if (!product) {
      return res.json({ meassage: "Product not found" });
    }
    product = await Product.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...req.body },
      },
      {
        new: true,
      }
    );
    product.save();
    res.json({ meassage: "Product is updated...", updatedata: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

// delete
exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    if (!product) {
      return res.json({ meassage: "Product not found" });
    }

    product = await Product.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true }
    );
    // product = await Product.findOneAndDelete({ _id: id });
    res.json({ product, messsage: "Product is Deleted.." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};
