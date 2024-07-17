"use server";
import mongoose from "mongoose";
import React from "react";
import { AdModel } from "../_models/Ad";

export default async function getModelCount() {
  mongoose.connect(process.env.MONGODB_URI as string);
  const length = await AdModel.countDocuments({}, { hint: "_id_" });
  return length;
}
