import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { revalidatePortfolio } from "@/lib/revalidate";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const skills = await Skill.find().sort({ order: 1 });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const skill = await Skill.create(data);
    
        revalidatePortfolio();
    
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
