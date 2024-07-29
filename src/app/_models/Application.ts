import mongoose, { models, model, Schema, Model } from "mongoose";
import { Ad } from "./Ad";

export type Application = {
  _id: string;
  ad: Ad;
  userId: string;
  document: string;
  createdAt: string;
};

const appSchema = new Schema<Application>(
  {
    ad: Object,
    userId: String,
    document: String,
  },
  { timestamps: true }
);

export const AppModel =
  (models?.Application as Model<Application>) ||
  model<Application>("Application", appSchema);
