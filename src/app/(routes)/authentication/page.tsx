"use server";
import React from "react";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";

export async function loginLink(): Promise<string> {
  const signInUrl: string = await getSignInUrl();
  return signInUrl;
}
export async function getSessionUser() {
  const { user } = await getUser();

  return user;
}

export async function signUpLink(): Promise<string> {
  const signUpUrl: string = await getSignUpUrl();
  return signUpUrl;
}

export async function logout() {
  await signOut();
}

export default async function page() {
  return "Not authorized to access this page.";
}
