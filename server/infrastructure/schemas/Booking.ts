import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
  taskId: Types.ObjectId;
  taskerId: Types.ObjectId;
  userId: string;
  status: "pending" | "completed" | "cancelled";
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    taskerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;
