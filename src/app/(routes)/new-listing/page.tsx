"use client";
import React, { use, useEffect, useRef, useState } from "react";
import getCompanies from "@/app/_libs/companies";
import Select from "react-select";
import Checkbox from "@/app/_components/Checkbox";
import "@radix-ui/themes/styles.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  Button,
  RadioGroup,
  Theme,
  TextField,
  TextArea,
  Heading,
} from "@radix-ui/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBuilding,
  faEnvelope,
  faLink,
  faPerson,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import PhotoUpload from "@/app/_components/PhotoUpload";

type Prop = {
  value: String;
  label: String;
};

export default function NewListing() {
  const companies = getCompanies();
  const [country, setCountry] = useState<String>("");
  const [state, setState] = useState<String>("");
  const [city, setCity] = useState<String>("");
  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);
  const [title, setTitle] = useState<String>("");
  // const [company, setCompany] = useState<Prop>({
  //   value: "",
  //   label: "",
  // });
  const [company, setCompany] = useState<String>("");
  const [otherCompany, setOtherCompany] = useState<String>("");
  const [remote, setRemote] = useState<String>("On-Site");
  const [hours, setHours] = useState<String>("Full-Time");
  const [salary, setSalary] = useState<number>(0);
  const [icon, setIcon] = useState<String>("");
  const [contactPhoto, setContactPhoto] = useState<String>("");
  const [contactName, setContactName] = useState<String>("");
  const [contactPhone, setContactPhone] = useState<String>("");
  const [contactEmail, setContactEmail] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [extraCompany, setExtraCompany] = useState<boolean>(false);
  const [companyIcon, setCompanyIcon] = useState<string>("");
  const [recruiterImage, setRecruiterImage] = useState<string>("");

  const fileInRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (company == "Other") {
      setExtraCompany(true);
    } else {
      setExtraCompany(false);
    }
  }, [company]);

  // const [onSite, setOnSite] = useState<boolean>(false);
  // const [remote, setRemote] = useState<boolean>(false);
  // const [hybrid, setHybrid] = useState<boolean>(false);

  // function toggleRemote(name: String) {
  //   if (name === "On-Site") {
  //     setOnSite(true);
  //     setRemote(false);
  //     setHybrid(false);
  //   }
  //   if (name === "Remote") {
  //     setOnSite(false);
  //     setRemote(true);
  //     setHybrid(false);
  //   }
  //   if (name === "Hybrid") {
  //     setOnSite(false);
  //     setRemote(false);
  //     setHybrid(true);
  //   }
  // }

  return (
    <form>
      <Theme>
        <div className="flex flex-col gap-5 mt-10 ">
          <Heading>New Job</Heading>
          <div>
            <TextField.Root
              size="3"
              onChange={(ev) => {
                setTitle(ev.target?.value);
              }}
              placeholder="Job Title..."
            ></TextField.Root>
            {/* <input
              type="text"
              className="border w-full px-4 py-2 rounded-md"
              placeholder="Job Title"
            /> */}
          </div>
          <div>
            <Select
              options={companies}
              placeholder="Company... (If not listed select other to manually enter)"
              onChange={(ev: any) => {
                console.log(ev);
                setCompany(ev.value);
              }}
              className="rounded-md w-full"
              styles={{
                option: (provided) => ({
                  ...provided,
                  color: "#80838D",
                }),
                control: (provided) => ({
                  ...provided,
                  color: "#80838D",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "#80838D",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#80838D",
                }),
              }}
            />
          </div>
          {extraCompany && (
            <div>
              <TextField.Root
                size="3"
                onChange={(ev) => {
                  setOtherCompany(ev.target?.value);
                }}
                placeholder="Enter Other Company Name..."
              ></TextField.Root>
            </div>
          )}
          <div className="flex justify-between">
            <div>
              <label>Remote</label>
              <RadioGroup.Root
                defaultValue="On-Site"
                name="Remote"
                onChange={(ev) => {
                  setRemote((ev.target as HTMLInputElement).value);
                }}
              >
                <RadioGroup.Item value="On-Site">On-Site</RadioGroup.Item>
                <RadioGroup.Item value="Hybrid">Hybrid</RadioGroup.Item>
                <RadioGroup.Item value="Remote">Remote</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div>
              <label>Work Hours</label>
              <RadioGroup.Root
                defaultValue="Full-Time"
                name="Hours"
                onChange={(ev) => {
                  setHours((ev.target as HTMLInputElement).value);
                }}
              >
                <RadioGroup.Item value="Full-Time">Full-Time</RadioGroup.Item>
                <RadioGroup.Item value="Part-Time">Part-Time</RadioGroup.Item>
                <RadioGroup.Item value="Contract">Contract</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div className="w-[30%]">
              <label>Approximate Salary</label>
              <TextField.Root
                onChange={(ev) => {
                  setSalary(Number(ev.target?.value));
                }}
                placeholder="Amount"
              >
                <TextField.Slot>$</TextField.Slot>
                <TextField.Slot>k/year</TextField.Slot>
              </TextField.Root>
              {/* <input type="text" className="border" placeholder="Salary" /> */}
            </div>
          </div>
          <div>
            <label>Location</label>
            <div className="flex justify-between :w-1/4">
              <div className="w-[30%]">
                <CountrySelect
                  onChange={(e: any) => {
                    setCountry(e.name);
                    setCountryId(e.id);
                  }}
                  placeHolder="Select Country"
                />
              </div>
              <div className="w-[30%]">
                <StateSelect
                  countryid={countryId}
                  onChange={(e: any) => {
                    setState(e.name);
                    setStateId(e.id);
                  }}
                  placeHolder="Select State"
                />
              </div>
              <div className="w-[30%]">
                <CitySelect
                  countryid={countryId}
                  stateid={stateId}
                  onChange={(e: any) => {
                    setCity(e.name);
                    setCityId(e.id);
                  }}
                  placeHolder="Select City"
                />
              </div>
            </div>
          </div>

          <PhotoUpload setImage={setCompanyIcon} label={"Company Icon"} />

          {/* <div>
            <label>Company Icon</label>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-300 h-32 w-32 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="size-10 text-gray-500"
                />
              </div>
              <PhotoUpload />
            </div>
          </div> */}
          <div className="flex gap-2">
            <PhotoUpload setImage={setRecruiterImage} label={"Job Recruiter"} />
            {/* <div>
              <label>Job Contact</label>
              <div className="flex flex-col gap-2">
                <div className="bg-gray-300 h-32 w-32 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faAddressBook}
                    className="size-10 text-gray-500"
                  />
                </div>
                <PhotoUpload />
              </div>
            </div> */}
            <div className="flex flex-col gap-2 mt-6 grow">
              <div>
                <TextField.Root
                  onChange={(ev) => {
                    setContactName(ev.target?.value);
                  }}
                  placeholder="John Doe"
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                  </TextField.Slot>
                </TextField.Root>
              </div>
              <div>
                <TextField.Root
                  onChange={(ev) => {
                    setContactPhone(ev.target?.value);
                  }}
                  placeholder="(774)-223-2246"
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                  </TextField.Slot>
                </TextField.Root>
              </div>
              <div>
                <TextField.Root
                  onChange={(ev) => {
                    setContactEmail(ev.target?.value);
                  }}
                  placeholder="johndoe@email.com"
                >
                  <TextField.Slot>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-500"
                    />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col gap-2 mb-2">
            <label>Application Link</label>
            <TextField.Root placeholder="https://www.amazon.jobs/en/jobId/122322">
              <TextField.Slot>
                <FontAwesomeIcon icon={faLink} className="text-gray-500" />
              </TextField.Slot>
            </TextField.Root>
          </div> */}

          <div className="flex flex-col gap-2 mb-2">
            <label>Job Description</label>
            <TextArea
              onChange={(ev) => {
                setDescription(ev.target?.value);
              }}
              size="3"
              resize="vertical"
              placeholder="Minimum Qualifications..."
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded-md mx-auto"
        >
          Save
        </button>
      </Theme>
    </form>
  );
}
