require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT
const morgan = require("morgan");
const productRoutes = require("./routes/products.routes.js");
const mongoose = require("mongoose");
const userRoutes = require('./routes/users.routes.js')
const authRoutes = require("./routes/auth.routes.js")
const path = require("path");
const cartRoutes = require('./routes/cart.routes.js');
const orderRoutes = require('./routes/order.routes.js');
const imagePath = path.join(__dirname,'public','images')

async function connectDatabase() {
  await mongoose.connect(process.env.MONGO_DB_URL);
}
connectDatabase()
  .then(() =>{
    console.log("Database Connected....");
  })
  .catch((error) => {
    console.log(error);
  });

//middelwar
app.use(morgan("dev"));
app.use(express.json());
app.use('/public/images',express.static(imagePath));

//Router middelwar 
app.use("/api/product", productRoutes);
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);



app.listen(port, () => {
  console.log(`server was conneted ${port}`);
});
