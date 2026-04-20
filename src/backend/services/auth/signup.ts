import UserModel from "@/backend/model/usersSchema"
import bcrypt from "bcryptjs"

interface UserType{
    username:string,
    fullname:string,
    email:string,
    password:string
}
export const Signup=async(userData:UserType,role:string)=>{
   const{username,email,fullname,password} = userData
   if(!password){
    throw new Error('password are required')
   }
  const hasspass = await bcrypt.hash(password,10)
  await UserModel.create({
    fullname:fullname,
    username:username,
    email:email,
    password:hasspass,
    role:role
  })
  return 'account create successfull'
}