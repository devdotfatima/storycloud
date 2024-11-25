import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode"; // Fix import if using a specific jwt-decode library

const protectedRoutes = ["/", "/explore"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("access_token");

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Handle public routes
  if (isPublicRoute) {
    if (token?.value) {
      console.log("User already authenticated, redirecting to home");
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (isProtectedRoute) {
    if (!token?.value) {
      console.log("No token found, redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    try {
      console.log({ token: token.value });
      const decoded = jwtDecode<{ exp?: number }>(token.value);

      // Check if the token has expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (!decoded.exp || decoded.exp < currentTime) {
        console.log("Token has expired");

        // Delete the expired token
        const response = NextResponse.redirect(new URL("/login", req.nextUrl));
        response.cookies.set("access_token", "", {
          path: "/",
          expires: new Date(0),
        }); // Delete cookie
        return response;
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Invalid token:", error);

      // Delete the invalid token
      const response = NextResponse.redirect(new URL("/login", req.nextUrl));
      response.cookies.set("access_token", "", {
        path: "/",
        expires: new Date(0),
      }); // Delete cookie
      return response;
    }
  }

  // Allow all other routes
  return NextResponse.next();
}
