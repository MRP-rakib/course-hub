import OtpModel from "@/backend/model/otpSchema";
import StudentModel from "@/backend/model/studentSchema";
import { sendOTP } from "@/backend/utils/mail";
import { generateOTP } from "@/backend/utils/otp";

interface userDataType {
  username: string;
  email: string;
}

export const CheckUser = async (userData: userDataType) => {
  const { username, email } = userData;

  try {
    const existingUsername = await StudentModel.findOne({ username });
  if (existingUsername) {
    return {success:false,message:'username exists'}
  }

  const existingEmail = await StudentModel.findOne({ email });
  if (existingEmail) {
    return{success:false,message:'email already exists'}
  }

  const code = generateOTP();

  await OtpModel.deleteMany({ email });

  const otpRecord = await OtpModel.create({
    email,
    code,
  });

  try {
    await sendOTP(email, code);
  } catch {
    await OtpModel.deleteOne({ _id: otpRecord._id });
    throw new Error("Failed to send OTP email. Please try again.");
  }

  return {success:true,message:'otp sent successfull'}
  } catch (error) {
    throw error
  }
};