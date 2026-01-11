import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

const protect = asyncHandler(async(req,res,next) =>{
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer")){
    res.status(404).json({
      Message : "Not Authorized"
    })
  }

  const token = authHeader.split(" ")[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  console.log("TOKEN:", token);
  console.log("DECODED:", decoded);


  req.user = decode._id;
  next();
});

export default protect;