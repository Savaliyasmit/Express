const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  firstname: {
    type: String,
   
  },
  lastname: {
    type: String,
    
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  profileImage: [{
    type: String,
}],
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  isDelete: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("auth", authSchema);
