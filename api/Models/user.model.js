
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required:true,
    unique: true,
},
  email:{
    type: String,
    required:true,
    unique: true,
},
  password:{
    type: String,
    required:true,
    
},
avatar:{
  type: String,
 default: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/2048px-Breezeicons-actions-22-im-user.svg.png"
},

}, {timestamps : true})


const User = mongoose.model("User",userSchema)

export default User;