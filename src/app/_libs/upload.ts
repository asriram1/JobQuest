"use server";
import React from "react";
import { v2 as cloudinary } from "cloudinary";

export default async function upload({ reader, label }) {
  if (reader) {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_KEY,
      api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_SECRET, // Click 'View Credentials' below to copy your API secret
    });
    const new_name = { label } + new Date().valueOf().toString();
    const uploadResult: any = await cloudinary.uploader
      .upload(reader, {
        public_id: new_name,
      })
      .catch((error) => {
        console.log(error);
      });

    return uploadResult;

    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url(new_name, {
    //   fetch_format: "auto",
    //   quality: "auto",
    // });

    // console.log(optimizeUrl);

    // return optimizeUrl;
    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url(label, {
    //   crop: "auto",
    //   gravity: "auto",
    //   width: 500,
    //   height: 500,
    // });

    // return autoCropUrl;

    // setFile(true);
    // setLink(uploadResult.secure_url);
    // setImage(uploadResult.secure_url);
  }
}
