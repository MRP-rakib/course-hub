import mongoose, { Model, Schema } from "mongoose";
export interface Student {
  userID: mongoose.Types.ObjectId;
  username: string;
  fullname: string;
  avatar: string;
  dateOfBirth: Date;
  mobileNumber: string;
  bio?: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  address:string;
}
const StudentSchema = new Schema<Student>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
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
const StudentModel:Model<Student>=mongoose.models.Student|| mongoose.model<Student>('Student',StudentSchema)
export default StudentModel