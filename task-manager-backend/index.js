import express from "express";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js";
import authRouter from "./routes/authRouter.js"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js"

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Backend is running");
});
app.use("/tasks",taskRouter)
app.use("/auth", authRouter)

app.use(errorMiddleware);

app.listen(5000,()=>{
  console.log("Server is running on port 5000")
});