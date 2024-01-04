import { type NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const response = (url: string) =>
    NextResponse.redirect(new URL(url, req.url));

  if (req.nextUrl.pathname.startsWith("/vendas")) {
    return response("/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/vendas"],
};
