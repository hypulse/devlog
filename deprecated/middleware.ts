import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDb from "./connectDb";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await connectDb();
  const response = NextResponse.next();
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
