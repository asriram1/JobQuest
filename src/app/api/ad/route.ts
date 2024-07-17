import { Ad, AdModel } from "@/app/_models/Ad";
import mongoose, { FilterQuery } from "mongoose";

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
  } else {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");
    if (page == "1") {
      // const filter: FilterQuery<Ad> = {};
      // const company = url.searchParams.get("company") || null;

      // if (company) {
      //   filter.company = company;
      // }
      // const category = url.searchParams.get("category") || null;
      // const min_price = url.searchParams.get("min") || null;
      // const max_price = url.searchParams.get("max") || null;
      // const email = url.searchParams.get("email") || null;

      const adDoc = await AdModel.find().limit(5).sort("-createdAt");
      const lastDoc: any = adDoc[adDoc.length - 1];
      const lastCreatedAt = lastDoc.createdAt;
      return Response.json({ adDoc: adDoc, lastCreatedAt: lastCreatedAt });
    } else {
      const lastCreatedAtPrev = url.searchParams.get("lastCreatedAt");
      // const filter: FilterQuery<Ad> = {};

      // filter.createdAt = { $lt: lastCreatedAtPrev };
      // const company = url.searchParams.get("company") || null;

      // if (company) {
      //   filter.company = company;
      // }

      const adDoc2 = await AdModel.find()
        .limit(5 * (Number(page) - 1))
        .sort("-createdAt");
      const lastDoc2: any = adDoc2[adDoc2.length - 1];
      const lastCreatedAt2 = lastDoc2.createdAt;

      const adDoc = await AdModel.find({
        createdAt: { $lt: lastCreatedAt2 },
      })
        .limit(5)
        .sort("-createdAt");
      const lastDoc: any = adDoc[adDoc.length - 1];
      const lastCreatedAt = lastDoc.createdAt;
      return Response.json({ adDoc: adDoc, lastCreatedAt: lastCreatedAt });
    }
  }
}
