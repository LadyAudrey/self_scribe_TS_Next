import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newURL = new URL("/", req.nextUrl.origin);
    return Response.redirect(newURL);
  }
  if (req.auth && req.nextUrl.pathname === "/") {
    const newURL = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newURL);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
