const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  isDelete: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("users", usersSchema);
