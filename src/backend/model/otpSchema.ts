import mongoose, { Schema } from "mongoose";
// import { number } from "zod";
interface IOtp{
    email: string
    code: string
    createdAt: Date
}
const OtpSchema = new Schema<IOtp>(
    {
        email:{type:String,required:true},
        code:{type:String,required:true},
        createdAt:{type:Date,default:Date.now,expires:300}

    }
)

const OtpModel = mongoose.models.Otp ||mongoose.model<IOtp>('Otp',OtpSchema)

export default OtpModel