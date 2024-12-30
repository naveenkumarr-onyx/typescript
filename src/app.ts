import express from "express";
import 'dotenv/config'
import cors from "cors";
import { connectDB } from "./config/db";


const app = express();
app.get("/",(req,res)=>{
    res.send(`Backend is running on port ${process.env.APP_PORT}... Have fun!`);
})
connectDB()
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);
app.listen(process.env.APP_PORT,()=>{
    console.log(`[SERVER] Server is running on port ${process.env.APP_PORT}`);
})