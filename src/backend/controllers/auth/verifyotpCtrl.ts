import { verifyOtp } from "@/backend/services/auth/verifyotp/verifyOtp";

export const VerifyotpCtrl = async (req:Request) => {
  try {
    const {email,otp}= await req.json()
     const message= await verifyOtp({email,otp})
     return Response.json({
        success:true,
        message,
        status:200
     })
  } catch (error) {
  const err = error instanceof Error ? error.message : 'Something went wrong'
    return Response.json({
      success: false,
      error: err,
      status: 500,
    });
  }
};
