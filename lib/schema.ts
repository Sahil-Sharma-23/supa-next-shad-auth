import { z } from "zod";

export const SignupFormSchema = z.object({
  firstName: z.string().min(2, { message: "Must be 2 or more characters..." }),
  lastName: z.string().min(2, { message: "Must be 2 or more characters..." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be 6 or more characters..." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Must be 6 or more characters..." }),
});

export type SignupFormType = z.infer<typeof SignupFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Incorrect password. TRY AGAIN!" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
