import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

// Match against pages that require authentication
// Leave this out if you want authentication on every page in your application
// matcher: ["/", "/new-listing", "/listing/[id]"]
//  matcher: ["/", "/account/:path*"]
export const config = {
  //   matcher: ["/", "/listing/:path", "/listing/669651e2576f4b0f5f354b7c"],
};
