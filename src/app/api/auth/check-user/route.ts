import { CheckUserCtrl } from "@/controllers/auth/checkUserCtrl";
import dbConnect from "@/lib/db";

 export async function POST(req:Request) {
      await dbConnect()
      return CheckUserCtrl(req)
}
