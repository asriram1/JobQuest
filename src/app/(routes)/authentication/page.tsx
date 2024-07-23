"use server";
import React from "react";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";

export default async function loginLink() {
  const signInUrl = await getSignInUrl();
  return signInUrl;
  //   return (
  //     <div>page</div>
  //   )
}
