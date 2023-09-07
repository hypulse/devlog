import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // let token = request.cookies.get("token")?.value || "";
  // const response = NextResponse.next();
  // response.cookies.set("token", token);
  // return response;
}
