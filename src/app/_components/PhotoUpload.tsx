"use client";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { CldImage } from "next-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Button } from "@radix-ui/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBuilding,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import DataURIParser from "datauri/parser";

type Props = {
  label: string;
  setImage: Dispatch<SetStateAction<string>>;
};

export default function PhotoUpload({ label, setImage }: Props) {
  const fileInRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function readFileDataAsBase64(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    // return reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target && event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  }

  async function upload(ev: any) {
    // const file = ev.target.files[0];
    setLoading(true);
    const reader = (await readFileDataAsBase64(ev)) as string;
    console.log(reader);
    if (reader) {
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_SECRET, // Click 'View Credentials' below to copy your API secret
      });
      const uploadResult: any = await cloudinary.uploader
        .upload(reader, {
          public_id: label + new Date().valueOf().toString(),
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(uploadResult);
      setFile(true);
      setLink(uploadResult.secure_url);
      setImage(uploadResult.secure_url);
      setLoading(false);
    }

    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url(label, {
    //   fetch_format: "auto",
    //   quality: "auto",
    // });

    // console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url(label, {
    //   crop: "auto",
    //   gravity: "auto",
    //   width: 500,
    //   height: 500,
    // });

    // console.log(autoCropUrl);
  }

  return (
    <div>
      <label>{label}</label>
      <div className="flex flex-col gap-2">
        <div className="bg-gray-300 h-32 w-32 flex items-center justify-center">
          {loading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              className="size-10 text-gray-500 animate-spin"
            />
          ) : (
            <div>
              {file ? (
                <div>
                  <CldImage
                    src={link} // Use this sample image or upload your own via the Media Explorer
                    width="128" // Transform the image: auto-crop to square aspect_ratio
                    height="128"
                    alt="uploaded photo"
                    crop={{
                      type: "auto",
                      source: true,
                    }}
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  icon={label == "Job Recruiter" ? faAddressBook : faBuilding}
                  className="size-10 text-gray-500"
                />
              )}
            </div>
          )}
        </div>

        <div className="w-32">
          {/* <CldImage
            src="" // Use this sample image or upload your own via the Media Explorer
            width="500" // Transform the image: auto-crop to square aspect_ratio
            height="500"
            alt="uploaded photo"
            crop={{
              type: "auto",
              source: true,
            }}
          /> */}
          <input
            type="file"
            onChange={(ev) => {
              ev.target.files && upload(ev);
            }}
            ref={fileInRef}
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => fileInRef.current?.click()}
            variant="soft"
          >
            Add Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
