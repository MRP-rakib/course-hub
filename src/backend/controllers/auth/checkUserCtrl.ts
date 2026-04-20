import { CheckUser } from "@/backend/services/auth/checkUser";
import { CheckUserSchema } from "@/backend/validation/auth/checkUserSchema";

export const CheckUserCtrl = async (req: Request) => {
  try {
    const body = await req.json()
    const result = CheckUserSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }      
      );
    }

    const message = await CheckUser(result.data);

    return Response.json(
      { success: true, message },
     { status: 200 } 
    )
  } catch (error) {
    console.error(error);
     const err =
      error instanceof Error ? error.message : "something went wrong";
    return Response.json(
      { success: false, error: err},
     { status: 400 } 
    );
  }
};