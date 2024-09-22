import { UpdateUserPayload } from "./profile.schema";

import { CommonService } from "../common.service";

import { tryToCatch } from "../../utils/try-to-catch";

import { userRepository } from "../../db/user-repo";

export class ProfileService extends CommonService {
  async updateProfile(payload: UpdateUserPayload) {
    console.log(payload.currentEmail);

    const user = await this.isUserExists(payload.currentEmail!);
    if (!user) {
      return {
        status: 400,
        detail: "User not found",
      };
    }

    //* check if user want to update email
    if (payload.email !== payload.currentEmail) {
      const isEmailExists = await this.isUserExists(payload.email!);
      if (isEmailExists) {
        return {
          status: 409,
          detail: "User with this email already exists",
        };
      }
    }

    const [error, _] = await tryToCatch(
      (email) =>
        userRepository.findOneAndUpdate({ email }, { ...user, ...payload }),
      payload.currentEmail
    );
    if (error) {
      return {
        status: 500,
        detail: "Internal server error",
      };
    }

    const { currentEmail, ...rest } = payload;

    return { status: 200, detail: { ...rest } };
  }
}
