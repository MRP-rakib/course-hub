import { CheckUser } from "@/services/auth/checkUser";
import { CheckUserSchema } from "@/validation/auth/checkUserSchema";
import z from "zod";


export const CheckUserCtrl=async(req:Request)=>{
        try {
            const body = await req.json()
            const result = CheckUserSchema.safeParse(body)

           if(!result.success){
            return Response.json({
                success:false,
                errors:z.treeifyError(result.error)
            },{status:400})
           }
            
          const message= await CheckUser(result.data)

         return Response.json({
            success:true,
            message
         },{status:200})

            
        } catch (error) {
            console.error(error)
            return Response.json({
                sussess:false,
                message:error
            },{status:500})
            
        }
}