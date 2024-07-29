"use client";
import {
  Button,
  DropdownMenu,
  Heading,
  Spinner,
  Tabs,
  Theme,
} from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import "@radix-ui/themes/styles.css";
import axios from "axios";
import { Application } from "@/app/_models/Application";
import AppliedRow from "@/app/_components/AppliedRow";
import { useSearchParams } from "next/navigation";
import { getSessionUser } from "../authentication/page";
import { Favorite } from "@/app/_models/Favorite";
import JobRow from "@/app/_components/JobRow";

import { Ad } from "@/app/_models/Ad";
import { stateContext } from "@/app/_components/AppContext";

export default function myJobs() {
  const [apps, setApps] = useState<Application[] | null>([]);
  const [favorites, setFavorites] = useState<Favorite[] | null>([]);
  const [sort, setSort] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [appliedLength, setAppliedLength] = useState<number>(0);
  const [favoritesLength, setFavoritesLength] = useState<number>(0);
  const [user, setUser] = useState<boolean>(false);
  const [postedDocs, setPostedDocs] = useState<any>([]);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { gettingUser } = useContext(stateContext);
  const userId = gettingUser();

  useEffect(() => {
    setLoading(true);
    getSessionUser().then((user) => {
      console.log(user?.id);
      if (user?.id) {
        setUser(true);
        axios
          .get("/api/jobApp", { params: { userId: user.id } })
          .then((results) => {
            console.log(results);
            setApps(results.data);
            setAppliedLength(results.data.length);

            //   console.log(results);
          });

        axios
          .get("/api/favorite", { params: { userId: user.id } })
          .then((results) => {
            console.log(results);
            setFavorites(results.data);
            setFavoritesLength(results.data.length);
          });

        axios
          .get("/api/ad", { params: { userId: user.id } })
          .then((results) => {
            console.log(results);
            setPostedDocs(results.data);
            // setFavorites(results.data);
            // setFavoritesLength(results.data.length);
          });

        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (sort) {
      params.set("sort", sort);
    }
    let url = `/api/jobApp?${params.toString()}`;
    let url_fav = `/api/favorite?${params.toString()}`;
    let url_ad = `/api/ad?${params.toString()}`;
    setLoading(true);
    getSessionUser().then((user) => {
      if (user?.id) {
        setUser(true);
        axios.get(url, { params: { userId: user.id } }).then((results) => {
          console.log(results);
          setApps(results.data);
          //   setLoading(false);
          //   console.log(results);
        });
        axios.get(url_fav, { params: { userId: user.id } }).then((results) => {
          console.log(results);
          setFavorites(results.data);
          // setLoading(false);
          //   console.log(results);
        });

        axios.get(url_ad, { params: { userId: user.id } }).then((results) => {
          console.log(results);
          setPostedDocs(results.data);
          // setLoading(false);
          //   console.log(results);
        });

        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [sort]);

  if (!loading && !user) {
    return <div className="mt-10">You need to login to view this page.</div>;
  }

  return (
    <Theme>
      <div className="mt-10">
        <Heading>My Jobs</Heading>

        <Tabs.Root defaultValue="applied">
          <Tabs.List>
            <Tabs.Trigger value="applied">
              Applied ({appliedLength})
            </Tabs.Trigger>
            <Tabs.Trigger value="favorites">
              My Favorites ({favoritesLength})
            </Tabs.Trigger>
            <Tabs.Trigger value="posted">
              My Posted ({postedDocs?.length})
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="applied">
            <div className="flex flex-col w-full border mt-10 rounded-t-xl  ">
              <div className="w-1/12">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="soft">
                      Sort:
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item
                      onClick={() => {
                        setSort("latest");
                      }}
                    >
                      Latest
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => {
                        setSort("earliest");
                      }}
                    >
                      Earliest
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                {loading && <Spinner />}
              </div>
              <div className="flex w-full mt-10 mx-auto flex-col gap-5 shadow-md">
                {apps?.length == 0 && !loading && (
                  <div className="mb-10 ml-10">No Jobs Applied Yet.</div>
                )}
                {apps &&
                  apps.map((app) => (
                    <AppliedRow
                      job={app.ad}
                      appliedDate={app.createdAt}
                      document={app.document}
                    />
                  ))}
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="favorites">
            <div className="flex flex-col w-full border mt-10 rounded-t-xl  ">
              <div className="w-1/12">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="soft">
                      Sort:
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item
                      onClick={() => {
                        setSort("latest");
                      }}
                    >
                      Latest
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => {
                        setSort("earliest");
                      }}
                    >
                      Earliest
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                {loading && <Spinner />}
              </div>
              <div className="flex w-full mt-10 mx-auto flex-col gap-5 shadow-md">
                {favorites?.length == 0 && !loading && (
                  <div className="mb-10 ml-10">No Jobs Added To Favorites.</div>
                )}
                {favorites &&
                  favorites.map((favorite) => (
                    <JobRow
                      job={favorite.ad}
                      showHeart={true}
                      userId={userId}
                      posted={false}
                      heartClickVal={true}
                    />
                    // <AppliedRow
                    //   job={app.ad}
                    //   appliedDate={app.createdAt}
                    //   document={app.document}
                    // />
                  ))}
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="posted">
            <div className="flex flex-col w-full border mt-10 rounded-t-xl  ">
              <div className="w-1/12">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="soft">
                      Sort:
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item
                      onClick={() => {
                        setSort("latest");
                      }}
                    >
                      Latest
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => {
                        setSort("earliest");
                      }}
                    >
                      Earliest
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                {loading && <Spinner />}
              </div>
              <div className="flex w-full mt-10 mx-auto flex-col gap-5 shadow-md">
                {postedDocs?.length == 0 && !loading && (
                  <div className="mb-10 ml-10">No Jobs Posted.</div>
                )}
                {postedDocs &&
                  postedDocs.map((doc) => (
                    <JobRow
                      job={doc}
                      showHeart={false}
                      userId={userId}
                      posted={true}
                      heartClickVal={false}
                    />
                    // <AppliedRow
                    //   job={app.ad}
                    //   appliedDate={app.createdAt}
                    //   document={app.document}
                    // />
                  ))}
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Theme>
  );
}
