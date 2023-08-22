import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "./server/connectToDatabase";

export async function middleware(req: NextRequest) {
  await connectToDatabase();
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
