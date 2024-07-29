"use client";

import { createContext, useEffect, useState } from "react";

export const stateContext = createContext<any>({
  userId: null,
  settingUser: () => {},
  gettingUser: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [currentLink, setCurrentLink] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    console.log(ls);
    if (ls && ls.getItem("currentUser")) {
      setUserId(ls.getItem("currentUser"));
    }
  }, []);

  function settingUser(userId) {
    if (ls) {
      ls.setItem("currentUser", userId);
    }

    setUserId(userId);
  }

  function gettingUser() {
    if (ls) {
      return ls.getItem("currentUser");
    }
  }

  // function setLink(link) {
  //   if (ls) {
  //     ls.setItem("jobQuery_location", link);
  //   }
  //   setCurrentLink(link);
  // }

  // function getLink() {
  //   if (ls) {
  //     return ls.getItem("jobQuery_location");
  //   }
  // }

  return (
    <stateContext.Provider
      value={{
        userId,
        settingUser,
        gettingUser,
      }}
    >
      {children}
    </stateContext.Provider>
  );
}
