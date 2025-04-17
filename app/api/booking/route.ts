import { validateRequest } from "@/lib/validate";
import connectDB from "@/server/infrastructure/db";
import Booking from "@/server/infrastructure/schemas/Booking";
import { bookingSchema } from "@/server/infrastructure/schemas/validation";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const bookings = await Booking.find({}).populate("taskId taskerId");

        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectDB();

    try {
        const validation = await validateRequest(req, bookingSchema);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validation.errors },
                { status: 400 }
            );
        }
        const newBooking = new Booking(validation.data);

        await newBooking.save();
        return NextResponse.json(newBooking, { status: 201 });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}