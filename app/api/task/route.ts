import { validateRequest } from "@/lib/validate";
import connectDB from "@/server/infrastructure/db";
import Task from "@/server/infrastructure/schemas/Task"; // Import the Task model
import { taskSchema } from "@/server/infrastructure/schemas/validation"; // Assume you have a validation schema for tasks
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const tasks = await Task.find({}); // Fetch all tasks

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectDB();

    try {
        const validation = await validateRequest(req, taskSchema); // Validate the request body

        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validation.errors },
                { status: 400 }
            );
        }

        const newTask = new Task(validation.data); // Create a new task
        await newTask.save();

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}