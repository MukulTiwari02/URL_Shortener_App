const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const protect = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token) throw new Error("Not Authorized");

        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(verified.id).select("-password")

        if(!user) throw new Error("User not found");

        req.user = user;
        next();


    } catch (error) {
        res.status(401).json({message: error.message})
    }
}


module.exports = protect;