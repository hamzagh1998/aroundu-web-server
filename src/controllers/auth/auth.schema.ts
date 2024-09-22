import { z } from "zod";

export const RegisterUserSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().min(5, "Invalid email address").optional(),
  photoURL: z.string().url("Invalid URL").optional(),
  location: z
    .object({
      address: z.string().min(6, "Address is required"),
      latitude: z
        .number()
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90"),
      longitude: z
        .number()
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180"),
    })
    .optional(),
});

export type RegisterUserPayload = z.infer<typeof RegisterUserSchema>;
