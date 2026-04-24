import { GetUser } from "@/backend/services/auth/getuser"
export const GetuserCtrl = async(req:Request)=>{
       try {
           const authHeader = req.headers.get('authorization')
           if(!authHeader||!authHeader.startsWith('Bearer')){
            return Response.json({
                success:false,message:'unauthorized'
            },{status:401})
           }
        const token = authHeader.split(' ')[1]
        const userResult = await GetUser(token)
        if(!userResult.success){
            return Response.json({
                success:false,message:userResult.message
            },{status:userResult.statusCode||401})
        }
        return Response.json({
            success:true , message:userResult.message, data:userResult.user
        },{status:200})
             
       } catch (error) {
       console.error('getUserCtrl error:',error);
    return Response.json(
      { success: false, message: 'internal server error'},
      { status: 500 },
    );
       }
}