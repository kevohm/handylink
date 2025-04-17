import { validateRequest } from "@/lib/validate";
import connectDB from "@/server/infrastructure/db";
import Review from "@/server/infrastructure/schemas/Review";
import { reviewSchema } from "@/server/infrastructure/schemas/validation";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const reviews = await Review.find({}).populate("taskerId").populate("taskId");

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectDB();

    try {
        const validation = await validateRequest(req, reviewSchema);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validation.errors },
                { status: 400 }
            );
        }
        
        const newReview = new Review(validation.data);

        await newReview.save();
        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
}