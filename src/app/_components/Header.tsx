"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";
import { Avatar, DropdownMenu, Theme, Button } from "@radix-ui/themes";
import {
  getSessionUser,
  loginLink,
  logout,
  signUpLink,
} from "../(routes)/authentication/page";

import { stateContext } from "./AppContext";

import { usePathname } from "next/navigation";

// export async function getSessionUser() {
//   const { user } = await getUser();

//   return user;
// }

export default function Header() {
  const [user, setUser] = useState<any>();
  const [signInUrl, setSignInUrl] = useState<string>("");
  const [signUpUrl, setSignUpUrl] = useState<string>("");

  const { userId, settingUser, gettingUser } = useContext(stateContext);
  const pathname = usePathname();
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  // Retrieves the user from the session or returns `null` if no user is signed in

  // const { user } = await getUser();

  // Get the URL to redirect the user to AuthKit to sign in
  // const signInUrl = await getSignInUrl();

  // Get the URL to redirect the user to AuthKit to sign up
  // const signUpUrl = await getSignUpUrl();

  useEffect(() => {
    getSessionUser().then((user) => {
      // console.log(user);
      settingUser(user?.id);
      console.log(ls);
      setUser(user);
    });
    loginLink().then((link) => {
      setSignInUrl(link);
    });
    signUpLink().then((link) => {
      setSignUpUrl(link);
    });
  }, []);

  return (
    <header>
      <div className="flex items-center justify-between">
        <Link className="font-bold text-xl flex gap-2 items-center" href={"/"}>
          <img src={"/briefcase.png"} className="size-4" />
          JobQuest
        </Link>

        <nav className="flex gap-2 *:px-4 *:py-2 *:rounded-2xl">
          {!user ? (
            <>
              <Link className="bg-blue-600 text-white text-sm" href={signInUrl}>
                Login
              </Link>
              <Link
                className="text-sm text-center text-gray-400 hover:text-gray-700 hover:rounded-2xl hover:bg-gray-100 px-4 py-2"
                href={signUpUrl}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <form
              // action={await logout()}
              action={async () => {
                settingUser(null);
                await logout();
              }}
            >
              <div className="flex items-center gap-4">
                {user.profilePictureUrl && (
                  <img
                    src={user.profilePictureUrl!}
                    alt={"Profile Picture"}
                    aria-label="Profile Picture"
                    className="hidden sm:block rounded-2xl size-5"
                  />
                )}

                <p className="hidden md:block text-gray-700 text-sm">
                  Welcome back{user.firstName && `, ${user.firstName}`}
                </p>
                <button
                  type="submit"
                  className=" text-sm rounded-2xl bg-gray-100 text-gray-700 px-4 py-2 text-center"

                  // className=" px-4 py-2 rounded-md bg-gray-200"
                >
                  Sign out
                </button>

                <Link
                  className={
                    pathname == "/my-jobs"
                      ? " text-sm rounded-2xl bg-black text-white px-4 py-2 text-center"
                      : " text-sm px-4 py-2 text-center text-gray-400 hover:text-gray-700  hover:rounded-2xl hover:bg-gray-100 "
                  }
                  href={"/my-jobs"}
                >
                  My Jobs
                </Link>
                <Link
                  className={
                    pathname == "/listing"
                      ? " text-sm rounded-2xl bg-black text-white px-4 py-2 text-center"
                      : " text-sm px-4 py-2 text-center text-gray-400 hover:text-gray-700  hover:rounded-2xl hover:bg-gray-100 "
                  }
                  // className= "bg-blue-600 text-white px-4 py-2 rounded-md "
                  href={"/listing"}
                >
                  All Jobs
                </Link>
                <Link
                  className={
                    pathname == "/new-listing"
                      ? " text-sm rounded-2xl bg-black text-white px-4 py-2 text-center"
                      : " text-sm px-4 py-2 text-center text-gray-400 hover:text-gray-700  hover:rounded-2xl hover:bg-gray-100 "
                  }
                  // className="bg-blue-600 text-white px-4 py-2 rounded-md "
                  href={"/new-listing"}
                >
                  Post Job
                </Link>
              </div>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
