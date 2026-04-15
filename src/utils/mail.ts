import nodemailer from "nodemailer";

export async function sendOTP(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"CourseHub" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
    html: `
      <div style="font-family: Arial;">
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}