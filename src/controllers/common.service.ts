import { userRepository } from "../db/user-repo";
import { tryToCatch } from "../utils/try-to-catch";

export abstract class CommonService {
  async isUserExists(email: string) {
    const [error, user] = await tryToCatch(
      (email) => userRepository.findOne({ email }),
      email
    );
    if (error) {
      return false;
    }

    return user;
  }
}
