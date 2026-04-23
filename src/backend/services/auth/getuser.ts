import StudentModel from '@/backend/model/studentSchema'
import UserModel from '@/backend/model/usersSchema'
import jwt from 'jsonwebtoken'
export const GetUser=async(token:string)=>{
    try {
        const decoded = jwt.verify(token,process.env.accessToken!)as {userId:string}
        const user = await UserModel.findById(decoded.userId).select('-password')
        if(!user){
            throw new Error('user not found')
        }
        let studentData = null
        if(user.role === 'student'){
            studentData=await StudentModel.findOne({userID:user._id}).lean()
        }

        const margedUser = {...user.toObject(),...(studentData||{})}
        return margedUser
    } catch (error) {
        throw error
    }
}