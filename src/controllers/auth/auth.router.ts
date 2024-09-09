import { Router } from "express";

import { AuthService } from "./auth.service";

import { RegisterUserSchema } from "./auth.schema";

export const authRouter = Router();

const authService = new AuthService();

authRouter
  .post("/signup", async (req, res) => {
    const result = RegisterUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid request data",
        details: result.error.errors,
      });
    }

    const payload = result.data;
    const authResult = await authService.register(payload);

    res.status(authResult.status).json(authResult.detail);
  })
  .get("/user-data", async (req, res) => {
    const userDataResult = await authService.getUserData(
      req.body.user.email ? req.body.user.email : req.body.user.user_id
    );

    res.status(userDataResult.status).json(userDataResult.detail);
  });
