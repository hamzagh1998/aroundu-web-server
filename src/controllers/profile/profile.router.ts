import { Router } from "express";

import { UpdateUserProfileSchema } from "./profile.schema";

import { ProfileService } from "./profile.service";

export const profileRouter = Router();

const profileService = new ProfileService();

profileRouter.patch("/update-profile", async (req, res) => {
  const result = UpdateUserProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request data",
      details: result.error.errors,
    });
  }

  const payload = result.data;
  const profileResult = await profileService.updateProfile({
    ...payload,
    currentEmail: req.body.user.email
      ? req.body.user.email
      : req.body.user.user_id,
  });

  res.status(profileResult.status).json(profileResult.detail);
});
