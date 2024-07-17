import React from "react";
import JobRow from "./JobRow";
import Link from "next/link";

export default function Jobs() {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="bg-blue-100 rounded-t-xl p-8 ">
          <h2 className="font-bold text-lg">Recent Jobs</h2>
        </div>
        <div>
          <JobRow />
          <JobRow />
          <JobRow />
          <JobRow />
        </div>
        <Link
          className="bg-blue-600 text-white px-4 py-2 rounded-md mx-auto mt-2"
          href={"/listing"}
        >
          View All
        </Link>
      </div>
    </>
  );
}
