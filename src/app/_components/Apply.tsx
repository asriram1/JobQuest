import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Heading, Theme } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Apply() {
  const [showConfirm, setShowConfirm] = useState<Boolean>(false);
  const [showSuccess, setShowSuccess] = useState<Boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<Boolean>(false);
  const [terms, setTerms] = useState<Boolean>(true);
  const [file, setFile] = useState<string>("");
  const router = useRouter();

  //   useEffect(() => {
  //     if (confirmDelete) {
  //       // onDelete();
  //       router.push("/");
  //     }
  //   }, [confirmDelete === true]);

  // async function onDelete() {
  //   await deleteAd(id);
  // }

  async function uploadResume(files) {
    const data = new FormData();
    const API_ENDPOINT =
      "https://tjudqfaua0.execute-api.us-east-1.amazonaws.com/default/getPresignedUrl-job-app";
    const bucket = "job-app-resume";

    let key = "";
    const getPresignedUrl = async () => {
      const response = await axios({
        method: "GET",
        url: API_ENDPOINT,
      });
      // return response;
      const preSignedUrl = response.data.presignedUrl;
      key = response.data.key;

      return preSignedUrl;
    };

    const presignedUrl = await getPresignedUrl();
    console.log(presignedUrl);

    const uploadResponse = await axios.put(presignedUrl, files[0], {
      headers: {
        "Content-Type": "application/pdf",
      },
    });

    console.log(uploadResponse);
    if (uploadResponse.status !== 200) {
      alert("Upload Error");
      setShowConfirm(false);
      //   setIsUploading(false);
      //   setError(true);
      //   break;
    } else {
      setShowConfirm(false);
      setShowSuccess(true);
    }
    // console.log(uploadResponse);
    const link = "https://" + bucket + ".s3.amazonaws.com/" + key;
    setFile(link);

    // if (!error) {
    //     toast.success("Upload Complete");
    //     setIsUploading(false);
    //   }

    // // setLocalImages([]);
    // // setImages([]);
    // for (var x = 0; x < files.length; x++) {
    //   // data.append("files[]", files[x]);

    //   const presignedUrl = await getPresignedUrl();
    //   const uploadResponse = await axios.put(presignedUrl, files[x], {
    //     headers: {
    //       "Content-Type": "image/jpeg",
    //     },
    //   });

    //   if (uploadResponse.status !== 200) {
    //     toast.error("Upload Error");
    //     setIsUploading(false);
    //     setError(true);
    //     break;
    //   }
    //   // setUploadResponse(uploadResponse);
    //   console.log(uploadResponse);
    //   const link = "https://" + bucket + ".s3.amazonaws.com/" + key;
    //   setLocalImages((prevItems) => [...prevItems, link]);
    // }
    // // const response = await fetch("/api/upload", {
    // //   method: "POST",
    // //   body: data,
    // // });
    // // const links = await response.json();

    // // setImages(links);
    // // setLocalImages(links);
    // // console.log(links);
  }

  if (showConfirm) {
    return (
      <Theme>
        <div
          onClick={() => {
            setShowConfirm(false);
          }}
          className="fixed bg-black/50 inset-0 flex items-center h-full justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className=" bg-white p-6 rounded-lg"
          >
            <div className=" flex justify-end mb-1">
              <button
                onClick={() => {
                  setShowConfirm(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex justify-center">
              <Heading> Quick Apply</Heading>
            </div>

            <div className="flex gap-2 mt-3 items-center justify-center">
              {/* <button
                type="button"
                className="bg-gray-400 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
                onClick={() => setShowConfirm(false)}
              >
                <FontAwesomeIcon className="size-2" icon={faFile} />
                Upload Resume{" "}
              </button> */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <Checkbox
                    onClick={() => {
                      setTerms((prev) => {
                        return !prev;
                      });
                    }}
                    defaultChecked
                  />
                  Agree to Terms and Conditions
                </div>

                {terms && (
                  <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(ev) => {
                        ev.preventDefault();
                        uploadResume(ev.target.files);
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      class="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                      />
                    </svg>
                    Upload Resume
                  </label>
                )}
              </div>

              {/* <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmDelete(true);
                }}
                type="button"
                className="bg-red-400 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
              >
                <FontAwesomeIcon className="size-2" icon={faTrash} />
                Yes,&nbsp;delete
              </button> */}
            </div>
          </div>
        </div>
      </Theme>
    );
  }

  if (showSuccess) {
    return (
      <Theme>
        <div
          onClick={() => {
            setShowSuccess(false);
          }}
          className="fixed bg-black/50 inset-0 flex items-center h-full justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className=" bg-white p-6 rounded-lg"
          >
            <div className=" flex justify-end mb-1">
              <button
                onClick={() => {
                  setShowSuccess(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2 items-center ">
              <div className="flex justify-center">
                <Heading> Application Submitted</Heading>
              </div>
              <img src={"/yes.png"} className="size-32" alt="success" />
              <button className="bg-blue-600 text-white px-4 py-2 w-full rounded-md mx-auto mt-3">
                View My Applications
              </button>
            </div>
          </div>
        </div>
      </Theme>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="bg-blue-600 text-white px-4 py-2 w-full rounded-md mx-auto"
    >
      Apply Now
    </button>
    //   <button
    //     type="button"
    //     className="bg-red-400 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
    //     onClick={() => setShowConfirm(true)}
    //   >
    //     <FontAwesomeIcon className="size-2" icon={faTrash} />
    //     <span>{label}</span>
    //   </button>
  );
}
