"use client";
import React, { useContext, useEffect, useState } from "react";
import JobRow from "./JobRow";
import Link from "next/link";
import { Ad } from "../_models/Ad";
import axios from "axios";
import { Spinner, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { stateContext } from "./AppContext";

export default function Jobs() {
  const [jobs, setJobs] = useState<Ad[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [jobArr, setJobArr] = useState<any>([]);
  const [jobIds, setJobsIds] = useState<any>([]);

  const { gettingUser } = useContext(stateContext);

  useEffect(() => {
    let url = `/api/ad?page=1`;
    // const userId = gettingUser();

    axios.get(url).then((jobs) => {
      setJobs(jobs.data.adDoc);
      jobArr.length = 0;
      jobIds.length = 0;
      setLoading(true);
      const userId = gettingUser();
      axios
        .get("/api/favorite", { params: { userId: userId } })
        .then((favorites) => {
          if (favorites.data.length > 0) {
            let favoritesData = favorites.data;
            for (let i = 0; i < jobs.data.adDoc.length; i++) {
              for (let j = 0; j < favoritesData?.length; j++) {
                console.log(favoritesData[j], jobs.data.adDoc[i]);
                if (
                  favoritesData[j]._id == jobs.data.adDoc[i]._id &&
                  !jobIds.includes(jobs.data.adDoc[i]._id)
                ) {
                  jobIds.push(jobs.data.adDoc[i]._id);
                  jobArr.push(
                    <div>
                      <JobRow
                        job={jobs.data.adDoc[i]}
                        userId={userId}
                        showHeart={true}
                        posted={false}
                        heartClickVal={true}
                      />
                    </div>
                  );
                } else if (!jobIds.includes(jobs.data.adDoc[i]._id)) {
                  jobIds.push(jobs.data.adDoc[i]._id);
                  jobArr.push(
                    <div>
                      <JobRow
                        job={jobs.data.adDoc[i]}
                        userId={userId}
                        showHeart={true}
                        posted={userId == jobs.data.adDoc[i].userId}
                        heartClickVal={false}
                      />
                    </div>
                  );
                }
              }
            }
            setJobsIds(jobIds);
            setJobArr(jobArr);
            setLoading(false);
          } else {
            for (let i = 0; i < jobs.data.adDoc.length; i++) {
              jobArr.push(
                <div>
                  <JobRow
                    job={jobs.data.adDoc[i]}
                    userId={userId}
                    showHeart={true}
                    posted={userId == jobs.data.adDoc[i].userId}
                    heartClickVal={false}
                  />
                </div>
              );
            }
            setJobArr(jobArr);
            setLoading(false);
          }
        });
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
            {console.log(jobArr[0])}
            {jobArr && <div>{jobArr}</div>}
            {/* {jobs && jobs.map((job) => <JobRow job={job} showHeart={false} userId={null} posted={false} heartClickVal={false} />)}  */}
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
