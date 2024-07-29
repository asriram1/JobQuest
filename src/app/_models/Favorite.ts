import mongoose, { models, model, Schema, Model } from "mongoose";
import { Ad } from "./Ad";

export type Favorite = {
  _id: string;
  ad: Ad;
  userId: string;
};

const favSchema = new Schema<Favorite>(
  {
    ad: Object,
    userId: String,
  },
  { timestamps: true }
);
favSchema.index({ ad: 1, userId: 1 }, { unique: true });

export const FavModel =
  (models?.Favorite as Model<Favorite>) ||
  model<Favorite>("Favorite", favSchema);
