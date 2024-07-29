"use client";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Ad, AdModel } from "../_models/Ad";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useRouter } from "next/navigation";
import { getSessionUser } from "../(routes)/authentication/page";
import axios from "axios";
import { getFavorited } from "../api/favorite/route";
import { Box, Popover, Spinner, Button } from "@radix-ui/themes";
import { stateContext } from "./AppContext";

export default function JobRow({
  job,
  showHeart = false,
  userId = null,
  posted = false,
  heartClickVal = false,
}: {
  job: Ad;
  showHeart: boolean;
  userId: string | null;
  posted: boolean;
  heartClickVal: boolean;
}) {
  const formatter = buildFormatter(frenchStrings);
  const [heartClick, setHeartClick] = useState(heartClickVal);

  // const [showHeart, setShowHeart] = useState(false);

  // const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { gettingUser } = useContext(stateContext);
  const user_id = gettingUser();

  // const [showHeart, setShowHeart] = useState(user_id ? true : false);
  // const [posted, setPosted] = useState<boolean>(
  //   user_id == job.userId ? true : false
  // );

  useEffect(() => {
    // console.log(gettingUser());
    // getSessionUser().then((user) => {
    //   console.log(user);
    //   if (user?.id) {
    //     setLoading(true);
    //     setShowHeart(true);
    //     setUserId(user.id);
    //     if (job.userId == user.id) {
    //       setPosted(true);
    //     }
    //     getFavorited(user.id, job._id).then((heart) => {
    //       console.log(heart);
    //       setAlreadyClicked(true);
    //       setHeartClick(heart);
    //       setLoading(false);
    //     });
    //   }
    // });
    // const user_id = gettingUser();
    // console.log(user_id);
    // if (user_id) {
    //   setLoading(true);
    //   // setShowHeart(true);
    //   setUserId(user_id);
    //   if (job.userId == user_id) {
    //     console.log(job.userId);
    //     setPosted(true);
    //   }
    //   getFavorited(user_id, job._id).then((heart) => {
    //     setHeartClick(heart);
    //     setLoading(false);
    //     return heart;
    //   });
    // }
  }, []);

  async function isFavorited() {
    // const user_id = gettingUser();
    getFavorited(user_id, job._id).then((heart) => {
      // console.log(heart);
      // setAlreadyClicked(true);
      // setHeartClick(heart);
      return heart;

      // setLoading(false);
    });
  }

  async function addToFavorites(userId, job) {
    // setLoading(true);
    const user_id = gettingUser();
    if (user_id != "undefined") {
      const data = { userId: userId, job: job };
      axios.post("/api/favorite", data).then((result) => {
        console.log(result);
      });
    } else {
      alert("You need to login to add to favorites.");
    }
  }

  async function deleteFavorite() {
    axios
      .delete("/api/favorite", { params: { userId: userId, adId: job._id } })
      .then((result) => {});
  }

  async function deletePost() {
    axios.delete("api/ad", { params: { id: job._id } }).then((result) => {
      alert("Deleted Successfully");
      window.location.reload();
    });
  }

  return (
    <div
      onClick={() => {
        router.push("/listing/" + job._id);
      }}
      className="border overflow-hidden grid grid-cols-3 justify-items-stretch hover:bg-blue-50 hover:cursor-pointer p-3 h-48"
    >
      <div className="flex items-center justify-left ml-5">
        <img src={job.companyIcon} alt="company icon" className="size-12" />
      </div>
      <div className=" grid grid-rows-3 ">
        <span className="">{job.company}</span>
        <span className="font-bold text-lg">{job.title}</span>
        <span className="text-gray-400 text-sm">
          {job.remote} | {job.state}, {job.country} | {job.hours}
        </span>
      </div>
      <div
        onClick={(ev) => ev.stopPropagation()}
        className="flex flex-col justify-between items-end"
      >
        {loading ? (
          <Spinner />
        ) : (
          <div>
            {showHeart && !posted ? (
              <div>
                <Popover.Root>
                  <Popover.Trigger>
                    <span>
                      <FontAwesomeIcon
                        className={
                          !heartClick
                            ? "size-4 text-gray-300"
                            : "size-4 text-red-700"
                        }
                        icon={faHeart}
                      />
                    </span>
                  </Popover.Trigger>
                  <Popover.Content>
                    {!heartClick ? (
                      <Button
                        onClick={() => {
                          {
                            user_id != "undefined"
                              ? setHeartClick(true)
                              : setHeartClick(false);
                          }

                          addToFavorites(userId, job);
                        }}
                        color="blue"
                      >
                        Add to Favorites?
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setHeartClick(false);
                          deleteFavorite();
                        }}
                        color="red"
                      >
                        Remove from favorites?
                      </Button>
                    )}

                    {/* <Box flexGrow="1">
                       
                      </Box> */}
                  </Popover.Content>
                </Popover.Root>
              </div>
            ) : (
              <div>
                {posted && (
                  <Popover.Root>
                    <Popover.Trigger>
                      <span>
                        <FontAwesomeIcon
                          // onClick={}
                          className="text-gray-700"
                          icon={faTrash}
                        />
                      </span>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Button onClick={() => deletePost()} color="red">
                        Confirm Delete
                      </Button>
                      {/* <Box flexGrow="1">
                       
                      </Box> */}
                    </Popover.Content>
                  </Popover.Root>
                )}
              </div>
            )}
          </div>
        )}

        <span className="text-sm ">
          Posted: <TimeAgo date={job.createdAt} />
        </span>
      </div>
    </div>
  );
}
