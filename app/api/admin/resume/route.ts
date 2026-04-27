export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function GET() {
  try {
    await connectToDatabase();
    let resume = await Resume.findOne();
    if (!resume) resume = await Resume.create({});
    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const resume = await Resume.findOne();
    if (!resume) {
      await Resume.create(data);
    } else {
      await Resume.findByIdAndUpdate(resume._id, data, { new: true });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}
