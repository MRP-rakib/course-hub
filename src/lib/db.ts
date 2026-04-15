import mongoose from "mongoose";
type connectionObject ={
    isConnected?:number
}

const connection:connectionObject={}

async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log('already connected to database');
        return
    }

    try {
       const db = await mongoose.connect(process.env.DATABASE_URL||'')
       connection.isConnected = db.connections[0].readyState

       console.log("DB Connection successfully");
       
    } catch (error) {
        console.log('database connectons failed',error);
        
        process.exit(1)
    }
}

export default dbConnect