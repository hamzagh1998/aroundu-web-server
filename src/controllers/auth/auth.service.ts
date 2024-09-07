import { RegisterUserPayload } from "./auth.schema";

import { userRepository } from "../../db/user-repo";
import { mediaRepository } from "../../db/media-repo";
import { groupRepository } from "../../db/group-repo";

import { tryToCatch } from "../../utils/try-to-catch";

export class AuthService {
  async register(payload: RegisterUserPayload) {
    const { firstName, lastName, email, photoURL } = payload;
    const avatar = photoURL
      ? photoURL
      : `https://api.dicebear.com/6.x/initials/svg?radius=50&seed=${firstName} ${lastName}`;

    // check if user exists
    const [error, user] = await tryToCatch(
      (email: string) => userRepository.findOne({ email }),
      email
    );
    if (error) {
      console.error("Error while gettig user: ", error);
      return { status: 500, detail: "Internal server error" };
    }

    if (user) {
      return { status: 409, detail: "User with this email already exists" };
    }

    const newUser = await userRepository.create({
      ...payload,
      photoURL: avatar,
    });
    const { _id, ...userWithoutId } = newUser;

    return { status: 201, detail: userWithoutId };
  }

  async getUserData(email: string) {
    const [error, user] = await tryToCatch(
      (email: string) => userRepository.findOne({ email }, { __v: 0 }),
      email
    );
    if (error) {
      console.error("Error while gettig user: ", error);
      return { status: 500, detail: "Internal server error" };
    }
    if (!user) {
      return { status: 404, detail: "User not found" };
    }

    const [mediaError, media] = await tryToCatch(
      (userId: string) => mediaRepository.find({ owner: userId }),
      user?._id
    );
    if (mediaError) {
      console.error("Error while getting user media: ", mediaError);
      return { status: 500, detail: "Internal server error" };
    }

    const [groupError, groups] = await tryToCatch(
      (userId: string) =>
        groupRepository.find({
          $or: [{ owner: userId }, { members: userId }],
        }),
      user?._id
    );
    if (groupError) {
      console.error("Error while getting user groups: ", groupError);
      return { status: 500, detail: "Internal server error" };
    }

    const storageUsageInMb =
      Array.isArray(media) && media.length > 0
        ? media.reduce((prev, curr) => prev + (curr.sizeInMb || 0), 0)
        : 0;

    const id = user._id;
    const { _id, ...userWithoutId } = user;
    const userData = {
      ...userWithoutId,
      id,
      groups: groups || [],
      storageUsageInMb,
    };

    return { status: 200, detail: userData };
  }
}
