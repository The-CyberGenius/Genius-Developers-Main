export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Message from "@/models/Message";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { read } = await req.json();
    
    const message = await Message.findByIdAndUpdate(id, { read }, { new: true });
    if (!message) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    const message = await Message.findByIdAndDelete(id);
    if (!message) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
