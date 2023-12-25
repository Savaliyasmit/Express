const Auth = require("../model/auth_model.js")

exports.imageAdd = async (req,res)=>{
if(req.file){
    req.body.profileImage = `${req.file.path}`
}
let newAuth = await Auth.create({
    ...req.body
})
newAuth.save();
res.json({Auth:newAuth})
}

