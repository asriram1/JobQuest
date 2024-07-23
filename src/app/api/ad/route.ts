import { Ad, AdModel } from "@/app/_models/Ad";
import mongoose, { FilterQuery } from "mongoose";
import moment from "moment";

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
      const filter: FilterQuery<Ad> = {};
      const company = url.searchParams.get("company") || null;
      const salaryStart = url.searchParams.get("salaryStart") || null;
      const salaryEnd = url.searchParams.get("salaryEnd") || null;
      const title = url.searchParams.get("title") || null;
      const remote = url.searchParams.get("remote") || null;
      const hours = url.searchParams.get("hours") || null;
      const country = url.searchParams.get("country") || null;
      const state = url.searchParams.get("state") || null;
      const postedDate = url.searchParams.get("postedDate") || null;

      if (company && company != "Company...") {
        filter.company = company;
      }

      if (title) {
        filter.title = { $regex: ".*" + title + ".*", $options: "i" };
      }

      if (salaryStart && salaryEnd && Number(salaryStart) < Number(salaryEnd)) {
        filter.salary = { $lte: salaryEnd, $gte: salaryStart };
      }

      if (salaryStart && salaryEnd && salaryStart == salaryEnd) {
        filter.salary = salaryStart;
      }

      if (remote && remote != "All") {
        filter.remote = remote;
      }

      if (hours && hours != "All") {
        filter.hours = hours;
      }

      if (country && country != "All" && country != "Country...") {
        filter.country = country;
      }

      if (state && state != "All" && state != "State...") {
        filter.state = state;
      }

      if (postedDate) {
        if (postedDate == "1") {
          filter.createdAt = {
            $gt: moment()
              .subtract(60 * 24, "minutes")
              .utc()
              .format(),
          };
        }
        if (postedDate == "7") {
          filter.createdAt = {
            $gt: moment()
              .subtract(60 * 24 * 7, "minutes")
              .utc()
              .format(),
          };
        }
        if (postedDate == "14") {
          filter.createdAt = {
            $gt: moment()
              .subtract(60 * 24 * 14, "minutes")
              .utc()
              .format(),
          };
        }
        if (postedDate == "15") {
          filter.createdAt = {
            $lt: moment()
              .subtract(60 * 24 * 14, "minutes")
              .utc()
              .format(),
          };
        }
      }
      // filter.createdAt = {
      //   $gt: moment().subtract(60, "minutes").utc().format(),
      // };

      // const category = url.searchParams.get("category") || null;
      // const min_price = url.searchParams.get("min") || null;
      // const max_price = url.searchParams.get("max") || null;
      // const email = url.searchParams.get("email") || null;
      console.log(filter);
      const numPages = await AdModel.countDocuments(filter);
      console.log(numPages);
      if (numPages == 0) {
        return Response.json("No documents found");
      }

      const adDoc = await AdModel.find(filter).limit(5).sort("-createdAt");

      const lastDoc: any = adDoc[adDoc.length - 1];
      const lastCreatedAt = lastDoc.createdAt;
      return Response.json({
        adDoc: adDoc,
        lastCreatedAt: lastCreatedAt,
        numPages: numPages,
      });
    } else {
      const lastCreatedAtPrev = url.searchParams.get("lastCreatedAt");
      const filter: FilterQuery<Ad> = {};

      // filter.createdAt = { $lt: lastCreatedAtPrev };
      const company = url.searchParams.get("company") || null;
      const salaryStart = url.searchParams.get("salaryStart") || null;
      const salaryEnd = url.searchParams.get("salaryEnd") || null;
      const title = url.searchParams.get("title") || null;
      const remote = url.searchParams.get("remote") || null;
      const hours = url.searchParams.get("hours") || null;
      const country = url.searchParams.get("country") || null;
      const state = url.searchParams.get("state") || null;
      const postedDate = url.searchParams.get("postedDate") || null;

      if (company && company != "Company...") {
        filter.company = company;
      }
      if (title) {
        filter.title = { $regex: ".*" + title + ".*", $options: "i" };
      }
      // console.log(salaryStart, salaryEnd);
      if (salaryStart && salaryEnd && salaryStart < salaryEnd) {
        filter.salary = { $lte: salaryEnd, $gte: salaryStart };
      }

      if (salaryStart && salaryEnd && salaryStart == salaryEnd) {
        filter.salary = salaryStart;
      }

      if (remote && remote != "All") {
        filter.remote = remote;
      }

      if (hours && hours != "All") {
        filter.hours = hours;
      }

      if (country && country != "All" && country != "Country...") {
        filter.country = country;
      }

      if (state && state != "All" && state != "State...") {
        filter.state = state;
      }

      if (postedDate) {
        if (postedDate == "1") {
          filter.createdAt = {
            $gt: moment()
              .subtract(60 * 24, "minutes")
              .utc()
              .format(),
          };
        }
        if (postedDate == "7") {
          filter.createdAt = {
            $gt: moment()
              .subtract(60 * 24 * 7, "minutes")
              .utc()
              .format(),
          };
        }
        if (postedDate == "14") {
          filter.createdAt = {
            $gt: moment()
              .subtract(60 * 24 * 14, "minutes")
              .utc()
              .format(),
          };
        }
        if (postedDate == "30") {
          filter.createdAt = {
            $lt: moment()
              .subtract(60 * 24 * 30, "minutes")
              .utc()
              .format(),
          };
        }
      }
      const newDoc = AdModel.aggregate([
        {
          $addFields: {
            daysCount: {
              $round: {
                $divide: [{ $subtract: [new Date(), "$createdAt"] }, 86400000],
              },
            },
          },
        },
      ]);
      console.log(newDoc);
      const adDoc2 = await AdModel.find()
        .limit(5 * (Number(page) - 1))
        .sort("-createdAt");
      const lastDoc2: any = adDoc2[adDoc2.length - 1];
      const lastCreatedAt2 = lastDoc2.createdAt;

      filter.createdAt = { $lt: lastCreatedAt2 };
      const numPages = await AdModel.countDocuments(filter);

      // {
      //   createdAt: { $lt: lastCreatedAt2 },
      // }
      const adDoc = await AdModel.find(filter).limit(5).sort("-createdAt");

      const lastDoc: any = adDoc[adDoc.length - 1];
      const lastCreatedAt = lastDoc.createdAt;
      return Response.json({
        adDoc: adDoc,
        lastCreatedAt: lastCreatedAt,
        numPages: numPages,
      });
    }
  }
}
