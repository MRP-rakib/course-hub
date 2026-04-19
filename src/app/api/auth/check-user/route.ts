import { CheckUserCtrl } from "@/backend/controllers/auth/checkUserCtrl";
import dbConnect from "@/backend/lib/db";

 export async function POST(req:Request) {
      await dbConnect()
      return CheckUserCtrl(req)
}
