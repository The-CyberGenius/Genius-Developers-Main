import { NextResponse } from "next/server";

// httpOnly cookies cannot be cleared from client JS — must be done server-side.
export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });

  // Overwrite the cookie with an immediately-expiring one matching the original
  // attributes so the browser actually drops it.
  response.cookies.set({
    name: "admin-token",
    value: "",
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return response;
}
