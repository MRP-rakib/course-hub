import { CheckUser } from "@/services/auth/checkUser";
import { CheckUserSchema } from "@/validation/auth/checkUserSchema";

export const CheckUserCtrl = async (req: Request) => {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  try {
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
    );
  } catch (error) {
    console.error(error);
    const err = error as Error;
    return Response.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
};