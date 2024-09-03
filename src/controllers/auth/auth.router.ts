import { Router } from "express";

import { AuthService } from "./auth.service";

import { RegisterUserSchema } from "./auth.schema";

export const authRouter = Router();

const authService = new AuthService();

authRouter.post("/signup", async (req, res) => {
  const result = RegisterUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request data",
      details: result.error.errors,
    });
  }

  const payload = result.data;
  const authResult = await authService.register(payload);

  res.status(authResult.status).json({ detail: authResult.detail });
});

authRouter.post("/user-data", (req, res) => {});
