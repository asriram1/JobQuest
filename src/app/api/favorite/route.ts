"use server";

import { Favorite, FavModel } from "@/app/_models/Favorite";

import mongoose, { FilterQuery } from "mongoose";

export async function POST(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const body = await req.json();
  console.log(body);

  const { job, userId } = body;

  const FavDoc = await FavModel.create({
    ad: job,
    userId,
  });
  console.log(FavDoc);
  return Response.json(FavDoc);
}

export async function getFavorited(userId, adId) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const appDocs = await FavModel.find({ userId: userId });

  for (let i = 0; i < appDocs.length; i++) {
    if (appDocs[i].ad._id == adId) {
      return true;
    }
  }
  return false;
}

export async function DELETE(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const adId = url.searchParams.get("adId");
  const result = await FavModel.findOneAndDelete({
    userId: userId,
    "ad._id": adId,
  });

  return Response.json(true);
}

export async function GET(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const url = new URL(req.url);
  const filter: FilterQuery<Favorite> = {};
  const sort = url.searchParams.get("sort") || null;
  const userId = url.searchParams.get("userId");

  if (sort == "latest") {
    const favDocs = await FavModel.find({ userId: userId }).sort(
      "-ad.createdAt"
    );
    return Response.json(favDocs);
  }

  const favDocs = await FavModel.find({ userId: userId }).sort("ad.createdAt");

  return Response.json(favDocs);
}
