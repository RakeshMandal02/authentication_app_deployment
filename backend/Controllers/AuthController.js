const userModel = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const register = async (req,res) => {
    try{
      const {username,email,password} = req.body;
      const user = await userModel.findOne({email})

      if(user){
        return res.status(409)
        .json({message: 'User already exists', success: false})
      }
      const hashedPassword = await bcryptjs.hash(password,10)
      const newUser = new userModel({
        username,
        email,
        password:hashedPassword,
        isApproved: false // New users require admin approval
        
    })
       await newUser.save()
       res.status(201)
       .json({message: 'User registered successfully. Await admin approval', success: true})
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal Server Error', success: false})
    }
}

const login = async (req,res) => {
    try{
     const {email,password} = req.body
     const user = await userModel.findOne({email})
     if(!user){
      return res.status(400)
      .json({message: 'Invalid email or password',success: false})
     }
     if(!user.isApproved){
        return res.status(403)
        .json({message: 'Account not approved by admin',success:false})
     }
     const isPasswordEqual = await bcryptjs.compare(password, user.password)
     if(!isPasswordEqual){
        return res.status(400)
        .json({message: 'Invalid email or password', success:false})
     }
     // Create a JWT Token with shorter expiration (e.g., 1 hour)
     const jwtToken = jwt.sign(
        { userId : user._id, role: user.role, username: user.username },
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )
    res.status(200)
    .json({message: 'Login Successful',success:true,jwtToken})
    }catch(err){
        console.log(err);
        res.status(500)
        .json({message: 'Internal Server Error',success: false})
    }
}

// Admin: Get list of users pending approval
const getPendingUsers = async(req,res) => {
    try{
      const users = await userModel.find({isApproved: false})
      res.json({users})
    }catch(err){
        res.status(500)
        .json({message: 'Server error'})
        
    }
}

// Admin: Approve a user by ID
const approveUser = async(req,res) => {
    try{
     const userId = req.params.id
     const user = await userModel.findById(userId)
     if(!user){
        return res.status(404)
        .json({message: 'User not found'})
     }
     user.isApproved = true
     await user.save()
     res.json({message: 'User approved successfully', success: true})
    }catch(err){
        console.log(err);
        res.status(500)
        .json({message: 'Server error',success:false})
    }
}
 
module.exports = {
    register,
    login,
    getPendingUsers,
    approveUser
}
