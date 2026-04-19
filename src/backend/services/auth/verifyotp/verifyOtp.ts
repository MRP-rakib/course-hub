import OtpModel from "@/backend/model/otpSchema"
import { otptype} from "@/types/otptype"


export const verifyOtp=async({email,otp}:otptype)=>{
    try {
        if(!otp){
            throw new Error('otp is required')
        }
       const otpRecord = await OtpModel.findOne({email})
       if(!otpRecord){
        throw new Error('otp expired')
       }
       if(otpRecord.otp !==otp){
           throw new Error('invalid otp')
       }
     return 'otp successfully verify'
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        }
        throw error
    }
}