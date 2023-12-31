import Listing from "../Models/listing.model.js"
import User from "../Models/user.model.js"
import { errorHandler } from "../utils/error.js"
import  bcryptjs  from 'bcryptjs'

export const test = (req,res)=>{
    res.json({
        message : "Api test route is working!"
    })
 }

 export const updateUser = async (req,res,next)=>{
    // console.info(`req.user : ${JSON.stringify(req.user)}`);
    // console.info(`req.params : ${JSON.stringify(req.params)}`);
    if(req.user.id !== req.params.id) 
    return next(errorHandler(401,"you can only update your own account"))
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)//hash pwd
        }
        console.info(`update body ${JSON.stringify(req.body)}`)
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:{
            password: req.body.password,
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar}} )

        const{ password, ...others } = updatedUser._doc
        console.log(`up ${JSON.stringify(updatedUser)}`)

        res.status(200).json(others)


}catch(error){
    next(error)
}

 }


 export const deleteUser = async (req,res,next) =>{
    console.log(req.params.id)

    if( req.user.id !== req.params.id ) return next(errorHandler(401,"you can only delete your own account")) 
    try{
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie("acc_token")
        res.status(200).json("user has been deleted")


}catch(error){
    next(error)
}
 }

 export const getUserListings = async (req,res,next) =>{
    //TODO need to change the condition
    if(req.user.id !== req.params.id) {
        try{
            const listing = await Listing.find({userRef: req.params.id})
            res.status(200).json(listing)
    
        }catch(error){
            next(error)
        }
    }else{
        return next(errorHandler(401,'you can only view your own listings' ))
    }
    
 }