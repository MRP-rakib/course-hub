import mongoose, { Model, Schema } from "mongoose";
export interface User{
  email: string;
  password: string;
  role: "admin" | "student" | "instructor";
}
const UserSchema = new Schema<User>(
{
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "instructor"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
)
const UserModel:Model<User>= mongoose.models.User ||mongoose.model<User>('User',UserSchema)
export default UserModel