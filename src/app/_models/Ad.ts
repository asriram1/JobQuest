import mongoose, { models, model, Schema, Model } from "mongoose";

export type Ad = {
  _id: string;
  title: string;
  company: string;
  otherCompany: string;
  remote: string;
  hours: string;
  salary: number;
  country: string;
  state: string;
  city: string;
  companyIcon: string;
  recruiterImage: string;
  recruiterName: string;
  recruiterPhone: string;
  recruiterEmail: string;
  description: any;
  userId: string;
};

const adSchema = new Schema<Ad>(
  {
    title: String,
    company: String,
    otherCompany: String,
    remote: String,
    hours: String,
    salary: Number,
    country: String,
    state: String,
    city: String,
    companyIcon: String,
    recruiterImage: String,
    recruiterName: String,
    recruiterPhone: String,
    recruiterEmail: String,
    description: Schema.Types.Mixed,
    userId: String,
  },
  { timestamps: true }
);

export const AdModel = (models?.Ad as Model<Ad>) || model<Ad>("Ad", adSchema);
