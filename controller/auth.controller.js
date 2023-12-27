const Auth = require("../model/auth_model.js")

exports.imageAdd = async (req,res)=>{
if(req.file){
    req.body.profileImage = `${req.file.path.replace(/\\/g,'/')}`
}
let newAuth = await Auth.create({
    ...req.body,
})
console.log(newAuth);
newAuth.save();
res.json({Auth:newAuth})
}


exports.imageAdds = async (req,res)=>{
    let images = []
    if(req.files){
        for(let i = 0 ; i < req.files.length ; i++){
            images[i] =  `${req.files[i].path.replace(/\\/g,'/')}`
        }
}
console.log(images);
let newAuth = await Auth.create({
    ...req.body,
    profileImage : images 
})
console.log(newAuth);
newAuth.save();
res.json({Auth:newAuth})
}