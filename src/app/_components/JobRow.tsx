"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Ad, AdModel } from "../_models/Ad";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useRouter } from "next/navigation";

export default function JobRow({ job }: { job: Ad }) {
  const formatter = buildFormatter(frenchStrings);
  const router = useRouter();
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
      <div className="flex flex-col justify-between items-end">
        <span>
          <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
        </span>

        <span>
          <TimeAgo date={job.createdAt} />
        </span>
      </div>
    </div>
  );
}
