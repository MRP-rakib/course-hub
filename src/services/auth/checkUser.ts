import OtpModel from "@/model/otpSchema";
import UserModel from "@/model/usersSchema";
import { sendOTP } from "@/utils/mail";
import { generateOTP } from "@/utils/otp";

interface userDataType {
  username: string;
  email: string;
}

export const CheckUser = async (userData: userDataType) => {
  try {
    const { username, email } = userData;

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      throw new Error("Username or Email already exists");
    }

    const otp = generateOTP();

    await OtpModel.create({
      email:email,
      otp:otp
    })

    await sendOTP(email, otp);
    
    return "OTP sent successfully"

  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};