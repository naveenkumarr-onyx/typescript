import express, { Request, Response } from "express";
import 'dotenv/config'
import cors from "cors";
require ("./config/db");
import routes from "./routes/route";


const app = express();
app.use(express.json())
app.get("/",(req:Request,res:Response)=>{
    res.send(`Backend is running on port ${process.env.APP_PORT}... Have fun!`);
})
// connectDB()
app.use(
  cors({
    origin: "*"
  })
);
app.use("/app",routes)
app.listen(process.env.APP_PORT,()=>{
    console.log(`[SERVER] Express is running on port ${process.env.APP_PORT}`);
})