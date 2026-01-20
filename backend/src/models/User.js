import mongoose, { Schema } from "mongoose";

const userschema = new Schema({
    name : {
       type : String,
       required : true
    },
    email :{ 
        type :String
    },
    profileImage:{
        type:String,
        default:""
    },
    clerkId:{
        type :String,
        required : true,
        unique:true
    }
   
},{timestamps:true})

 const User = mongoose.model("User",userschema)
 export default User;


