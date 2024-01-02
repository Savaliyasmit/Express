const express = require('express')
const authRoutes = express.Router()
const {imageAdd,imageAdds} = require("../controller/auth.controller.js")
const {upload} = require("../helpers/imageUploads.js")

authRoutes.post("/image",upload.single('profileImage'),imageAdd)
authRoutes.post("/images",upload.array('profileImage'),imageAdds)

module.exports = authRoutes