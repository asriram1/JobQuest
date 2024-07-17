import { AdModel } from "@/app/_models/Ad";
import mongoose from "mongoose";

export async function POST(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const body = await req.json();
  console.log(body);

  const {
    title,
    company,
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
    description,
    userId,
  } = body;

  console.log(body);

  const AdDoc = await AdModel.create({
    title,
    company,
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
    description,
    userId,
  });
  console.log(AdDoc);
  return Response.json(AdDoc);
}

export async function PUT(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const body = await req.json();
  console.log(body);

  const {
    id,
    title,
    company,
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
    description,
    userId,
  } = body;

  console.log(body);

  const AdDoc = await AdModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      company,
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
      description,
      userId,
    }
  );
  console.log(AdDoc);
  return Response.json(AdDoc);
}

export async function GET(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const adDoc = await AdModel.findById(id);
    return Response.json(adDoc);
  }
}
