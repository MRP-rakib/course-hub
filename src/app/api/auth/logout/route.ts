import { NextResponse } from "next/server";

export async function POST(req:Request){
  try {
     const response = NextResponse.json({
    success:true,
    message:'logged out successfully'
   },{status:200})
   response.cookies.delete('refreshToken')
   return response
  } catch (error) {
    console.log("logout error:",error);
    
    return NextResponse.json({
        success:false,
        error:'logout failed'
    },{status:500})
  }
}