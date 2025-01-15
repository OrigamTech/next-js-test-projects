// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import { decrypt } from "./lib/session";

// const protectedRoutes = ["/news", "/archive"];
// const publicRoutes = ["/login"];

// export const middleware = async (request: NextRequest) => {
//   const { pathname } = request.nextUrl;
//   // console.log("Request to:", pathname);

//   // Check if the current route is protected
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );
//   // console.log(`Is Protected Route: ${isProtectedRoute}`);
//   const isPublicRoute = publicRoutes.includes(pathname);
//   // console.log(`Is Public Route: ${isPublicRoute}`);

//   const cookie = (await cookies()).get("session")?.value;
//   console.log(`Session Cookie: ${cookie}`);

//   const session = await decrypt(cookie);
//   // console.log(`Session: ${JSON.stringify(session)}`);

//   if (isProtectedRoute && !session?.userId) {
//     // Store the original route the user wanted to visit
//     const redirectUrl = pathname;

//     // Set the redirect URL in a cookie for later use
//     const response = NextResponse.redirect(new URL("/login", request.nextUrl));
//     response.cookies.set("redirectTo", redirectUrl);

//     return response;
//   }

//   if (isPublicRoute && session?.userId) {
//     // console.log("Redirecting to /news because user is already authenticated");
//     return NextResponse.redirect(new URL("/news", request.nextUrl));
//   }

//   return NextResponse.next();
// };

// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { signIn } from "next-auth/react";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!token) {
//     // Redirect to the login page if the user is not authenticated
//     // const loginUrl = new URL(
//     //   `${process.env.AUTH_ISSUER}/protocol/openid-connect/auth?client_id=${
//     //     process.env.TEST_KEYCLOAK_CLIENT_ID
//     //   }&redirect_uri=${encodeURIComponent(
//     //     process.env.NEXTAUTH_URL as string
//     //   )}&response_type=code&scope=openid`
//     // );
//     // return NextResponse.redirect(loginUrl.toString());
//     signIn("keycloak")
//   }

//   // Proceed to the requested page if the user is authenticated
//   // return NextResponse.next();
// }

// // Specify the paths where the middleware should be applied
// export const config = {
//   matcher: [
    
//     "/news/:path*",
//     "/archive/:path*",
//   ],
// };

import React from 'react'

const middleware = () => {
}
export default middleware