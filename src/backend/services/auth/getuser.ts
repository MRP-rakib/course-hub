import UserModel from '@/backend/model/usersSchema'
import jwt from 'jsonwebtoken'
export const GetUser=async(token:string)=>{
    try {
        const decoded = jwt.verify(token,process.env.accessToken!)as {userId:string}
        const user = await UserModel.findById(decoded.userId).select('-password')
        if(!user){
            throw new Error('user not found')
        }
        return user
    } catch (error) {
        throw error
    }
}