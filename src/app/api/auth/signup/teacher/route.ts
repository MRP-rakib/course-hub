import { signupCtrl } from "@/backend/controllers/auth/signupCtrl";
import dbConnect from "@/backend/lib/db";

 export async function POST(request: Request) {
      await dbConnect()
      const role='teacher'
      return signupCtrl(request,role)

}
