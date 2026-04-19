import dbConnect from "@/backend/lib/db";
import { verifyOtp } from "@/services/auth/verifyOtp";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return Response.json(
        { success: false, message: "missing data", status: 400 },
        { status: 400 }
      );
    }

    const message = await verifyOtp(String(email), String(code));

    return Response.json({ success: true, message, status: 200 }, { status: 200 });
  } catch (error) {
    console.log("verification err:", error);
    const err = error as Error;
    const msg = err.message || "internal server error";
    const status = msg.includes("Invalid") || msg.includes("expired") ? 400 : 500;
    return Response.json({ success: false, message: msg, status }, { status });
  }
}
