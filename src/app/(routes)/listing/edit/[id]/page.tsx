"use client";
import {
  Avatar,
  Heading,
  ScrollArea,
  Theme,
  Button,
  Card,
  Link,
  Box,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "@radix-ui/themes/styles.css";
import Select from "react-select";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import DOMPurify from "isomorphic-dompurify";
import { renderToStaticMarkup } from "react-dom/server";
// import Html2ReactParser from "html-to-react/types/parser";
const HtmlToReactParser = require("html-to-react").Parser;
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPencil,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// import { getSessionUser } from "@/app/_components/Header";
import { RadioGroup, TextField, TextArea } from "@radix-ui/themes";
import getCompanies from "@/app/_libs/companies";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import PhotoUpload from "@/app/_components/PhotoUpload";

type Props = {
  params: {
    id: string;
  };
  // searchParam: { [key: string]: string };
};
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import { getSessionUser } from "@/app/(routes)/authentication/page";

export default function EditListingIdPage(args: Props) {
  const companies = getCompanies();
  const [data, setData] = useState("");
  const [country, setCountry] = useState<String>("");
  const [state, setState] = useState<String>("");
  const [city, setCity] = useState<String>("");
  const [title, setTitle] = useState<string>("");
  const [company, setCompany] = useState<String>("");
  const [otherCompany, setOtherCompany] = useState<String>("");
  const [remote, setRemote] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [recruiterName, setRecruiterName] = useState<string>("");
  const [recruiterPhone, setRecruiterPhone] = useState<string>("");
  const [recruiterEmail, setRecruiterEmail] = useState<string>("");
  const [description, setDescription] = useState<String>("");
  const [extraCompany, setExtraCompany] = useState<boolean>(false);
  const [companyIcon, setCompanyIcon] = useState<string>("");
  const [recruiterImage, setRecruiterImage] = useState<string>("");

  const [descriptionButton, setDescriptionButton] = useState<boolean>(false);
  const [titleToggle, setTitleToggle] = useState<boolean>(false);
  const [companyToggle, setCompanyToggle] = useState<boolean>(false);
  const [locationToggle, setLocationToggle] = useState<boolean>(false);
  const [iconToggle, setIconToggle] = useState<boolean>(false);
  const [recImageToggle, setRecImageToggle] = useState<boolean>(false);
  const [recNameToggle, setRecNameToggle] = useState<boolean>(false);
  const [phoneEmailToggle, setPhoneEmailToggle] = useState<boolean>(false);
  const [otherToggle, setOtherToggle] = useState<boolean>(false);

  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);

  const [showSaveChangesButton, setShowSaveChangesButton] =
    useState<boolean>(false);

  const [contentState, setContentState] = useState(null); // ContentState JSON

  const [editedContent, setEditedContent] = useState();
  const router = useRouter();

  // const Editor = dynamic<EditorProps>(
  //   () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  //   { ssr: false }
  // );

  useEffect(() => {
    axios.get("/api/ad", { params: { id: args.params.id } }).then((res) => {
      const data = res.data;
      setCountry(data.country);
      setState(data.state);
      setCity(data.city);
      setTitle(data.title);
      setCompany(data.company);
      setOtherCompany(data.otherCompany);
      setRemote(data.remote);
      setHours(data.hours);
      setSalary(data.salary);
      setRecruiterName(data.recruiterName);
      setRecruiterPhone(data.recruiterPhone);
      setRecruiterEmail(data.recruiterEmail);
      setExtraCompany(data.extraCompany);
      setCompanyIcon(data.companyIcon);
      setRecruiterImage(data.recruiterImage);
      setDescription(draftToHtml(data.description));

      data.description["entityMap"] = {};
      setContentState(data.description);
    });
  }, []);

  function handleContentChange(content) {
    setEditedContent(content);
    setDescription(draftToHtml(content));
    setContentState(content);
  }

  async function handleSaveChanges() {
    getSessionUser().then((user) => {
      const data = {
        id: args.params.id,
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
        description: editedContent,
        userId: user?.id,
      };
      console.log(data);
      axios.put("/api/ad", data).then((data: any) => {
        router.push("/listing/" + args.params.id);
      });
    });
  }
  function handleCancelChanges() {
    router.push("/listing/edit/" + args.params.id);
  }

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }
  return (
    <Theme>
      <div className="flex flex-col gap-10 mt-10">
        <div>
          {/* <Box maxWidth="240px">
            <Card> */}
          <Heading>Job Post</Heading>

          <Link href={"/listing/" + args.params.id}>
            Req No: {args.params.id}
          </Link>
          {/* </Card>
          </Box> */}
        </div>

        <div className="flex gap-5 items-center justify-between">
          <div className="flex items-center">
            <div>
              <div className="flex gap-1 justify-start items-start">
                {!titleToggle ? (
                  <Heading>{title}</Heading>
                ) : (
                  <div>
                    <TextField.Root
                      size="3"
                      onChange={(ev) => {
                        setTitle(ev.target?.value);
                      }}
                      placeholder={title}
                    ></TextField.Root>
                  </div>
                )}

                <FontAwesomeIcon
                  icon={faPencil}
                  className="size-4 mt-3 text-gray-500 cursor-pointer"
                  onClick={() => {
                    setTitleToggle((prev) => {
                      return !prev;
                    });

                    setShowSaveChangesButton(true);
                  }}
                />
              </div>

              <div className="flex gap-1 items-start">
                {!companyToggle ? (
                  <p>{company}</p>
                ) : (
                  <Select
                    options={companies}
                    placeholder={company}
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
                )}
                <FontAwesomeIcon
                  icon={faPencil}
                  className="size-4 mt-1 text-gray-500 cursor-pointer"
                  onClick={() => {
                    setCompanyToggle((prev) => {
                      return !prev;
                    });

                    setShowSaveChangesButton(true);
                  }}
                />
              </div>

              <div className="flex gap-1  text-gray-400">
                {!locationToggle ? (
                  <div className="flex  text-gray-400">
                    <div className="text-xs">{city} &nbsp;- &nbsp; </div>
                    <div className="text-xs">{state}, </div>
                    <div className="text-xs">{country}</div>
                  </div>
                ) : (
                  <div className="flex justify-between :w-1/4">
                    <div className="w-[30%]">
                      <CountrySelect
                        onChange={(e: any) => {
                          setCountry(e.name);
                          setCountryId(e.id);
                        }}
                        placeHolder={country}
                      />
                    </div>
                    <div className="w-[30%]">
                      <StateSelect
                        countryid={countryId}
                        onChange={(e: any) => {
                          setState(e.name);
                          setStateId(e.id);
                        }}
                        placeHolder={state}
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
                        placeHolder={city}
                      />
                    </div>
                  </div>
                )}

                <FontAwesomeIcon
                  icon={faPencil}
                  className="size-4 text-gray-500 cursor-pointer"
                  onClick={() => {
                    setLocationToggle((prev) => {
                      return !prev;
                    });

                    setShowSaveChangesButton(true);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {!iconToggle ? (
                <>
                  <Avatar src={companyIcon} size="6" fallback="I" />
                  <Button
                    onClick={() => {
                      setIconToggle((prev) => {
                        return !prev;
                      });

                      setShowSaveChangesButton(true);
                    }}
                    color="gray"
                    variant="solid"
                    highContrast
                  >
                    Edit
                  </Button>
                </>
              ) : (
                <PhotoUpload setImage={setCompanyIcon} label={""} />
              )}

              {/* <img src={companyIcon} alt="company icon" className="size-16" /> */}
            </div>
          </div>

          <div className="">
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                {!recImageToggle ? (
                  <>
                    <Avatar src={recruiterImage} size="6" fallback="R" />
                    <Button
                      onClick={() => {
                        setRecImageToggle((prev) => {
                          return !prev;
                        });

                        setShowSaveChangesButton(true);
                      }}
                      color="gray"
                      variant="solid"
                      highContrast
                    >
                      Edit
                    </Button>
                  </>
                ) : (
                  <PhotoUpload setImage={setRecruiterImage} label={""} />
                )}
              </div>

              <div className="flex flex-col gap-5">
                <div className="font-bold">Recruiter</div>
                <div>
                  <div className="flex gap-1">
                    {!recNameToggle ? (
                      <p> {recruiterName}</p>
                    ) : (
                      <TextField.Root
                        onChange={(ev) => {
                          setRecruiterName(ev.target?.value);
                        }}
                        placeholder={recruiterName}
                      >
                        <TextField.Slot>
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-gray-500"
                          />
                        </TextField.Slot>
                      </TextField.Root>
                    )}

                    <FontAwesomeIcon
                      icon={faPencil}
                      className="size-4 text-gray-500 cursor-pointer"
                      onClick={() => {
                        setRecNameToggle((prev) => {
                          return !prev;
                        });

                        setShowSaveChangesButton(true);
                      }}
                    />
                  </div>
                  <div className=" flex gap-1 text-nowrap text-gray-400">
                    {!phoneEmailToggle ? (
                      <div className="text-xs">
                        {recruiterPhone} -{" "}
                        <a
                          className="text-blue-500 text-xs"
                          href={
                            "mailto:" +
                            recruiterEmail +
                            "?subject=Application for " +
                            title +
                            " @ " +
                            company
                          }
                        >
                          {recruiterEmail}
                        </a>
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <div>
                          <TextField.Root
                            onChange={(ev) => {
                              setRecruiterPhone(ev.target?.value);
                            }}
                            placeholder={recruiterPhone}
                          >
                            <TextField.Slot>
                              <FontAwesomeIcon
                                icon={faPhone}
                                className="text-gray-500"
                              />
                            </TextField.Slot>
                          </TextField.Root>
                        </div>
                        <div>
                          <TextField.Root
                            onChange={(ev) => {
                              setRecruiterEmail(ev.target?.value);
                            }}
                            placeholder={recruiterEmail}
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
                    )}

                    <FontAwesomeIcon
                      icon={faPencil}
                      className="size-4 text-gray-500 cursor-pointer"
                      onClick={() => {
                        setPhoneEmailToggle((prev) => {
                          return !prev;
                        });

                        setShowSaveChangesButton(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <Heading>Job Description</Heading>
          <FontAwesomeIcon
            icon={faPencil}
            className="size-4 text-gray-500 cursor-pointer"
            onClick={() => {
              setDescriptionButton((prev) => {
                return !prev;
              });

              setShowSaveChangesButton(true);
            }}
          />
        </div>

        <ScrollArea type="always" scrollbars="vertical" style={{ height: 600 }}>
          <div
            className="px-2 "
            dangerouslySetInnerHTML={createMarkup(description)}
          ></div>
        </ScrollArea>

        {contentState && descriptionButton && (
          <Editor
            wrapperClassName="wrapper"
            editorClassName="editor"
            toolbarClassName="toolbar"
            // editorState={editorState}
            defaultContentState={contentState}
            onContentStateChange={handleContentChange}
          />
        )}

        <div className="flex flex-col">
          <div className="flex gap-1 items-center">
            <Heading>Other Information</Heading>
            <FontAwesomeIcon
              icon={faPencil}
              className="size-4 text-gray-500 cursor-pointer"
              onClick={() => {
                setOtherToggle((prev) => {
                  return !prev;
                });

                setShowSaveChangesButton(true);
              }}
            />
          </div>

          <div className="flex flex-col px-2 mt-5">
            {!otherToggle ? (
              <div>
                <div>
                  <b>Work Style: </b>
                  {remote}
                </div>
                <div>
                  <b>Work Hours:</b> {hours}
                </div>
                <div>
                  <b>Approximate Salary:</b> USD {salary},000
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <label>Work Style</label>
                  <RadioGroup.Root defaultValue={remote} name="Remote">
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
                  <RadioGroup.Root defaultValue={hours} name="Hours">
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
                    placeholder={salary.toString()}
                  >
                    <TextField.Slot>$</TextField.Slot>
                    <TextField.Slot>k/year</TextField.Slot>
                  </TextField.Root>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 w-full rounded-md mx-auto"
          >
            Apply by uploading resume
          </button> */}
          {showSaveChangesButton && (
            <div className="flex gap-1 w-full">
              {/* <Button onClick={() => handleSaveChanges()} variant="classic">
                Save Changes
              </Button>
              <Button
                onClick={() => handleCancelChanges()}
                color="gray"
                variant="classic"
              >
                Cancel
              </Button> */}
              <button
                className="bg-blue-600 text-white px-4 py-2 w-1/2 rounded-md mx-auto"
                onClick={() => handleSaveChanges()}
              >
                Save Changes
              </button>
              <button
                type="submit"
                className="bg-gray-200 text-black px-4 py-2 w-1/2 rounded-md mx-auto"
                onClick={() => handleCancelChanges()}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </Theme>
  );
}
