import StudentModel from "@/backend/model/studentSchema";
import UserModel from "@/backend/model/usersSchema";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

interface UserType {
  username:string
  fullname:string
  email: string;
  password: string;
}
export const Signup = async (userData: UserType, role: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { username, email, fullname, password } = userData;
    if (!password) {
      throw new Error("password are required");
    }
    const hasspass = await bcrypt.hash(password, 10);
    const user = await UserModel.create([{
      email,
      password: hasspass,
      role,
    }],{session});

    console.log(username);
    console.log(fullname);
    
    
    if (role === "student") {
      await StudentModel.create([{
        userID: user[0]._id,
        username: username,
        fullname: fullname,
      }],{session});
    }
    await session.commitTransaction();
    session.endSession();
    return "account create successfull";
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};
