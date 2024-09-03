import { Schema, model, Document } from "mongoose";

type Comment = {
  owner: Schema.Types.ObjectId;
  event: Schema.Types.ObjectId;
  content: string;
  likes: Schema.Types.ObjectId[] | null;
  createdAt: Date;
  updatedAt: Date | null;
};

type CommentDocument = Comment & Document;

const CommentSchema = new Schema<CommentDocument>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  event: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Event",
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    required: false,
    default: null,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: null,
  },
});

const CommentModel = model<CommentDocument>("Comment", CommentSchema);

export { CommentModel, CommentDocument };
