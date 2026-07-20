// registerUser
// loginUser
// logoutUser
// forgotPassword
// resetPassword
// changePassword

const User = require('../Modal/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registration = async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const existUser = await User.findOne({email});
        if(existUser) return res.status(400).json({message:'User already Exist'});

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({username,email,password:hashedPassword});
    const savedUser = await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const login = async(req,res)=>{
    try {
         const {email,password}=req.body;
         if (!email || !password) {
    return res.status(400).json({
        message: "Email and password are required"
    });
}
    const user = await User.findOne({email});
    //checking user
    if(!user) return res.status(404).json({message:'User not found'});
    //checking password
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) return res.status(400).json({message:'Incorrect password'});
    const token = jwt.sign({userId:user._id,username:user.username,email:user.email,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

   const userData = user.toObject();
    delete userData.password;

    res.status(200).json({ message: "Login successful",token,user: userData});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {registration,login};