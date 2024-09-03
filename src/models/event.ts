import { Schema, model, Document } from "mongoose";

type Event = {
  owner: Schema.Types.ObjectId;
  title: string;
  description: string;
  coverImageURL: string;
  startDate: Date;
  endDate: Date;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  restrictions: {
    age: number;
    participantsNumber: number;
  } | null;
  categories: string[] | null;
  likes: Schema.Types.ObjectId[] | null;
  comments: Schema.Types.ObjectId[] | null;
  media: Schema.Types.ObjectId[] | null;
  type: "public" | "private";
  createdAt: Date;
  updatedAt: Date | null;
};

type EventDocument = Event & Document;

const EventSchema = new Schema<EventDocument>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImageURL: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: Object,
    required: false,
  },
  restrictions: {
    type: Object,
    required: false,
  },
  categories: {
    type: [String],
    required: false,
    default: null,
  },
  comments: {
    type: [Schema.Types.ObjectId],
    required: false,
    default: null,
    ref: "Comment",
  },
  media: {
    type: [Schema.Types.ObjectId],
    required: false,
    default: null,
    ref: "Media",
  },
  likes: {
    type: [Schema.Types.ObjectId],
    required: false,
    default: null,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["public", "private"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const EventModel = model<EventDocument>("Event", EventSchema);

export { EventModel, EventDocument };
