import { Schema, model, Document } from "mongoose";

type Notification = {
  type: "group" | "event";
  user: Schema.Types.ObjectId;
  isViewed: boolean;
  createdAt: Date;
  viewedAt: Date | null;
};

type NotificationDocument = Notification & Document;

const NotificationSchema = new Schema<NotificationDocument>({
  type: {
    type: String,
    required: true,
    enum: ["group", "event"],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  isViewed: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  viewedAt: {
    type: Date,
    required: false,
  },
});

const NotificationModel = model<NotificationDocument>(
  "Notification",
  NotificationSchema
);

export { NotificationModel, NotificationDocument };
