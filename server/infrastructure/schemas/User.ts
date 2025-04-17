import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  fullName: string;
  phoneNumber: string;
  description?: string;
  clerkId:string,
  role: "user" | "tasker" | "admin";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  
  {
    clerkId: { type: String, required: true, unique: true },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: 2,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?\d{10,14}$/, "Phone number is not valid"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Email is not valid"],
    },
    description: {
      type: String,
      maxlength: 500,
    },
    role: {
      type: String,
      enum: ["user", "tasker", "admin"],
      required: [true, "Role is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
