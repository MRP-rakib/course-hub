import { getUserCtrl } from "@/backend/controllers/userControllers";
import dbConnect from "@/backend/db/db";


 
export async function POST(request: Request) {
    await dbConnect()
    
         return getUserCtrl(request)
}

 