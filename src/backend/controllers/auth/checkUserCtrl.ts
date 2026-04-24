import { CheckUser } from "@/backend/services/auth/checkUser";
import { CheckUserSchema } from "@/backend/validation/auth/checkUserSchema";

export const CheckUserCtrl = async (req: Request) => {
  try {
    const body = await req.json()
    const result = CheckUserSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { success: false, message: result.error.issues[0].message },
        { status: 400 }      
      );
    }

    const servicesResult = await CheckUser(result.data);
if(!servicesResult.success){
  return Response.json({
    success:false,
    message:servicesResult.message
  },{status:400})
}
    return Response.json(
      { success: true, message:servicesResult.message },
     { status: 200 } 
    )
  } catch (error) {
    console.error('checkuserCtrl error:',error);
   return Response.json({
    success:false,
    message:'internal server error',
   },{status:500})
  }
};