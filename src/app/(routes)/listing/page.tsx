"use client";
import JobRow from "@/app/_components/JobRow";
import {
  Button,
  Heading,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Theme,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React, { useState } from "react";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import getCompanies from "@/app/_libs/companies";
import Select from "react-select";

export default function AllListing() {
  const companies = getCompanies();
  const [remote, setRemote] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [country, setCountry] = useState<String>("");
  const [state, setState] = useState<String>("");
  const [city, setCity] = useState<String>("");
  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);
  const [company, setCompany] = useState<String>("");
  return (
    <Theme>
      <div className="mt-10">
        <Heading>All Jobs</Heading>

        <div className="flex mt-10 rounded-t-xl ">
          <div className=" flex flex-col gap-5 items center w-1/5 border bg-blue-100 p-8 rounded-tl-xl ">
            <div className="">
              <Heading size="4" weight="medium" align="center">
                Filters
              </Heading>
            </div>
            <div className="flex flex-col">
              Salary:
              <Slider defaultValue={[25, 75]} />
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
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#a0aec0",
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
                  className="w-full bg-white px-3 py-1 rounded-md border border-[#CCCCCC] text-gray-400 hover:shadow-md focus:shadow-md  !outline-none "
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
              Work-Style:
              <div className="w-full">
                <RadioGroup.Root defaultValue="All">
                  <RadioGroup.Item value="All">All</RadioGroup.Item>
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
              Work-Hours:
              <div className="w-full">
                <RadioGroup.Root defaultValue="All">
                  <RadioGroup.Item value="All">All</RadioGroup.Item>
                  <RadioGroup.Item
                    className="hover:shadow-innder"
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="Full-Time"
                  >
                    Full-Time
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
                    }}
                    value="Part-Time"
                  >
                    Part-Time
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={(ev) => {
                      setRemote((ev.target as HTMLInputElement).value);
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
                  onChange={(e: any) => {
                    setCountry(e.name);
                    setCountryId(e.id);
                  }}
                  placeHolder="Country"
                />
                <StateSelect
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
          <div className=" flex flex-col w-4/5 border  rounded-tr-xl p-5">
            <div className="flex flex-col gap-5 mt-5">
              <JobRow />
              <JobRow />
              <JobRow />
              <JobRow />
              <JobRow />
            </div>
            <div className="mt-2 flex gap-2 mx-auto">
              <Button color="gray" radius="full" variant="classic" highContrast>
                1
              </Button>
              <Button color="gray" radius="full" variant="soft" highContrast>
                2
              </Button>
              <Button color="gray" radius="full" variant="classic" highContrast>
                3
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Theme>
  );
}
