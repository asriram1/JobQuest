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
import React, { useEffect, useState } from "react";

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

export default function AllListing() {
  const companies = getCompanies();
  const [remote, setRemote] = useState<string>("All");
  const [hours, setHours] = useState<string>("All");
  const [country, setCountry] = useState<String>("");
  const [state, setState] = useState<String>("");
  const [city, setCity] = useState<String>("");
  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);
  const [company, setCompany] = useState<string | null>(null);
  const [position, setPosition] = useState<String>("");
  const [salaryStart, setSalaryStart] = useState<number>(0);
  const [salaryEnd, setSalaryEnd] = useState<number>(500);
  const [jobs, setJobs] = useState<Ad[]>([]);
  const [page, setPage] = useState<string>("1");
  const [lastCreatedAt, setLastCreatedAt] = useState();
  const [pageArr, setPageArr] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [clicked, setClicked] = useState<string | undefined | null>("1");

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function calcSalary(start, end) {
    const starting = (start / 100) * 500;
    setSalaryStart(starting);
    const ending = (end / 100) * 500;
    setSalaryEnd(ending);
  }

  useEffect(() => {
    ls?.setItem("Clicked", (1).toString());
  }, []);
  useEffect(() => {
    getModelCount().then((count) => {
      const buttonCount: number = Math.ceil(count / 5);
      pageArr.length = 0;
      for (let i = 0; i < buttonCount; i++) {
        pageArr.push(
          <div>
            <Button
              onClick={() => {
                setPage((i + 1).toString());
                ls?.setItem("Clicked", (i + 1).toString());
                setClicked((i + 1).toString());
              }}
              color="gray"
              radius="full"
              variant={clicked === (i + 1).toString() ? "soft" : "classic"} // use soft for variant
              highContrast
            >
              {i + 1}
            </Button>
          </div>
        );
      }
    });
  }, [clicked]);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);

    if (company) {
      params.set("company", company);
    }

    replace(`${pathname}?${params.toString()}`);
    let url = `/api/ad?${params.toString()}`;
    setLoading(true);
    axios
      .get(url, { params: { lastCreatedAt: lastCreatedAt } })
      .then((jobs) => {
        setJobs(jobs.data.adDoc);
        setLastCreatedAt(jobs.data.lastCreatedAt);
        setLoading(false);
      });
  }, [page, company]);

  return (
    <Theme>
      <div className="mt-10">
        <Heading>All Jobs</Heading>

        <div className="flex mt-10 rounded-t-xl shadow-md ">
          <div className=" flex flex-col gap-5 items center w-1/5 border bg-blue-100 p-8 rounded-tl-xl ">
            <div className="">
              <Heading size="4" weight="medium" align="center">
                Filters
              </Heading>
            </div>
            <div className="flex flex-col">
              Salary:
              <div className="text-nowrap text-xs text-gray-500">
                USD{salaryStart}
                {salaryStart !== 0 ? "K" : ""} To USD{salaryEnd}
                {salaryEnd !== 0 ? "K" : ""}
              </div>
              <Slider
                onValueChange={(value) => {
                  calcSalary(value[0], value[1]);
                }}
                defaultValue={[0, 100]}
              />
            </div>
            <div className="flex flex-col">
              Company:
              <div className="w-full">
                <Select
                  options={companies}
                  placeholder="Company... "
                  onChange={(ev: any) => {
                    console.log(ev);
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
                    }),
                  }}
                />
                {/* <TextField.Root
                  size="3"
                  // onChange={(ev) => {
                  //   setTitle(ev.target?.value);
                  // }}
                  placeholder="Company Name..."
                ></TextField.Root> */}
              </div>
            </div>
            <div className="flex flex-col">
              Position:
              <div className="w-full">
                <input
                  type="text"
                  onChange={(ev: any) => {
                    setCompany(ev.value);
                  }}
                  className="w-full bg-white px-3 py-2 rounded-md border border-[#CCCCCC] text-gray-400 hover:shadow-md focus:shadow-md  !outline-none text-sm"
                  placeholder="Position..."
                />
                {/* <TextField.Root
                  size="3"
                  // onChange={(ev) => {
                  //   setTitle(ev.target?.value);
                  // }}
                  placeholder="Position..."
                ></TextField.Root> */}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-nowrap">Work-Style:</p>
              <div className="w-full">
                <RadioGroup.Root defaultValue="All">
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="All"
                  >
                    All
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="On-Site"
                  >
                    On-Site
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="Hybrid"
                  >
                    Hybrid
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="Remote"
                  >
                    Remote
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-nowrap">Work-Hours:</p>

              <div className="w-full">
                <RadioGroup.Root defaultValue="All">
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setHours((ev.target as HTMLInputElement).value);
                    }}
                    value="All"
                  >
                    All
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    className=""
                    onClick={(ev) => {
                      setHours((ev.target as HTMLInputElement).value);
                    }}
                    value="Full-Time"
                  >
                    Full-Time
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setHours((ev.target as HTMLInputElement).value);
                    }}
                    value="Part-Time"
                  >
                    Part-Time
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setHours((ev.target as HTMLInputElement).value);
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
              <div className="flex gap-1">
                <CountrySelect
                  containerClassName="bg-white rounded-md hover:shadow-md focus:shadow-md"
                  inputClassName="focus:border-none text-sm"
                  onChange={(e: any) => {
                    setCountry(e.name);
                    setCountryId(e.id);
                  }}
                  placeHolder="Country"
                />
                <StateSelect
                  containerClassName="bg-white rounded-md hover:shadow-md"
                  inputClassName="text-sm"
                  countryid={countryId}
                  onChange={(e: any) => {
                    setState(e.name);
                    setStateId(e.id);
                  }}
                  placeHolder="State"
                />
              </div>
            </div>

            <Button color="gray" variant="solid" highContrast>
              Clear Filters
            </Button>
          </div>
          <div className=" flex flex-col w-4/5 border  rounded-tr-xl p-5 justify-between">
            <div className="flex flex-col gap-5 mt-5">
              {loading && <Spinner />}
              {jobs && jobs.map((job) => <JobRow job={job} />)}
              {/* <JobRow /> */}
              {/* <JobRow />
              <JobRow />
              <JobRow />
              <JobRow /> */}
            </div>
            <div className="mb-3 flex gap-2 mx-auto ">{pageArr}</div>
          </div>
        </div>
      </div>
    </Theme>
  );
}
