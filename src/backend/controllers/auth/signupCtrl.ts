import { Signup } from "@/backend/services/auth/signup";
import { UserSchema } from "@/backend/validation/auth/userSchema";

export const signupCtrl = async (req: Request,role:string) => {
  try {
    const body = await req.json();
    const result = UserSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 },
      );
    }
    const message = await Signup(result.data,role);

    return Response.json({ success: true, message }, { status: 200 });
  } catch (error) {
    console.error(error);
    const err = error as Error;
    return Response.json(
      { success: false, error: err.message || "something went wrong" },
      { status: 400 },
    );
  }
};
