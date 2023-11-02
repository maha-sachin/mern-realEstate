import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()



mongoose.connect(process.env.MANGO).then(()=>{
    console.log("connected to MongoDB")
}).catch(err => console.log(err))


const app = express()

app.listen(4000,(req,res)=>{
 console.log("server is running on port 400")})
