const jwt = require('jsonwebtoken');
const User = require('../model/user.model');


exports.verifyToken = async (req, res, next) => {
    try {
        // console.log(req.headers);
        let token = req.headers['authorization'].split(" ")[1];
        // console.log(token);
        let {userId} = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(userId);
        req.user = await User.findById(userId);
        // console.log(req.user);
        if(req.user){
            next();
        }else{
            res.json({message: 'Invalid User'});
        }
    } catch (error) {
        console.log(error);
        res.json({message: 'Server Error'});
    }
}
