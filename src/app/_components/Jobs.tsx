import React from "react";
import JobRow from "./JobRow";

export default function Jobs() {
  return (
    <>
      <div className="bg-blue-100 rounded-t-xl p-8 ">
        <h2 className="font-bold text-lg">Recent Jobs</h2>
      </div>
      <div>
        <JobRow />
        <JobRow />
        <JobRow />
        <JobRow />
      </div>
    </>
  );
}
