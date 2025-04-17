import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITask extends Document {
  name: string;
  taskerId: Types.ObjectId;
  categoryId: Types.ObjectId;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    taskerId: {
      type: Schema.Types.ObjectId,
      ref: "Tasker",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } 
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default Task;
