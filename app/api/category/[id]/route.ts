import connectDB from "@/server/infrastructure/db";
import Category from "@/server/infrastructure/schemas/Category";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string };
}

// GET category by ID
export async function GET(req: Request, { params }: Params) {
    await connectDB();

    try {
        const {id} = await params
        const category = await Category.findById(id);
        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }
}

// UPDATE category by ID
export async function PUT(req: Request, { params }: Params) {
    await connectDB();

    try {
        const {id} = await params
        const body = await req.json();
        const updatedCategory = await Category.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update category" }, { status: 400 });
    }
}

// DELETE category by ID
export async function DELETE(req: Request, { params }: Params) {
    await connectDB();

    try {
        const {id} = await params
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete category" }, { status: 400 });
    }
}
