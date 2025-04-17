import connectDB from "@/server/infrastructure/db";
import Review from "@/server/infrastructure/schemas/Review";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

// GET review by ID
export async function GET(req: Request, { params }: Params) {
  await connectDB();

  try {
    const {id} = await params
    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
  }
}

// UPDATE review by ID
export async function PUT(req: Request, { params }: Params) {
  await connectDB();

  try {
    const {id} = await params
    const body = await req.json();
    const updatedReview = await Review.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(updatedReview);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update review" }, { status: 400 });
  }
}

// DELETE review by ID
export async function DELETE(req: Request, { params }: Params) {
  await connectDB();

  try {
    const {id} = await params
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 400 });
  }
}
