import { type NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const session = req.cookies.get("session");

  const response = (url: string) =>
    NextResponse.redirect(new URL(url, req.url));

  if (
    session?.value === "unauthenticated" &&
    req.nextUrl.pathname.startsWith("/user")
  ) {
    return response("/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user/:path*"],
};
