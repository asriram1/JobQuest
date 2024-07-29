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
import upload from "../_libs/upload";
import reactSelect from "react-select";

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

  async function uploadCaller(ev) {
    setLoading(true);
    const reader = (await readFileDataAsBase64(ev)) as string;

    upload({ reader, label }).then((result) => {
      setTimeout(() => {
        setFile(true);
        setLink(result.secure_url);
        setImage(result.secure_url);
        setLoading(false);
      }, 3000);
    });
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
                  {label == "Job Recruiter" ? (
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
                  ) : (
                    <img src={link} alt={"image"} className="size-32" />
                  )}
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
          <input
            type="file"
            onChange={(ev) => {
              ev.target.files && uploadCaller(ev);
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
