import { GetuserCtrl } from "@/backend/controllers/auth/getUserCtrl";
import dbConnect from "@/backend/lib/db";

export async function GET(req:Request) {
    await dbConnect()
    return GetuserCtrl(req,)
}