"use client";
import {
  AlertDialog,
  Avatar,
  Button,
  Callout,
  DropdownMenu,
  Heading,
  Link,
  ScrollArea,
  Theme,
  Flex,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "isomorphic-dompurify";
// import { getSessionUser } from "@/app/_components/Header";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Apply from "@/app/_components/Apply";

import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";
import { getSessionUser, loginLink } from "../../authentication/page";
import { usePathname } from "next/navigation";
import Header from "@/app/_components/Header";
import { Ad } from "@/app/_models/Ad";
import { getApplied } from "@/app/api/jobApp/route";
import { stateContext } from "@/app/_components/AppContext";

type Props = {
  params: {
    id: string;
  };
  // searchParam: { [key: string]: string };
};

export default function ListingIdPage(args: Props) {
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
  const [loggedUserId, setLoggedUserId] = useState<string | undefined>();
  const [userId, setUserId] = useState<string>("");
  const [editor, setEditor] = useState<boolean>(false);
  const [job, setJob] = useState<Ad>();
  const [alreadyApplied, setAlreadyApplied] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/ad", { params: { id: args.params.id } }).then((res) => {
      console.log(res);

      const data = res.data;
      console.log(data);
      setJob(data);
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
      setUserId(data.userId);

      getSessionUser().then((user) => {
        console.log(user?.id);
        console.log(data.userId);
        setLoggedUserId(user?.id);
        if (data.userId == user?.id) {
          setEditor(true);
        }
        getApplied(user?.id, data._id).then((result) => {
          console.log(result);
          setAlreadyApplied(result);
        });
      });
    });
  }, []);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  function handleEditClick() {
    router.push("/listing/edit/" + args.params.id);
  }

  async function deletePost() {
    const id = args.params.id;
    axios.delete("/api/ad", { params: { id: id } }).then((result) => {
      alert("Deleted Successfully");
      router.push("/listing");
    });
  }

  return (
    <Theme>
      <div className="flex flex-col gap-10 mt-10">
        <div>
          <Heading>Job Post</Heading>
          <Link href={"/listing/" + args.params.id}>
            Req No: {args.params.id}
          </Link>
        </div>

        <div className="flex gap-5 items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <div className="flex justify-start items-start">
                <Heading>{title}</Heading>
              </div>

              <div className="flex items-start">
                <p>{company}</p>
              </div>

              <div className="flex  text-gray-400">
                <div className="flex  text-gray-400">
                  <div className="text-xs">{city} &nbsp;- &nbsp; </div>
                  <div className="text-xs">{state}, </div>
                  <div className="text-xs">{country}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Avatar src={companyIcon} size="6" fallback="I" />
              {/* <img src={companyIcon} alt="company icon" className="size-16" /> */}
            </div>
          </div>

          <div className="">
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <Avatar src={recruiterImage} size="6" fallback="R" />
              </div>

              <div className="flex flex-col gap-5">
                <div className="font-bold">Recruiter</div>
                <div>
                  <div className="flex">
                    <p> {recruiterName}</p>
                  </div>
                  <div className=" flex text-nowrap text-gray-400">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Heading>Job Description</Heading>
        </div>

        <ScrollArea type="always" scrollbars="vertical" style={{ height: 600 }}>
          <div
            className="px-2 "
            dangerouslySetInnerHTML={createMarkup(description)}
          ></div>
        </ScrollArea>

        <div className="flex flex-col">
          <div className="flex items-center">
            <Heading>Other Information</Heading>
          </div>

          <div className="flex flex-col px-2 mt-5">
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
          </div>
        </div>

        <div className="flex w-full">
          {alreadyApplied ? (
            <div className="mx-auto">
              <Callout.Root>
                <Callout.Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </Callout.Icon>
                <Callout.Text>
                  You have already applied for this position.
                </Callout.Text>
              </Callout.Root>
            </div>
          ) : (
            <div className="flex w-full">
              {!editor ? (
                <>
                  {" "}
                  {loggedUserId ? (
                    <div className="w-full">
                      <Apply job={job} userId={loggedUserId} />
                    </div>
                  ) : (
                    <div className="mx-auto">
                      <Callout.Root>
                        <Callout.Icon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            />
                          </svg>
                        </Callout.Icon>
                        <Callout.Text>
                          You will need to login to apply for this job.
                        </Callout.Text>
                      </Callout.Root>
                    </div>
                  )}
                </>
              ) : (
                // <Apply /> https://api.workos.com/user_management/authorize?client_id=client_01J2PP9HHD4B9HFJR4ZF82DRKX&provider=authkit&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&response_type=code&screen_hint=sign-in
                // https://api.workos.com/user_management/authorize?client_id=client_01J2PP9HHD4B9HFJR4ZF82DRKX&provider=authkit&redirect_uri=http://localhost:3000/listing/669674c4576f4b0f5f354c6c&response_type=code&screen_hint=sign-in
                <>
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => {
                        handleEditClick();
                      }}
                      className="bg-gray-200 text-black px-4 py-2 w-1/2 rounded-md mx-auto"
                    >
                      Edit Post
                    </button>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <button className="bg-red-400 text-white px-4 py-2 w-1/2 rounded-md mx-auto">
                          Delete Post
                        </button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Delete Post</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          Are you sure? This job post will no longer be
                          accessible to any future applicants.
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button
                              onClick={() => {
                                deletePost();
                              }}
                              variant="solid"
                              color="red"
                            >
                              Delete
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Theme>
  );
}
