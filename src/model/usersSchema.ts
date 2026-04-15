import mongoose, { Model, Schema } from "mongoose";
export interface User{
  username: string;
  fullname: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  mobileNumber: string;
  bio?: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  createdAt: Date;
  updatedAt: Date;
  role: "admin" | "student" | "instructor";
}
const UserSchema = new Schema<User>(
{
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

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

    dateOfBirth: {
      type: Date,
      required: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
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