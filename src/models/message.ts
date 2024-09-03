import { Schema, model, Document } from "mongoose";

type Message = {
  text: string;
  sender: Schema.Types.ObjectId;
  receiver?: Schema.Types.ObjectId;
  group?: Schema.Types.ObjectId;
  isViwedByReceiver?: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};

type MessageDocument = Message & Document;

const MessageSchema = new Schema<MessageDocument>({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  group: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Group",
  },
  isViwedByReceiver: {
    type: Boolean,
    required: false,
    default: false,
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

const MessageModel = model<MessageDocument>("Message", MessageSchema);

export { MessageModel, MessageDocument };
