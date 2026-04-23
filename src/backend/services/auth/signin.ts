import UserModel from "@/backend/model/usersSchema"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
export const Signin= async(email:string,password:string)=>{
        if(!email||!password){
            throw new Error('all field are required')
        }
       const user = await UserModel.findOne({email})
       if(!user){
        throw new Error('user does not exists pleace signup')
       }
       const checkpass = await bcrypt.compare(password,user.password)

       if(!checkpass){
        throw new Error("wrong password ")
       }
    const accessToken =jwt.sign({userId:user.id},process.env.accessToken!,{expiresIn:'1m'})
    const refreshToken =jwt.sign({userId:user.id},process.env.refreshToken!,{expiresIn:'2m'})
   return {message:'account login successfull',accessToken,refreshToken}

}