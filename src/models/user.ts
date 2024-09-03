import { Schema, model, Document, Model } from "mongoose";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  plan: "free" | "premium";
  photoURL: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  friends: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date | null;
};

type UserDocument = User & Document;

const UserSchema = new Schema<UserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: false,
  },
  plan: {
    type: String,
    required: true,
    default: "free",
    enum: ["free", "premium"],
  },
  friends: {
    type: [Schema.Types.ObjectId],
    required: false,
    ref: "User",
  },
  messages: {
    type: [Schema.Types.ObjectId],
    required: false,
    ref: "Message",
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

const UserModel: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export { UserModel, UserDocument };
