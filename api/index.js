import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js"

dotenv.config()



mongoose.connect(process.env.MANGO),{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
() => {
  console.log('Connected to MongoDB');
}
// }.catch(err => console.log(err))


const app = express()

app.use(express.json())
app.use(cookieParser())


app.listen(4000,()=>{
 console.log("server is running on port 4000!")})

 app.use('/api/user',userRouter)
 app.use('/api/auth',authRouter)
 app.use('/api/listing',listingRouter)

 //creare middleware api route err-is coming from i/p of the MWARE,req-data from b/client,res from stoclient,nextmw,500 internal ser.err

app.use((err,req,res,next)=>{
const statusCode = err.statusCode || 500;
const message = err.message || "Internal Server Error"
return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
})

})
