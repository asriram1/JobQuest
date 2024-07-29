"use client";
import JobRow from "@/app/_components/JobRow";
import {
  Button,
  Heading,
  Radio,
  RadioGroup,
  Slider,
  Spinner,
  TextField,
  Theme,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React, { useContext, useEffect, useState } from "react";

import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import getCompanies from "@/app/_libs/companies";
import Select from "react-select";
import axios from "axios";
import { Ad } from "@/app/_models/Ad";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import getModelCount from "@/app/_libs/getModelCount";
import { useDebouncedCallback } from "use-debounce";
import { Router } from "next/router";
import { getSessionUser } from "../authentication/page";
import { stateContext } from "@/app/_components/AppContext";
import { getFavorited } from "@/app/api/favorite/route";
import myJobs from "../my-jobs/page";
import { Favorite } from "@/app/_models/Favorite";

export default function AllListing() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const companies = getCompanies();
  const [remote, setRemote] = useState<string>(params.get("remote") || "All");
  const [hours, setHours] = useState<string>(params.get("hours") || "All");
  const [country, setCountry] = useState<string | null>(
    params.get("country") || null
  );
  const [state, setState] = useState<string | null>(
    params.get("state") || null
  );
  const [city, setCity] = useState<String>("");
  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);
  const [company, setCompany] = useState<string | null>(
    params.get("company") || null
  );
  const [title, setTitle] = useState<string | null>(
    params.get("title") || null
  );
  const [salaryStart, setSalaryStart] = useState<any>(
    params.get("salaryStart") ? Number(params.get("salaryStart")) : null
  );
  const [salaryEnd, setSalaryEnd] = useState<any>(
    params.get("salaryEnd") ? Number(params.get("salaryEnd")) : null
  );
  const [salaryStartIndex, setSalaryStartIndex] = useState<number>(0);
  const [jobs, setJobs] = useState<Ad[] | null>([]);
  const [page, setPage] = useState<string>("1");
  const [lastCreatedAt, setLastCreatedAt] = useState(null);
  const [pageArr, setPageArr] = useState<any>([]);
  const [jobArr, setJobArr] = useState<any>([]);
  const [jobIds, setJobsIds] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>(1);
  const [newRefresh, setNewRefresh] = useState<boolean>(false);
  const [resetState, setResetState] = useState<boolean>(false);
  const [paramState, setParamState] = useState<boolean>(true);
  type Prop = {
    value: string;
    label: string;
    id: number;
  };
  const [countries, setCountries] = useState<Prop[]>([]);
  const [states, setStates] = useState<Prop[]>([]);
  const [postedDate, setPostedDate] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [tempTitle, setTempTitle] = useState<string | null>(
    params.get("title") || null
  );

  const [tempRemote, setTempRemote] = useState<string>(
    params.get("remote") || "All"
  );
  const [tempHours, setTempHours] = useState<string>(
    params.get("remote") || "All"
  );

  const [pageNum, setPageNum] = useState<string>("1");

  const router = useRouter();

  const [clicked, setClicked] = useState<string | undefined | null>("1");

  const [userFavorites, setUserFavorites] = useState<Favorite[]>([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const pathname = usePathname();
  const { replace } = useRouter();
  const { gettingUser } = useContext(stateContext);

  function calcSalary(start, end) {
    const starting = (start / 100) * 500;
    setSalaryStart(starting);
    const ending = (end / 100) * 500;
    setSalaryEnd(ending);
  }

  const salaryStartOptions = [
    { value: 0, label: 0, index: 0 },
    { value: 50, label: 50, index: 1 },
    { value: 100, label: 100, index: 2 },
    { value: 150, label: 150, index: 3 },
    { value: 200, label: 200, index: 4 },
    { value: 250, label: 250, index: 5 },
    { value: 300, label: 300, index: 6 },
    { value: 350, label: 350, index: 7 },
    { value: 400, label: 400, index: 8 },
    { value: 450, label: 450, index: 9 },
    { value: 500, label: 500, index: 10 },
  ];

  const salaryEndOptions = [
    { value: 0, label: 0 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
    { value: 150, label: 150 },
    { value: 200, label: 200 },
    { value: 250, label: 250 },
    { value: 300, label: 300 },
    { value: 350, label: 350 },
    { value: 400, label: 400 },
    { value: 450, label: 450 },
    { value: 500, label: 500 },
  ];

  const postedDateOptions = [
    { value: "1", label: "< 1 day" },
    { value: "7", label: "< 1 week" },
    { value: "14", label: "< 2 weeks" },
    { value: "30", label: "< 1 month" },
  ];

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (page == "1") {
      const params = new URLSearchParams();
    }
    params.set("page", page);
    console.log("page", page);
    setPageNum(page);
    replace(`${pathname}?${params.toString()}`);
    let url = `/api/ad?${params.toString()}`;

    setLoading(true);
    const userId = gettingUser();

    axios.get(url, { params: { lastCreatedAt: null } }).then((jobs) => {
      setJobs(jobs.data.adDoc);
      setLastCreatedAt(jobs.data.lastCreatedAt);

      const userId = gettingUser();

      jobArr.length = 0;
      jobIds.length = 0;
      if (userId) {
        axios
          .get("/api/favorite", { params: { userId: userId } })
          .then((favorites) => {
            console.log(favorites.data);
            if (favorites.data.length > 0) {
              console.log(favorites);
              let favoritesData = favorites.data;

              let favoriteIds = [];

              for (let j = 0; j < favoritesData?.length; j++) {
                favoriteIds.push(favoritesData[j].ad._id);
              }
              console.log(favoriteIds);

              for (let i = 0; i < jobs.data.adDoc.length; i++) {
                if (favoriteIds.includes(jobs.data.adDoc[i]._id)) {
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
                } else {
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
              setJobArr(jobArr);
              setLoading(false);

              // for (let i = 0; i < jobs.data.adDoc.length; i++) {
              //   jobIds.length = 0;
              //   for (let j = 0; j < favoritesData?.length; j++) {
              //     console.log(favoritesData[j].ad._id, jobs.data.adDoc[i]._id);
              //     console.log(jobIds, jobs.data.adDoc[i]._id);
              //     if (
              //       favoritesData[j].ad._id == jobs.data.adDoc[i]._id &&
              //       !jobIds.includes(jobs.data.adDoc[i]._id)
              //     ) {
              //       console.log("there");
              //       jobIds.push(jobs.data.adDoc[i]._id);
              //       jobArr.push(
              //         <div>
              //           <JobRow
              //             job={jobs.data.adDoc[i]}
              //             userId={userId}
              //             showHeart={true}
              //             posted={false}
              //             heartClickVal={true}
              //           />
              //         </div>
              //       );
              //     } else if (!jobIds.includes(jobs.data.adDoc[i]._id)) {
              //       console.log("here");
              //       jobIds.push(jobs.data.adDoc[i]._id);
              //       jobArr.push(
              //         <div>
              //           <JobRow
              //             job={jobs.data.adDoc[i]}
              //             userId={userId}
              //             showHeart={true}
              //             posted={userId == jobs.data.adDoc[i].userId}
              //             heartClickVal={false}
              //           />
              //         </div>
              //       );
              //     }
              //   }
              // }
              // setJobsIds(jobIds);
              // setJobArr(jobArr);
              // setLoading(false);
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
      } else {
        for (let i = 0; i < jobs.data.adDoc.length; i++) {
          jobArr.push(
            <div>
              <JobRow
                job={jobs.data.adDoc[i]}
                userId={null}
                showHeart={false}
                posted={false}
                heartClickVal={false}
              />
            </div>
          );
        }
        console.log(jobArr);

        setJobArr(jobArr);
      }

      if (page == "1") {
        setNumPages(jobs.data.numPages);
        getButtons(jobs.data.numPages);
      }
      // setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    const userId = gettingUser();
    setLoading(true);
    jobArr.length = 0;
    jobIds.length = 0;
    if (jobs) {
      if (userId) {
        axios
          .get("/api/favorite", { params: { userId: userId } })
          .then((favorites) => {
            if (favorites.data.length > 0) {
              console.log(favorites);
              let favoritesData = favorites.data;

              let favoriteIds = [];

              for (let j = 0; j < favoritesData?.length; j++) {
                favoriteIds.push(favoritesData[j].ad._id);
              }
              console.log(favoriteIds);

              for (let i = 0; i < jobs.length; i++) {
                if (favoriteIds.includes(jobs[i]._id)) {
                  jobArr.push(
                    <div>
                      <JobRow
                        job={jobs[i]}
                        userId={userId}
                        showHeart={true}
                        posted={false}
                        heartClickVal={true}
                      />
                    </div>
                  );
                } else {
                  jobArr.push(
                    <div>
                      <JobRow
                        job={jobs[i]}
                        userId={userId}
                        showHeart={true}
                        posted={userId == jobs[i].userId}
                        heartClickVal={false}
                      />
                    </div>
                  );
                }
              }
              setJobArr(jobArr);
              setLoading(false);

              // for (let i = 0; i < jobs.length; i++) {
              //   for (let j = 0; j < favoritesData?.length; j++) {
              //     console.log(favoritesData[j], jobs[i]);
              //     if (
              //       favoritesData[j].ad._id == jobs[i]._id &&
              //       !jobIds.includes(jobs[i]._id)
              //     ) {
              //       jobIds.push(jobs[i]._id);
              //       jobArr.push(
              //         <div>
              //           <JobRow
              //             job={jobs[i]}
              //             userId={userId}
              //             showHeart={true}
              //             posted={false}
              //             heartClickVal={true}
              //           />
              //         </div>
              //       );
              //     } else if (!jobIds.includes(jobs[i]._id)) {
              //       jobIds.push(jobs[i]._id);
              //       jobArr.push(
              //         <div>
              //           <JobRow
              //             job={jobs[i]}
              //             userId={userId}
              //             showHeart={true}
              //             posted={userId == jobs[i].userId}
              //             heartClickVal={false}
              //           />
              //         </div>
              //       );
              //     }
              //   }
              // }
              // setJobsIds(jobIds);
              // setJobArr(jobArr);
              // setLoading(false);
            } else {
              for (let i = 0; i < jobs.length; i++) {
                jobArr.push(
                  <div>
                    <JobRow
                      job={jobs[i]}
                      userId={userId}
                      showHeart={true}
                      posted={userId == jobs[i].userId}
                      heartClickVal={false}
                    />
                  </div>
                );
              }

              setJobArr(jobArr);
              setLoading(false);
            }
          });
      } else {
        for (let i = 0; i < jobs.length; i++) {
          jobArr.push(
            <div>
              <JobRow
                job={jobs[i]}
                userId={null}
                showHeart={false}
                posted={false}
                heartClickVal={false}
              />
            </div>
          );
        }
        console.log(jobArr);

        setJobArr(jobArr);
      }
    } else {
      setLoading(false);
      setJobArr([]);
      setJobsIds([]);
    }
  }, [jobs]);

  useEffect(() => {
    GetCountries().then((result) => {
      type Prop = {
        value: string;
        label: string;
        id: number;
      };
      const options: Prop[] = [{ value: "All", label: "All Countries", id: 0 }];
      // const ids: number = [];
      result.forEach((country) => {
        const option = {
          value: country.name,
          label: country.name,
          id: country.id,
        };
        // const id = country.id;
        options.push(option);
        // ids.push(id);
      });

      setCountries(options);
      console.log(options);
    });

    const params = new URLSearchParams(searchParams);
    if (page == "1") {
      const params = new URLSearchParams();
    }
    params.set("page", "1");

    if (!resetState) {
      if (company && company != "Company...") {
        params.set("company", company);
      }

      if (
        salaryStart != null &&
        salaryEnd != null // params.get(salaryStart.toString()) == null &&
        // params.get(salaryEnd.toString()) == null
      ) {
        params.set("salaryStart", salaryStart.toString());
        params.set("salaryEnd", salaryEnd.toString());
      }

      if (remote != "All") {
        params.set("remote", remote);
      } else {
        params.delete("remote");
      }

      if (hours != "All") {
        params.set("hours", hours);
      } else {
        params.delete("hours");
      }

      if (country && country != "Country...") {
        params.set("country", country);
      }

      if (state && state != "State...") {
        params.set("state", state);
      }
      if (title && title != "") {
        params.set("title", title);
      } else {
        params.delete("title");
      }

      if (postedDate && postedDate != "Posted Date...") {
        console.log(postedDate);
        params.set("postedDate", postedDate);
      }
    } else {
      params.set("page", "1");
      params.delete("company");
      params.delete("title");
      params.delete("salaryStart");
      params.delete("salaryEnd");
      params.delete("remote");
      params.delete("hours");
      params.delete("country");
      params.delete("state");
      params.delete("postedDate");
    }

    if (newRefresh) {
      console.log("new refresh");
      params.set("page", "1");
      params.delete("company");
      params.delete("title");
      params.delete("salaryStart");
      params.delete("salaryEnd");
      params.delete("remote");
      params.delete("hours");
      params.delete("country");
      params.delete("state");
      params.delete("postedDate");
      // setParamState(false);
      setResetState(true);
      setCompany("Company...");
      setTitle(null);
      setTempTitle("");
      setSalaryEnd(null);
      setSalaryStart(null);
      setRemote("All");
      setTempRemote("All");
      setHours("All");
      setTempHours("All");
      setCountry("Country...");
      setState("State...");
      setPostedDate("Posted Date...");

      // setCountry("Country");
      // setCountryId(0);
      // setState("State");

      replace(`${pathname}?${params.toString()}`);
      let url = `/api/ad?${params.toString()}`;
      // console.log(url);
      setLoading(true);

      axios.get(url, { params: { lastCreatedAt: null } }).then((jobs) => {
        setJobs(jobs.data.adDoc);
        setLastCreatedAt(jobs.data.lastCreatedAt);
        setPageNum("1");
        setNumPages(jobs.data.numPages);

        getButtons(jobs.data.numPages);

        setLoading(false);
      });
      setNewRefresh(false);
    } else {
      replace(`${pathname}?${params.toString()}`);
      let url = `/api/ad?${params.toString()}`;
      console.log(url);
      setLoading(true);

      axios
        .get(url, {
          params: { lastCreatedAt: resetState ? null : lastCreatedAt },
        })
        .then((jobs) => {
          setJobs(jobs.data.adDoc);
          setLastCreatedAt(jobs.data.lastCreatedAt);
          setPageNum("1");
          setNumPages(jobs.data.numPages);
          getButtons(jobs.data.numPages);
          console.log("hello", jobs.data.numPages);

          setLoading(false);
          setResetState(false);
        });
    }
  }, [
    company,
    salaryStart,
    salaryEnd,
    remote,
    hours,
    country,
    state,
    title,
    postedDate,
  ]);

  useEffect(() => {
    GetState(countryId).then((result) => {
      type Prop = {
        value: string;
        label: string;
        id: number;
      };
      const options: Prop[] = [{ value: "All", label: "All States", id: 0 }];
      // const ids: number = [];
      result.forEach((state) => {
        const option = {
          value: state.name,
          label: state.name,
          id: state.id,
        };
        // const id = country.id;
        options.push(option);
        // ids.push(id);
      });

      setStates(options);
    });
  }, [countryId]);

  function handleTitleChange(ev) {
    if (ev.key === "Enter") {
      setTitle(ev.target.value);
    }
  }

  function clearFilters() {
    setNewRefresh(true);
    setTitle("");
  }

  async function getFavorite(userId, jobs) {
    jobArr.length = 0;
    for (let i = 0; i < 5; i++) {
      getFavorited(userId, jobs.data.adDoc[i]._id).then((heart) => {
        console.log(jobs.data.adDoc[i]);
        console.log(heart);
        // console.log(heart);
        // setAlreadyClicked(true);
        // setHeartClick(heart);
        if (userId == jobs.data.adDoc[i].userId) {
          console.log("both users are same.");
          jobArr.push(
            <div>
              <JobRow
                job={jobs.data.adDoc[i]}
                userId={userId}
                showHeart={true}
                posted={true}
                heartClickVal={heart}
              />
            </div>
          );
        } else {
          console.log("both users are not same.");
          jobArr.push(
            <div>
              <JobRow
                job={jobs.data.adDoc[i]}
                userId={userId}
                showHeart={true}
                posted={false}
                heartClickVal={heart}
              />
            </div>
          );
        }
      });
    }
  }

  function getButtons(numPages) {
    const buttonCount: number = Math.ceil(numPages / 5);
    pageArr.length = 0;
    for (let i = 0; i < buttonCount; i++) {
      pageArr.push(
        <div>
          <Button
            onClick={() => {
              setPage((i + 1).toString());
            }}
            color="gray"
            radius="full"
            variant="classic"
            // variant={clicked === (i + 1).toString() ? "soft" : "classic"} // use soft for variant
            highContrast
          >
            {i + 1}
          </Button>
        </div>
      );
    }
    return pageArr;
  }
  return (
    <Theme>
      <div className="mt-10">
        <Heading>All Jobs</Heading>

        <div className="flex  mt-10 rounded-t-xl shadow-md ">
          <div className=" flex flex-col gap-5 items center w-1/5 border bg-blue-100 p-8 rounded-tl-xl ">
            <div className="">
              <Heading size="4" weight="medium" align="center">
                Filters
              </Heading>
            </div>
            <div className="flex flex-col">
              Salary:
              <div className="text-nowrap overflow-hidden text-xs text-gray-500">
                USD{salaryStart}
                {salaryStart ? "K" : ""} To USD{salaryEnd}
                {salaryEnd ? "K" : ""}
              </div>
              <Select
                options={salaryStartOptions}
                value={salaryStart != null ? salaryStart : "Salary Start..."}
                placeholder={
                  salaryStart != null ? salaryStart : "Salary Start..."
                }
                onChange={(ev: any) => {
                  setSalaryStart(ev.value);
                  setSalaryStartIndex(ev.index);
                }}
                styles={{
                  option: (provided) => ({
                    ...provided,
                    color: "#7D818D",
                    fontSize: "14px",
                  }),
                  control: (provided, state: any) => ({
                    ...provided,
                    color: "#7D818D",

                    border: state.isFocused
                      ? "1px solid #CCCCCC"
                      : "1px solid #CCCCCC",

                    // boxShadow: "none",
                    "&:hover": {
                      border: "1px solid #CCCCCC",
                      boxShadow: "1px 1px 6px #CCCCCC",
                    },

                    boxShadow: state.isFocused ? "1px 1px 6px #CCCCCC" : "none",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#7D818D",
                    fontSize: "14px",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: "#a0aec0",
                    fontSize: "14px",
                  }),
                }}
              />
              <div className="mt-5"></div>
              {salaryStart != null && (
                <Select
                  options={salaryEndOptions.slice(salaryStartIndex)}
                  placeholder={salaryEnd ? salaryEnd : "Salary End..."}
                  // placeholder="Salary End..."
                  onChange={(ev: any) => {
                    setSalaryEnd(ev.value);
                  }}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    control: (provided, state: any) => ({
                      ...provided,
                      color: "#7D818D",

                      border: state.isFocused
                        ? "1px solid #CCCCCC"
                        : "1px solid #CCCCCC",

                      // boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #CCCCCC",
                        boxShadow: "1px 1px 6px #CCCCCC",
                      },

                      boxShadow: state.isFocused
                        ? "1px 1px 6px #CCCCCC"
                        : "none",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#a0aec0",
                      fontSize: "14px",
                    }),
                  }}
                />
              )}
            </div>
            <div className="flex flex-col">
              Company:
              <div className="w-full">
                <Select
                  options={companies}
                  placeholder={company ? company : "Company... "}
                  // defaultValue={{ label: company }}
                  value={company ? company : ""}
                  onChange={(ev: any) => {
                    setCompany(ev.value);
                  }}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    control: (provided, state: any) => ({
                      ...provided,
                      color: "#7D818D",

                      border: state.isFocused
                        ? "1px solid #CCCCCC"
                        : "1px solid #CCCCCC",

                      // boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #CCCCCC",
                        boxShadow: "1px 1px 6px #CCCCCC",
                      },

                      boxShadow: state.isFocused
                        ? "1px 1px 6px #CCCCCC"
                        : "none",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#a0aec0",
                      fontSize: "14px",
                      // paddingLeft: "3px",
                    }),
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              Position:
              <div className="w-full">
                <input
                  type="text"
                  onKeyDown={handleTitleChange}
                  onChange={(ev: any) => {
                    setTempTitle(ev.target.value);
                  }}
                  className="w-full bg-white px-3 py-2 rounded-md border border-[#CCCCCC] text-gray-400 hover:shadow-md focus:shadow-md  !outline-none text-sm"
                  placeholder={"Position..."}
                  defaultValue={tempTitle ? tempTitle : ""}
                  // value
                  value={tempTitle ? tempTitle : ""}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-wrap">Work-Style:</p>

              <div className="w-full overflow-hidden">
                <RadioGroup.Root
                  // defaultValue={remote ? remote : "All"}
                  value={tempRemote ? tempRemote : "All"}
                  // onChange={(ev: any) => {
                  //   console.log(ev.target.value);
                  //   setTempRemote(ev.target.value);
                  // }}
                >
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                      setTempRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="All"
                    // value={null}
                  >
                    All
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                      setTempRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="On-Site"
                  >
                    On-Site
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                      setTempRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="Hybrid"
                  >
                    Hybrid
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                      setTempRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="Remote"
                  >
                    Remote
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-wrap">Work-Hours:</p>

              <div className="w-full overflow-hidden">
                <RadioGroup.Root value={tempHours ? tempHours : "All"}>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setHours((ev.target as HTMLInputElement).value);
                      setTempHours((ev.target as HTMLInputElement).value);
                    }}
                    value="All"
                  >
                    All
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    className=""
                    onClick={(ev) => {
                      setHours((ev.target as HTMLInputElement).value);
                      setTempHours((ev.target as HTMLInputElement).value);
                    }}
                    value="Full-Time"
                  >
                    Full-Time
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setHours((ev.target as HTMLInputElement).value);
                      setTempHours((ev.target as HTMLInputElement).value);
                    }}
                    value="Part-Time"
                  >
                    Part-Time
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setHours((ev.target as HTMLInputElement).value);
                      setTempHours((ev.target as HTMLInputElement).value);
                    }}
                    value="Contract"
                  >
                    Contract
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </div>
            </div>
            <div className="flex flex-col mb-3">
              Location:
              <div className="flex flex-col gap-1">
                <Select
                  options={countries}
                  placeholder={country ? country : "Country... "}
                  value={country ? country : "Country... "}
                  // placeholder={company ? company : "Company... "}
                  // placeholder={"Country..."}
                  // defaultValue={{ label: company }}
                  // value={company ? company : ""}
                  onChange={(ev: any) => {
                    console.log(ev);
                    setCountry(ev.value);
                    setCountryId(ev.id);
                    // setCompany(ev.value);
                  }}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    control: (provided, state: any) => ({
                      ...provided,
                      color: "#7D818D",

                      border: state.isFocused
                        ? "1px solid #CCCCCC"
                        : "1px solid #CCCCCC",

                      // boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #CCCCCC",
                        boxShadow: "1px 1px 6px #CCCCCC",
                      },

                      boxShadow: state.isFocused
                        ? "1px 1px 6px #CCCCCC"
                        : "none",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#a0aec0",
                      fontSize: "14px",
                    }),
                  }}
                />

                <Select
                  options={states}
                  placeholder={state ? state : "State... "}
                  value={state ? state : "State... "}
                  // placeholder={company ? company : "Company... "}
                  // placeholder={"Country..."}
                  // defaultValue={{ label: company }}
                  // value={company ? company : ""}
                  onChange={(ev: any) => {
                    console.log(ev);
                    setState(ev.value);
                    setStateId(ev.id);
                    // setCompany(ev.value);
                  }}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    control: (provided, state: any) => ({
                      ...provided,
                      color: "#7D818D",

                      border: state.isFocused
                        ? "1px solid #CCCCCC"
                        : "1px solid #CCCCCC",

                      // boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #CCCCCC",
                        boxShadow: "1px 1px 6px #CCCCCC",
                      },

                      boxShadow: state.isFocused
                        ? "1px 1px 6px #CCCCCC"
                        : "none",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#a0aec0",
                      fontSize: "14px",
                    }),
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mb-3">
              Posted Date:
              <div className="flex flex-col gap-1">
                <Select
                  options={postedDateOptions}
                  placeholder={postedDate ? postedDate : "Posted Date... "}
                  value={postedDate ? postedDate : "Posted Date... "}
                  // placeholder={company ? company : "Company... "}
                  // placeholder={"Country..."}
                  // defaultValue={{ label: company }}
                  // value={company ? company : ""}
                  onChange={(ev: any) => {
                    setPostedDate(ev.value);
                    // console.log(ev);
                    // setCountry(ev.value);
                    // setCountryId(ev.id);
                    // setCompany(ev.value);
                  }}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    control: (provided, state: any) => ({
                      ...provided,
                      color: "#7D818D",

                      border: state.isFocused
                        ? "1px solid #CCCCCC"
                        : "1px solid #CCCCCC",

                      // boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #CCCCCC",
                        boxShadow: "1px 1px 6px #CCCCCC",
                      },

                      boxShadow: state.isFocused
                        ? "1px 1px 6px #CCCCCC"
                        : "none",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#7D818D",
                      fontSize: "14px",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#a0aec0",
                      fontSize: "14px",
                    }),
                  }}
                />
              </div>
            </div>

            <Button
              onClick={() => clearFilters()}
              color="gray"
              variant="solid"
              highContrast
            >
              Clear
            </Button>
          </div>
          <div className=" flex flex-col w-4/5 border rounded-tr-xl p-5 justify-between">
            <div className="flex flex-col gap-5">
              {jobs && (
                <div className="text-xs text-gray-500">Page - {pageNum}</div>
              )}
              {loading && <Spinner />}
              {!jobs && <div>No Jobs Found.</div>}
              {console.log(jobArr[0])}
              {jobArr && <div>{jobArr}</div>}

              {/* {jobs && jobs.map((job) => <JobRow job={job} />)} */}
            </div>
            <div className="mb-3 flex gap-2 mx-auto mt-5 ">{pageArr}</div>
          </div>
        </div>
      </div>
    </Theme>
  );
}
