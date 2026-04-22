import { GetUser } from "@/backend/services/auth/getuser"
import { success } from "zod"

export const GetuserCtrl = async(req:Request)=>{
       try {
           const authHeader = req.headers.get('authorization')
           if(!authHeader||!authHeader.startsWith('Bearer')){
            return Response.json({
                success:false,error:'unauthorized'
            },{status:401})
           }
        const token = authHeader.split(' ')[1]
        const user = await GetUser(token)
        return Response.json({
            success:true , data:user
        },{status:200})
             
       } catch (error) {
       console.error(error);
    const err = error as Error;
    return Response.json(
      { success: false, error: err.message || "something went wrong" },
      { status: 401 },
    );
       }
}