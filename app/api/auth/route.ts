import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/server/infrastructure/db";
import User from "@/server/infrastructure/schemas/User";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    return NextResponse.json({});
  } catch (err) {
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
