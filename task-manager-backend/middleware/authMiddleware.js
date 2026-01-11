import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("TOKEN:", token);
    console.log("DECODED:", decoded);
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Token verification failed" });
  }

  req.user = decoded.id || decoded._id; 
  next();
});

export default protect;
