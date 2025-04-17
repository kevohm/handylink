import connectDB from "@/server/infrastructure/db";
import Task from "@/server/infrastructure/schemas/Task";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

// GET task by ID
export async function GET(req: Request, { params }: Params) {
  await connectDB();

  try {
    const { id } = params;
    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }
}

// UPDATE task by ID
export async function PUT(req: Request, { params }: Params) {
  await connectDB();

  try {
    const { id } = params;
    const body = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 400 });
  }
}

// DELETE task by ID
export async function DELETE(req: Request, { params }: Params) {
  await connectDB();

  try {
    const { id } = params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 400 });
  }
}
