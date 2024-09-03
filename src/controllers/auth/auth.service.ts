import { RegisterUserPayload } from "./auth.schema";

export class AuthService {
  async register(payload: RegisterUserPayload) {
    return { status: 200, detail: "User registered successfully" };
  }

  async getUserData() {}
}
