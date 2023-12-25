const express = require('express')
const authRoutes = express.Router()
const {imageAdd} = require("../controller/auth.controller.js")
const {upload} = require("../helpers/imageUploads.js")

authRoutes.post("/image",upload.single('profileImage'),imageAdd)

module.exports = authRoutes