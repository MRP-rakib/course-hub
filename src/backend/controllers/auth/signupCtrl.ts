import { Signup } from "@/backend/services/auth/signup";
import {StudentSchema} from '@/backend/validation/auth/StudentSchema'
export const signupCtrl = async (req: Request,role:string) => {
  try {
    const body = await req.json();
    const result = StudentSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { success: false, message: result.error.issues[0].message },
        { status: 400 },
      );
    }
    const signupResult = await Signup(result.data,role);
    if(!signupResult.success){
      return Response.json({success:false,message:signupResult.message},{status:400})
    }

    return Response.json({ success: true, message:signupResult.message }, { status: 200 });
  } catch (error) {
    console.error('signupCtrl error:',error);
    return Response.json(
      {
        success: false,
        message: 'internal server error',
      },
      { status: 500 }
    );
  }
};
