import OtpModel from "@/backend/model/otpSchema"
import { otptype} from "@/types/otptype"


export const verifyOtp=async({email,code}:otptype)=>{
    try {
        if(!code){
            throw new Error('otp is required')
        }
       const otpRecord = await OtpModel.findOne({email})
       if(!otpRecord){
        throw new Error('otp expired')
       }
       if(otpRecord.code !==code){
           throw new Error('invalid otp')
       }
       await OtpModel.deleteOne({ email });
     return 'otp successfully verify'
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        }
        throw error
    }
}