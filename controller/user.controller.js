const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signupUser = async (req, res) => {
  try {
    let { firstname, lastname, email, password, gender } = req.body;
    let user = await User.findOne({ email: email, isDelete: false });
    if (user) {
      return res.json({ meassage: "user already exists..." });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    user = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      gender,
    });
    user.save();
    res.status(201).json({ message: "user is add" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email, isDelete: false });
    if (!user) {
      return res.json({ meassage: "user not found..." });
    }
    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({ message: "Password is not matched" });
    }
    let payload = {
      userId: user._id,
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY);

    res.json({ token, message: "your login sucessfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

// exports.getUsers = async (req, res) => {
//   try {
//     let users = await User.find({ isDelete: false });
//     res.json(users);
//     } catch (error) {
//     console.log(error);
//     res.status(500).json("Internal Server Error..");
//   }
// };

// authorization user profile show
exports.getUserProfile = async (req, res) => {
  try {
    //  let id = req.params.id;
    //  let user = await User.findById(id);
    //   res.json(user)
    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json({ user, message: "User is Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    let isValidPassword = await bcrypt.compare(currentPassword,req.user.password);

    if (!isValidPassword) {
      return res.json({ message: "Current password is incorrect" });
    }
    if (newPassword !== confirmPassword) {
      return res.json({ message: "Please confirm the new password" });
    }

    let hashPassword = await bcrypt.hash(newPassword, 10);
    let updateUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { password: hashPassword } },
      { new: true }
    );
    res.json({ message: "Password reset success",newpassword:updateUser});
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};


//  exports.deleteUser =async  (req,res) => {
//     try{
//         let id = req.params.id;
//         let user = await User.findById(id);
//         if(!user){
//             return res.json({message:"user not found"})
//         }
//         user = await User.findByIdAndUpdate(
//             id,
//             { isDelete:true},
//             { new: true }
//           );
//           res.json({ user, messsage: "Product is Deleted.." });
//     }catch (error) {
//     console.log(error);
//     res.status(500).json("Internal Server Error..");
//   }
//  };
