import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Skill from "@/models/Skill";

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { id } = await params;
    const skill = await Skill.findByIdAndUpdate(id, data, { new: true });
    if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
