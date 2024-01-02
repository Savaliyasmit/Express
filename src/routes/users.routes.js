const express = require("express");
const userRoutes = express.Router();
const { verifyToken } = require("../helpers/verifyToken.js");
const {
  signupUser,
  loginUser,
  getUserProfile,
  updateUser,
  resetPassword
  
} = require("../controller/user.controller.js");

userRoutes.post("/signup", signupUser);

userRoutes.post("/login",loginUser);

userRoutes.get("/profile",verifyToken, getUserProfile);

userRoutes.patch("/update-profile", verifyToken,updateUser);

userRoutes.post("/reset-password", verifyToken,resetPassword);

module.exports = userRoutes;
