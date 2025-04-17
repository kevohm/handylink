import { validateRequest } from "@/lib/validate"
import connectDB from "@/server/infrastructure/db"
import User from "@/server/infrastructure/schemas/User"
import { userSchema } from "@/server/infrastructure/schemas/validation"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export async function GET() {
    try {
        await connectDB()

        const users = await User.find({})

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    await connectDB();

    try {
        const validation = await validateRequest(req, userSchema);

        if (!validation.success) {
          return NextResponse.json(
            { error: "Validation failed", details: validation.errors },
            { status: 400 }
          );
        }
        const newUser = new User(validation.data);
        await newUser.save();      
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}