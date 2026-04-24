import StudentModel from "@/backend/model/studentSchema"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
export const Signin= async(email:string,password:string)=>{
       const user = await StudentModel.findOne({email})
       if(!user){
        return {success:false,message:'user not found',statusCode:404}
       }
       const checkpass = await bcrypt.compare(password,user.password)
       
       if(!checkpass){
        return {success:false,message:'invalid credential',statusCode:401}
       }
    const accessToken =jwt.sign({userId:user._id},process.env.accessToken!,{expiresIn:'10m'})
    const refreshToken =jwt.sign({userId:user._id},process.env.refreshToken!,{expiresIn:'30d'})
   return {success:true,message:'account login successfull',accessToken:accessToken,refreshToken:refreshToken}

}