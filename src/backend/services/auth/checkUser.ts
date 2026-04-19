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

  const existingUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new Error("Username or Email already exists");
  }

  const otp = generateOTP();

  await OtpModel.deleteMany({ email });

  const otpRecord = await OtpModel.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  try {
    await sendOTP(email, otp);
  } catch {
    await OtpModel.deleteOne({ _id: otpRecord._id });
    throw new Error("Failed to send OTP email. Please try again.");
  }

  return "OTP sent successfully";
};