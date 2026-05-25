import { supabase } from "@/lib/supabaseClient"

export const uploadMediaToSupabase = async(file:File)=>{
    if(!file) return null
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    if(!isImage && !isVideo){
        throw new Error("Only image or video allowed");
    }
    const fileName = `${Date.now()}-${file.name}`
    const bucket = 'media'

    const {error} = await supabase.storage.from(bucket).upload(fileName,file)

    if(error){
        throw new Error(error.message);
    }
   const {data} = supabase.storage.from(bucket).getPublicUrl(fileName)
   return {
    url:data.publicUrl,
    type:(isImage?'image':'video'),
    fileName
   }
}