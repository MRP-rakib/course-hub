import InstructorModel from "@/backend/model/instructorSchema";
import StudentModel from "@/backend/model/studentSchema";
import bcrypt from "bcryptjs";


interface UserType {
  username:string
  fullname:string
  email: string;
  password: string;
}
export const Signup = async (userData: UserType, role: string) => {
  
  try {
    const { username, email, fullname, password } = userData;
    const existingUsername = await StudentModel.findOne({ username })|| await InstructorModel.findOne({username})
  if (existingUsername) {
    return {success:false,message:'username exists'}
  }
  const existingEmail = await StudentModel.findOne({ email }) || await InstructorModel.findOne({email})
    if (existingEmail) {
      return{success:false,message:'email already exists'}
    }
    if (!password) {
      return {success:false,message:'password required'}
    }
    const hasspass = await bcrypt.hash(password, 10);
   
    if (role === "student") {
      await StudentModel.create({
        username,
        fullname,
        email,
        password:hasspass,
        role,
      });
    }
    
    if(role === 'instructor'){
      await InstructorModel.create({
         username,
        fullname,
        email,
        password:hasspass,
        role,
      })
    }
    
    return {success:true,message:'account create done'}

  } catch (error) {
    throw error;
  }
};
