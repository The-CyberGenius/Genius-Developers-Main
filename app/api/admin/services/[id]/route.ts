import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
import { revalidatePortfolio } from "@/lib/revalidate";

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { id } = await params;
    const service = await Service.findByIdAndUpdate(id, data, { new: true });
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
        revalidatePortfolio();
    
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
        revalidatePortfolio();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
