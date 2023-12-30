import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';


export const verifyToken = (req,res,next)=>{

    console.info('usercookie', JSON.stringify(req.cookies));
    const userToken = req.cookies.acc_tokens;
    
    console.info('userToken', JSON.stringify(userToken));
    if (!userToken) return next(errorHandler(401,"Unauthorized User"))

   jwt.verify(userToken,process.env.JWT_SECRET, (err,user)=>{
        if(err) return next(errorHandler(402,'Forbidden'))
        console.log(`verifyUser user: ${JSON.stringify(user)}`)

        req.user = user;//we r getting id from the cookie
        next()
    })
}
