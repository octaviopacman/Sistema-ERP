import {z} from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(20, {
      message: "Username must not exceed 20 characters",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      required_error: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(50, {
      message: "Password must not exceed 50 characters",
    }),
});
export const loginSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});
