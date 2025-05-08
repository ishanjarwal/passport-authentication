import { body } from "express-validator";

export const validateUser = [
  // Name
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Please provide your name")
    .bail()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces")
    .bail()
    .custom((value) => {
      const spaceCount = (value.match(/\s/g) || []).length;
      if (spaceCount > 2) {
        throw new Error("Name must contain at most two spaces");
      }
      return true;
    }),

  // Email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please provide your email address")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .normalizeEmail(),

  // Password
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .bail()
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .bail(),
  // .matches(/[@$!%*?&#^()_\-+=]/)
  // .withMessage("Password must contain at least one special character"),
];
