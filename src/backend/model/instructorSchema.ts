import mongoose, { Model, Schema } from "mongoose";
export interface Instructor {
  username: string;
  fullname: string;
  email:string;
  password:string
  role:'admin'|'student'|'instructor'
  avatar: string;
  dateOfBirth: Date;
  mobileNumber: string;
  bio?: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  address:string;
}
const InstructorSchema = new Schema<Instructor>(
  {
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
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
    role: {
      type: String,
      enum: ["admin", "student", "instructor"],
      default: "student",
    },
    mobileNumber: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    dateOfBirth: {
      type: Date,
    },

    avatar: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);
const InstructorModel:Model<Instructor>=mongoose.models.Instructor|| mongoose.model<Instructor>('Instructor',InstructorSchema)
export default InstructorModel