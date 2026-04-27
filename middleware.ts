import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;

  const verifiedToken = token
    ? await verifyAuth(token).catch((err) => {
        console.error(err.message);
      })
    : null;

  const { pathname } = req.nextUrl;

  // If user is trying to access /admin/login but is already authenticated
  if (pathname === "/admin/login") {
    if (verifiedToken) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // If user is trying to access any other /admin route but is NOT authenticated
  if (pathname.startsWith("/admin")) {
    if (!verifiedToken) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
