import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/lib/prisma";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🧠 Step 1: Convert natural text to structured JSON
async function parseToJSON(input: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Convert natural language search text into a structured JSON object describing a tasker search. Include possible keys: 'skills' (array), 'traits' (array), 'gender', 'budget', 'name'. Respond with **only** valid JSON (no explanations).",
      },
      { role: "user", content: input },
    ],
    temperature: 0,
  });

  const content = response.choices[0].message.content?.trim();
  if (!content) throw new Error("Empty response from OpenAI");

  try {
    return JSON.parse(content);
  } catch {
    console.warn("Failed to parse JSON:", content);
    throw new Error("OpenAI did not return valid JSON");
  }
}

// 🔍 Step 2: Build Prisma query
async function searchTaskers(rawQuery: string) {
  const parsed = await parseToJSON(rawQuery);

  const filters: any = { role: "tasker" };
  const AND: any[] = [];

  // skills
  if (parsed.skills?.length) {
    AND.push({
      OR: parsed.skills.map((skill: string) => ({
        skills: { has: skill },
      })),
    });
  }

  // traits → match bio
  if (parsed.traits?.length) {
    AND.push({
      OR: parsed.traits.map((trait: string) => ({
        bio: { contains: trait, mode: "insensitive" },
      })),
    });
  }

  // gender
  if (parsed.gender) {
    AND.push({
      gender: { contains: parsed.gender, mode: "insensitive" },
    });
  }

  // budget (if applicable)
  if (parsed.budget) {
    AND.push({
      profile: {
        path: ["rate"],
        lte: parsed.budget,
      },
    });
  }

  // name
  if (parsed.name) {
    AND.push({
      OR: [
        { first_name: { contains: parsed.name, mode: "insensitive" } },
        { last_name: { contains: parsed.name, mode: "insensitive" } },
      ],
    });
  }

  if (AND.length) filters["AND"] = AND;

  const results = await prisma.user.findMany({
    where: filters,
    take: 20,
  });

  return results;
}

// ✅ API endpoint
export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const results = await searchTaskers(query);
    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    console.error("Error searching taskers:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
