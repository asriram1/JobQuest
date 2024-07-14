import Link from "next/link";
import React from "react";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";

export default async function Header() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await getUser();

  // Get the URL to redirect the user to AuthKit to sign in
  const signInUrl = await getSignInUrl();

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  return (
    <header>
      <div className="flex items-center justify-between">
        <Link className="font-bold text-xl flex gap-2 items-center" href={"/"}>
          <img src={"/briefcase.png"} className="size-4" />
          JobQuest
        </Link>
        <nav className="flex gap-2 *:px-4 *:py-2 *:rounded-md">
          {!user ? (
            <>
              <Link className="bg-blue-600 text-white" href={signInUrl}>
                Login
              </Link>
              <Link className="bg-gray-200" href={signUpUrl}>
                Sign Up
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <div className="flex items-center gap-4">
                {user.profilePictureUrl && (
                  <img
                    src={user.profilePictureUrl!}
                    alt={"Profile Picture"}
                    aria-label="Profile Picture"
                    className="rounded-2xl size-5"
                  />
                )}

                <p>Welcome back{user.firstName && `, ${user.firstName}`}</p>
                <button
                  type="submit"
                  className=" px-4 py-2 rounded-md bg-gray-200"
                >
                  Sign out
                </button>
                <Link
                  className="bg-blue-600 text-white px-4 py-2 rounded-md "
                  href={"/new-listing"}
                >
                  Post a Job
                </Link>
              </div>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
