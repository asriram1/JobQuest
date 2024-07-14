import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function JobRow() {
  return (
    <div className="border grid grid-cols-3 justify-items-stretch hover:bg-blue-50 hover:cursor-pointer p-3">
      <div>Image</div>
      <div className=" grid grid-rows-3 ">
        <span className="">Amazon</span>
        <span className="font-bold text-lg">Senior Cloud Architect</span>
        <span className="text-gray-400 text-sm">
          Remote | Phoenix, United States | Full-Time
        </span>
      </div>
      <div className="flex flex-col justify-between items-end">
        <span>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg> */}
          <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
        </span>
        <span>48 minutes ago</span>
      </div>
    </div>
  );
}
