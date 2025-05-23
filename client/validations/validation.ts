import z from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Please provide your name")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
    .refine(
      (val) => (val.match(/\s/g) || []).length <= 2,
      "Name must contain at most two spaces"
    ),

  email: z
    .string()
    .trim()
    .nonempty("Please provide your email address")
    .email("Invalid email format")
    .transform((val) => val.toLowerCase()), // normalize email

  password: z
    .string()
    .trim()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be atmost 50 characters long")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
  // Uncomment if special characters are needed
  // .refine((val) => /[@$!%*?&#^()_\-+=]/.test(val), {
  //   message: "Password must contain at least one special character",
  // }),
});

export type RegisterValues = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Please provide your email address")
    .email("Invalid email format")
    .transform((val) => val.toLowerCase()), // normalize email

  password: z
    .string()
    .trim()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be atmost 50 characters long"),
});

export type LoginValues = z.infer<typeof LoginSchema>;
