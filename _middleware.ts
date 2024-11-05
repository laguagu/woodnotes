export const config = {
  matcher: ["/api/visio", "/((?!api|_next/static|_next/image|favicon.ico).*)"], // Match all routes except for Next.js static files and images
};
// export function middleware(req: NextRequest) {
//   if (process.env.NODE_ENV === "development") {
//     return NextResponse.next();
//   }

//   const basicAuth = req.headers.get("authorization");

//   if (basicAuth) {
//     const authValue = basicAuth.split(" ")[1];
//     const [user, pwd] = Buffer.from(authValue, "base64")
//       .toString("utf-8")
//       .split(":");

//     const validUser = "testuser";
//     const validPassWord = "testpassword";

//     if (user === validUser && pwd === validPassWord) {
//       return NextResponse.next();
//     }
//   }

//   // If not authenticated, force authentication prompt
//   const response = new NextResponse("Unauthorized", { status: 401 });
//   response.headers.set("WWW-Authenticate", 'Basic realm="Secure Area"');
//   return response;
// }
