import InstructorModel from '@/backend/model/instructorSchema'
import StudentModel from '@/backend/model/studentSchema'
import jwt from 'jsonwebtoken'
export const GetUser=async(token:string)=>{
    try {
        const decoded = jwt.verify(token,process.env.accessToken!)as {userId:string}
        const user = await StudentModel.findById(decoded.userId).select('-password') || await InstructorModel.findById(decoded.userId).select('-password')
        if(!user){
            return({success:false,message:'user not found',statusCode:404})
        }
       return {success:true,message:'user found',user:user}

        
    } catch (error) {
        throw error
    }
}