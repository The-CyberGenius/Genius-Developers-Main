export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function GET() {
  try {
    await connectToDatabase();
    // Assuming a single profile document for the portfolio owner
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = await Profile.create({}); // Creates with default values
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    // We just update the first profile document found
    const profile = await Profile.findOne();
    
    if (!profile) {
      await Profile.create(data);
    } else {
      await Profile.findByIdAndUpdate(profile._id, data, { new: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
