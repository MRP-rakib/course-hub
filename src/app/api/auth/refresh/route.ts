import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

type DecodedRefreshToken = JwtPayload & {
  id: string;
};

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {success:false,message: "No refresh token" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.refreshToken!
    ) as DecodedRefreshToken;

    const newAccessToken = jwt.sign({userId:decoded.userId,role:decoded.role},process.env.accessToken!,{expiresIn:'10m'})


    return NextResponse.json({
      success:true,message:'accesstoken succesfully genarated',
      token: newAccessToken,
    });

  } catch (error) {
    console.log('refrshRoute error:',error);
    return NextResponse.json(
      {success:false ,message: "internal server error" },
      { status: 500 }
    );
  }
}