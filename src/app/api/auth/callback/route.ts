"use server";
import { handleAuth } from "@workos-inc/authkit-nextjs";
import { usePathname } from "next/navigation";
// import { getCookie, getCookies, setCookie } from "cookies-next";

// console.log(cookies().get("pathname")?.value);

// Redirect the user to `/` after successful sign in
// The redirect can be customized: `handleAuth({ returnPathname: '/foo' })`
export const GET = handleAuth({
  returnPathname: "/",
});
