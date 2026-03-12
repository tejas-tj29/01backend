import mongoose,{Schema} from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video",
            required:true,
        }
    ],
    password:{
        type:String,
        required:[true,"password is required"],
        unique:true,
    },
    refreshToken:{
        type:String,
    },
},{timestamps:true})

userSchema.pre("save",async function(next){
    this.password = bacrypt.hash(this.password,10);
})//(Here we have to write callback but never use arrow fn since this cannot get reference inside arrow fn)

export const User = mongoose.model("User",userSchema);