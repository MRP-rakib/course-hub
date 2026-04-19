import mongoose, { Schema } from "mongoose";
// import { number } from "zod";
interface IOtp{
    email: string
    otp: number
    createdAt: Date
}
const OtpSchema = new Schema<IOtp>(
    {
        email:{type:String,required:true},
        otp:{type:Number,required:true},
        createdAt:{type:Date,default:Date.now,expires:60}

    }
)

const OtpModel = mongoose.models.Otp ||mongoose.model<IOtp>('Otp',OtpSchema)

export default OtpModel