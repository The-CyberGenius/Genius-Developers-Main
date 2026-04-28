import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { id } = await params;
    const project = await Project.findByIdAndUpdate(id, data, { new: true });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    // Auto-update portfolio instantly
    revalidatePath("/");
    
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    // Auto-update portfolio instantly
    revalidatePath("/");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
