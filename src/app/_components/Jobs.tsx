"use client";
import React, { useEffect, useState } from "react";
import JobRow from "./JobRow";
import Link from "next/link";
import { Ad } from "../_models/Ad";
import axios from "axios";
import { Spinner, Theme } from "@radix-ui/themes";

export default function Jobs() {
  const [jobs, setJobs] = useState<Ad[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let url = `/api/ad?page=1`;

    setLoading(true);

    axios.get(url).then((jobs) => {
      setJobs(jobs.data.adDoc);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Theme>
        <div className="flex flex-col w-full">
          <div className="bg-blue-100 rounded-t-xl p-8 ">
            <h2 className="font-bold text-lg">Recent Jobs</h2>
          </div>
          <div>
            {loading && <Spinner />}
            {!jobs && <div>No Jobs Found.</div>}

            {jobs && jobs.map((job) => <JobRow job={job} />)}
            {/* <JobRow />
          <JobRow />
          <JobRow />
          <JobRow /> */}
          </div>
          <Link
            className="bg-blue-600 text-white px-4 py-2 rounded-md mx-auto mt-2"
            href={"/listing"}
          >
            View All
          </Link>
        </div>
      </Theme>
    </>
  );
}
