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
  ScrollArea,
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
import { convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";

type Prop = {
  value: String;
  label: String;
};
import axios from "axios";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/app/_components/Header";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default function NewListing() {
  const companies = getCompanies();
  const [country, setCountry] = useState<String>("");
  const [state, setState] = useState<String>("");
  const [city, setCity] = useState<String>("");
  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);
  const [title, setTitle] = useState<String>("");
  const [company, setCompany] = useState<String>("");
  const [otherCompany, setOtherCompany] = useState<String>("");
  const [remote, setRemote] = useState<String>("On-Site");
  const [hours, setHours] = useState<String>("Full-Time");
  const [salary, setSalary] = useState<number>(0);
  const [recruiterName, setRecruiterName] = useState<String>("");
  const [recruiterPhone, setRecruiterPhone] = useState<String>("");
  const [recruiterEmail, setRecruiterEmail] = useState<String>("");
  const [description, setDescription] = useState<any>();
  const [extraCompany, setExtraCompany] = useState<boolean>(false);
  const [companyIcon, setCompanyIcon] = useState<string>("");
  const [recruiterImage, setRecruiterImage] = useState<string>("");
  const [content, setContent] = useState();

  const Editor = dynamic<EditorProps>(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

  useEffect(() => {
    if (company == "Other") {
      setExtraCompany(true);
    } else {
      setExtraCompany(false);
    }
  }, [company]);

  async function handleSubmit(ev) {
    ev.preventDefault();
    getSessionUser().then((user) => {
      console.log(user);
      const data = {
        title,
        company,
        otherCompany,
        remote,
        hours,
        salary,
        country,
        state,
        city,
        companyIcon,
        recruiterImage,
        recruiterName,
        recruiterPhone,
        recruiterEmail,
        description,
        userId: user?.id,
      };
      console.log(data);
      axios.post("/api/ad", data).then((data: any) => {
        console.log(data);
        redirect("/listing/" + data._id);
      });
      // return data;
    });
  }

  function handleContentChange(content) {
    setContent(content);
    console.log(content);
    console.log(draftToHtml(content));
    // const contentForDb = convertFromRaw(content);
    setDescription(content);
  }

  return (
    <form onSubmit={(ev) => handleSubmit(ev)}>
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
              <label>Work Style</label>
              <RadioGroup.Root>
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
            <div>
              <label>Work Hours</label>
              <RadioGroup.Root>
                <RadioGroup.Item
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
          <div className="flex gap-2">
            <PhotoUpload setImage={setRecruiterImage} label={"Job Recruiter"} />
            <div className="flex flex-col gap-2 mt-6 grow">
              <div>
                <TextField.Root
                  onChange={(ev) => {
                    setRecruiterName(ev.target?.value);
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
                    setRecruiterPhone(ev.target?.value);
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
                    setRecruiterEmail(ev.target?.value);
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

          <div className="flex flex-col gap-2 mb-2">
            <label>Job Description</label>
            <Editor
              wrapperClassName="wrapper"
              editorClassName="editor"
              toolbarClassName="toolbar"
              onContentStateChange={handleContentChange}
            />
            {/* <TextArea
              onChange={(ev) => {
                setDescription(ev.target?.value);
              }}
              size="3"
              resize="vertical"
              placeholder="Minimum Qualifications..."
            /> */}
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
