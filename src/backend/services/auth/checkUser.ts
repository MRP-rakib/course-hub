import OtpModel from "@/backend/model/otpSchema";
import UserModel from "@/backend/model/usersSchema";
import { sendOTP } from "@/backend/utils/mail";
import { generateOTP } from "@/backend/utils/otp";

interface userDataType {
  username: string;
  email: string;
}

export const CheckUser = async (userData: userDataType) => {
  const { username, email } = userData;
  const existingUsername = await UserModel.findOne({username})

  if (existingUsername) {
    throw new Error("Username already exists");
  }
 const existingEmail = await UserModel.findOne({email})

  if (existingEmail) {
    throw new Error("email already exists");
  }

  const code = generateOTP();

  await OtpModel.deleteMany({ email });

  const otpRecord = await OtpModel.create({
    email,
    code
  });

  try {
    await sendOTP(email, code);
  } catch {
    await OtpModel.deleteOne({ _id: otpRecord._id });
    throw new Error("Failed to send OTP email. Please try again.");
  }

  return "OTP sent successfully";
};