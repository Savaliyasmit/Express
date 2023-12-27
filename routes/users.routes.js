const express = require("express");
const userRoutes = express.Router();
const { verifyToken } = require("../helpers/verifyToken.js");
const {
  signupUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller.js");

userRoutes.post("/signup", signupUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/", verifyToken, getUsers);

userRoutes.get("/:id", getUser);

userRoutes.patch("/:id", updateUser);

userRoutes.delete("/:id", deleteUser);

module.exports = userRoutes;
