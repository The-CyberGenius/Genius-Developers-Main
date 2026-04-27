import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const uri = process.env.MONGODB_URI;
  const adminPw = process.env.ADMIN_PASSWORD;
  const jwtKey = process.env.JWT_SECRET_KEY;

  // Try connecting
  let dbStatus = "not_tested";
  let dbError = "";

  try {
    const mongoose = await import("mongoose");
    const connectToDatabase = (await import("@/lib/mongodb")).default;
    await connectToDatabase();
    dbStatus = "connected";
  } catch (e: any) {
    dbStatus = "error";
    dbError = e?.message || "Unknown error";
  }

  return NextResponse.json({
    env: {
      MONGODB_URI: uri ? `set (${uri.slice(0, 30)}...)` : "NOT SET ❌",
      ADMIN_PASSWORD: adminPw ? "set ✅" : "NOT SET ❌",
      JWT_SECRET_KEY: jwtKey ? "set ✅" : "NOT SET ❌",
    },
    database: {
      status: dbStatus,
      error: dbError || null,
    },
  });
}
