"use client";
import {
  Avatar,
  Button,
  Heading,
  Link,
  ScrollArea,
  Theme,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "isomorphic-dompurify";
import { getSessionUser } from "@/app/_components/Header";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Apply from "@/app/_components/Apply";

import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";
import loginLink from "../../authentication/page";
import { usePathname } from "next/navigation";

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
  const [loggedUserId, setLoggedUserId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [editor, setEditor] = useState<boolean>(false);
  const router = useRouter();

  // const [pathname, setPathname] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    axios.get("/api/ad", { params: { id: args.params.id } }).then((res) => {
      console.log(res);
      const data = res.data;
      console.log(data);
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
        if (user?.id != undefined && data.userId == loggedUserId) {
          setEditor(true);
        }
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

  async function signingIn() {
    const signInUrl = await loginLink();

    return signInUrl;
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

        {/* {loggedUserId ? (
          <div>
            <Apply />
          </div>
        ) : (
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 w-full rounded-md mx-auto">
              Login to Apply
            </button>
          </div>
        )} */}
        <div className="flex w-full">
          {!editor ? (
            <>
              {" "}
              {loggedUserId ? (
                <div className="w-full">
                  <Apply />
                </div>
              ) : (
                <div className="w-full">
                  <button
                    onClick={() => {
                      signingIn().then((result) => {
                        console.log(result);

                        console.log(pathname);
                        console.log(
                          result.replace(
                            /redirect_uri.*response_type=/,
                            "redirect_uri=http://localhost:3000" +
                              pathname +
                              "&response_type="
                          )
                        );

                        router.push(
                          "https://api.workos.com/user_management/authorize?client_id=client_01J2PP9HHD4B9HFJR4ZF82DRKX&provider=authkit&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flisting%2F669674c4576f4b0f5f354c6c&response_type=code&screen_hint=sign-in"
                        );
                      });
                    }}
                    className="bg-blue-600 text-white px-4 py-2 w-full rounded-md mx-auto"
                  >
                    Login to Apply
                  </button>
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
                    // router.push("/listing/edit/" + args.params.id);
                  }}
                  className="bg-gray-200 text-black px-4 py-2 w-1/2 rounded-md mx-auto"
                >
                  Edit Post
                </button>
                <button className="bg-red-400 text-white px-4 py-2 w-1/2 rounded-md mx-auto">
                  Delete Post
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Theme>
  );
}
