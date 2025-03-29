const User = require('../models/userModel');
const passwordEncryptor = require('../config/passwordEncryptor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// Generate User token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : "1d"})
}


//Register User
const registerUser = async (req,res) => {
    const {name,email,password,phone} = req.body;
    try {
        
        //Check if the user is already registered
        const exists = await User.findOne({email: email})

        if(exists) throw new Error('User is already registered');


        // Encrypt Password
        const hashedPassword = await passwordEncryptor(password);
        
        if(hashedPassword == "") throw new Error('Something went wrong');

        // Create a new user
        const user = await User.create({name: name, email: email, password: hashedPassword, phone : phone});  


        // Generate Token for frontend

        const token = await generateToken(user._id)

        // Send HTTP only cookie
        res.cookie("token", token,
        {
            path : "/",
            httpOnly : true,
            expires : new Date(Date.now() + (1000*86400)),
            sameSite : "none",
            secure : true
        })
        

        if(user)
            {
                const {name,email,phone} = user;
                res.status(201)
                res.json({
                    message: "User registered successfully",
                    name,
                    email,
                    phone
                })
            } 
            else
            {
                res.status(400)
                throw new Error("Invalid user data") 
            }

    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Login User
const loginUser = async (req,res) => {
    const {email , password} = req.body;

    
    // Check if user exists
    try {
        const userExist = await User.findOne({email})
        if(!userExist)
        {
            res.status(400)
            throw new Error("Invalid Email or password")
        }

        // User Exist , check password
        const passwordIsCorrect = await bcrypt.compare(password, userExist.password)

        if(!passwordIsCorrect)
        {
            res.status(400);
            throw new Error("Invalid Email or password")
        }

        if(passwordIsCorrect)
        {
            const {_id, name, email, photo, bio, phone} = userExist;
            res.status(200)
            // Generate token for user
            const token = generateToken(_id)
            
            // Send HTTP only cookie
            
            res.cookie("token", token, 
            {
                path : "/",
                httpOnly : true,
                expires : new Date(Date.now() + (1000*86400)), //1 Day
                sameSite : "none",
                secure : true
            })
            res.json({
                name,
                email,
                photo,
                bio,
                phone
            })
        }

    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

// Logout User
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token").json({message:"Logout Successful"}).status(200)
    } catch (error) {
        res.json({
            message:error.message
        })
    }  
}


// Get Login Status
const loginStatus = async (req,res) => {
        const token = req.cookies.token
        if(!token || token === "")
            res.json(false)

        else 
        {
            const verified = await jwt.verify(token, process.env.JWT_SECRET); 
            if(verified)
                res.json(true)
            else res.json(false)
        }
}


// Get User
const getUser = async (req,res) => {    
    try {
        const user = req.user;
        res.json(user)
    } catch (error) {
        res.json({message : error.message}).status(401)
    }
}


// Update User Data
const updateUser = async (req,res) => {
    try {
        var user = await User.findById(req.user._id)
        const {name,email,phone,bio,photo} = user;

        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        const newUser = await user.save()
        
        res.json({
            message: "User Updated successfully",
            name : newUser.name,
            email : newUser.email,
            phone : newUser.phone
        })
    } catch (error) {
        res.status(400).json(error.message) 
    }
}


// Change Password
const changePassword = async (req,res) => {
    try {
        const user =await User.findById(req.user._id)
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword ||!newPassword)
        {
            throw new Error("Please fill in all the required fields")
        }
        
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(isMatch)
        {
            const hashedPassword = await passwordEncryptor(newPassword)
            user.password = hashedPassword
            const newUser = await user.save()
            res.json({message : "Password changed successfully"});
        }
        else throw new Error("Wrong password")
    } catch (error) {
        res.status(400).json(error.message)
    }
} 



module.exports = {
    registerUser,
    logoutUser,
    loginStatus,
    loginUser,
    getUser,
    updateUser,
    changePassword
}