export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Seo from "@/models/Seo";

export async function GET() {
  try {
    await connectToDatabase();
    let seo = await Seo.findOne();
    if (!seo) seo = await Seo.create({});
    return NextResponse.json(seo);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch SEO settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const seo = await Seo.findOne();
    if (!seo) {
      await Seo.create(data);
    } else {
      await Seo.findByIdAndUpdate(seo._id, data, { new: true });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update SEO" }, { status: 500 });
  }
}
