import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { revalidatePortfolio } from "@/lib/revalidate";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json(await Project.find().sort({ order: 1, createdAt: -1 }));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const project = await Project.create(await req.json());
    revalidatePortfolio();
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
