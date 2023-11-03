import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs"

export const signup = async(req,res)=>{
    //get the info from the browser
    const {username,email,password} = req.body;
    const saltRounds = 10;
    const hashedPassword = bcryptjs.hashSync(password,saltRounds)
    const newUser = new User({username,email,password : hashedPassword})
    try {
        await newUser.save()
        res.status(201).json("user created successfully")
    }catch (error){
        res.status(500).json(error.message)
    }

}