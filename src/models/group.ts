import { Schema, model, Document } from "mongoose";

type Group = {
  name: string;
  description: string;
  coverImageURL: string;
  owner: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  events: Schema.Types.ObjectId[] | null;
  lastMessage: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

type GroupDocument = Group & Document;

const GroupSchema = new Schema<GroupDocument>({
  name: {
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
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  members: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },
  events: {
    type: [Schema.Types.ObjectId],
    required: false,
    default: null,
    ref: "Event",
  },
  lastMessage: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

export const GroupModel = model<GroupDocument>("Group", GroupSchema);

export { Group, GroupDocument };
