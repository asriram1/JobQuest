"use server";
import { Application, AppModel } from "@/app/_models/Application";
import mongoose, { FilterQuery } from "mongoose";

export async function POST(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const body = await req.json();
  console.log(body);

  const { job, userId, document } = body;

  const AppDoc = await AppModel.create({
    ad: job,
    userId,
    document,
  });
  console.log(AppDoc);
  return Response.json(AppDoc);
}

export async function getApplied(userId, adId) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const appDocs = await AppModel.find({ userId: userId });

  for (let i = 0; i < appDocs.length; i++) {
    if (appDocs[i].ad._id == adId) {
      return true;
    }
  }
  return false;
}

export async function GET(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const url = new URL(req.url);
  const filter: FilterQuery<Application> = {};
  const sort = url.searchParams.get("sort") || null;
  const userId = url.searchParams.get("userId");

  if (sort == "latest") {
    const appDocs = await AppModel.find({ userId: userId }).sort("-createdAt");
    return Response.json(appDocs);
  }

  const appDocs = await AppModel.find({ userId: userId }).sort("createdAt");

  return Response.json(appDocs);
}
