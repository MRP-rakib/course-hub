import { Signin } from "@/backend/services/auth/signin";
import { NextResponse } from "next/server";

export const signinCtrl = async (req: Request) => {
  try {
     const {email,password} = await req.json()
     if(!email||!password){
      return Response.json({
        success:false,
        message:'all field are required'
      },{status:400})
     }
     const signinResult = await Signin(email,password)
    if(!signinResult.success){
      return Response.json({
        success:false,message:signinResult.message
      },{status:signinResult.statusCode||400})
    }
    const res =NextResponse.json({
        success:true,
        message:signinResult.message,
        token:signinResult.accessToken
    },{status:200})
    res.cookies.set({
        name:'refreshToken',
        value:signinResult.refreshToken as string,
        httpOnly:true,
        sameSite:'none',
        path:'/',
        maxAge:60*60*24*30,
        secure:true
    })
    return res
  } catch (error) {
    console.error('signinCtrl error:',error);
    return Response.json(
      { success: false, message:'internal server error'},
      { status: 500 },
    );
  }
};
