require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT
const morgan = require("morgan");
const productRoutes = require("./routes/products.routes.js");
const mongoose = require("mongoose");
const userRoutes = require('./routes/users.routes.js')

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

//Router middelwar 
app.use("/api/product", productRoutes);
app.use("/api/user",userRoutes);



app.listen(port, () => {
  console.log(`server was conneted ${port}`);
});
