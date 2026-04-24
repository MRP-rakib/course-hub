import { Signin } from "@/backend/services/auth/signin";
import { NextResponse } from "next/server";

export const signinCtrl = async (req: Request) => {
  try {
     const {email,password} = await req.json()
     const data = await Signin(email,password)
    
    const res =NextResponse.json({
        success:true,
        message:data.message,
        token:data.accessToken
    },{status:200})
    res.cookies.set({
        name:'refreshToken',
        value:data.refreshToken,
        httpOnly:true,
        sameSite:'none',
        path:'/',
        maxAge:60*60*24*30,
        secure:true
    })
    return res
  } catch (error) {
    console.error(error);
    const err = error as Error;
    return Response.json(
      { success: false, error: err.message || "something went wrong" },
      { status: 400 },
    );
  }
};
