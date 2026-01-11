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

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));




app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Backend is running");
});
app.use("/tasks",taskRouter)
app.use("/auth", authRouter)

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;



app.listen(PORT,()=>{
  console.log("Server is running on port",PORT)
});