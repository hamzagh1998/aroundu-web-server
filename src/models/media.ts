import e from "express";
import { Schema, model, Document } from "mongoose";

type Media = {
  owner: Schema.Types.ObjectId;
  url: string;
  type: string;
  mimeType: string;
  sizeInMb: number;
  createdAt: Date;
};

type MediaDocument = Media & Document;

const MediaSchema = new Schema<MediaDocument>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  sizeInMb: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const MediaModel = model<MediaDocument>("Media", MediaSchema);

export { MediaModel, MediaDocument };
