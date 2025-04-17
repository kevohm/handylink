import { validateRequest } from "@/lib/validate";
import connectDB from "@/server/infrastructure/db";
import Category from "@/server/infrastructure/schemas/Category";
import { categorySchema } from "@/server/infrastructure/schemas/validation";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const categories = await Category.find({});

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectDB();

    try {
        const validation = await validateRequest(req, categorySchema);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validation.errors },
                { status: 400 }
            );
        }


        const newCategory = new Category(validation.data);

        await newCategory.save();
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}
