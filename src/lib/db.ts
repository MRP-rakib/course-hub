import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
let connectionPromise: Promise<void> | null = null;

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  if (connectionPromise) return connectionPromise;

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not defined");
  }

  connectionPromise = (async () => {
    try {
      const db = await mongoose.connect(process.env.DATABASE_URL!);
      connection.isConnected = db.connections[0].readyState;
      console.log("DB connected successfully");
    } catch (error) {
      console.error("Database connection failed", error);
      connectionPromise = null;
      throw new Error("Database connection failed");
    }
  })();

  return connectionPromise;
}

export default dbConnect;