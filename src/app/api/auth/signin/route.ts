import { signinnCtrl } from "@/backend/controllers/auth/signinCtrl";
import dbConnect from "@/backend/lib/db";

 export async function POST(request: Request) {
      await dbConnect()
      return signinnCtrl(request)

}
