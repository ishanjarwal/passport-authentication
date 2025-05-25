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
    .isLength({ max: 50 })
    .withMessage("Password must be atmost 50 characters long")
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

export const validateEmailVerification = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please provide your email address")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .normalizeEmail(),

  body("otp")
    .trim()
    .notEmpty()
    .withMessage("Please enter OTP")
    .bail()
    .isLength({ min: 4, max: 4 })
    .withMessage("OTP must be exactly 4 digits")
    .bail()
    .isNumeric()
    .withMessage("OTP must contain only numbers"),
];

export const validateEmail = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please provide your email address")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .normalizeEmail(),
];

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please provide your email address")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter your password")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Password must be atmost 50 characters long")
    .bail(),
];

export const validatePasswordChange = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter your password")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Password must be atmost 50 characters long")
    .bail(),

  body("password_confirmation")
    .trim()
    .notEmpty()
    .withMessage("Please confirm the password")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
];

export const validateUpdateUser = [
  body("name")
    .optional()
    .trim()
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
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot be more than 500 characters"),
];
