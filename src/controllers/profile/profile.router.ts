import { Router } from "express";

import { UpdateUserProfileSchema } from "./profile.schema";

const profileRouter = Router();

profileRouter.patch("/update-profile", (req, res) => {
  const result = UpdateUserProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request data",
      details: result.error.errors,
    });
  }

  const payload = result.data;
  console.log(payload);

  res.json({
    message: "Profile route",
  });
});
