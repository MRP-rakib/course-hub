import { VerifyotpCtrl } from "@/backend/controllers/auth/verifyotpCtrl";
import dbConnect from "@/backend/lib/db";

 export async function POST(request: Request) {
      await dbConnect()
    return VerifyotpCtrl(request)
}
