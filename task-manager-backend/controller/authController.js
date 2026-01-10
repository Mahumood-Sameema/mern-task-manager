import Users from "../models/user.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = asyncHandler(async(req,res) =>{
   const {userName ,email, password} = req.body;

   const user = await Users.findOne({userName:userName})

   if (user){
    return res.status(400).json({
      status: false,
      message:"User already exist"
    });
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const newUser = await Users.create(
    {
      userName,email,
      password : hashedPassword
    }
   );

   const token = jwt.sign(
    {id:newUser._id},
    process.env.JWT_SECRET,
    {expiresIn: "1hr"}
  )
   res.status(201).json({
    status: true,
    message : "User Created",
    user : newUser,
    token
   })
});

const signin = asyncHandler(async(req,res) =>{
   const {email , password} = req.body;

   const user = await Users.findOne({email : email})

   if (!user){
    return res.status(400).json({
      status: false,
      message:"User does not exist"
    });
   }

   const isMatch = await bcrypt.compare(password, user.password)
  
   if (!isMatch){
    res.status(401).json({
      status: false,
      message : "Invalid Password",
    })
   }

   const token = jwt.sign(
    {id:user.id},
    process.env.JWT_SECRET,
    { expiresIn: "1hr"}
   )
   res.status(200).json({
      status: true,
      message : "Signin Successful",
      token
    });
   
   
});


export {signup,signin}