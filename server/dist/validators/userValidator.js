"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validatePasswordReset = exports.validatePasswordChange = exports.validateLogin = exports.validateEmail = exports.validateEmailVerification = exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
exports.validateUser = [
    // Name
    (0, express_validator_1.body)("name")
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
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide your email address")
        .bail()
        .isEmail()
        .withMessage("Invalid email address")
        .bail()
        .normalizeEmail(),
    // Password
    (0, express_validator_1.body)("password")
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
exports.validateEmailVerification = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide your email address")
        .bail()
        .isEmail()
        .withMessage("Invalid email address")
        .bail()
        .normalizeEmail(),
    (0, express_validator_1.body)("otp")
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
exports.validateEmail = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide your email address")
        .bail()
        .isEmail()
        .withMessage("Invalid email address")
        .bail()
        .normalizeEmail(),
];
exports.validateLogin = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide your email address")
        .bail()
        .isEmail()
        .withMessage("Invalid email address")
        .bail()
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
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
exports.validatePasswordChange = [
    (0, express_validator_1.body)("old_password")
        .trim()
        .notEmpty()
        .withMessage("Please enter your old password")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .bail()
        .isLength({ max: 50 })
        .withMessage("Password must be atmost 50 characters long")
        .bail(),
    (0, express_validator_1.body)("password")
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
    (0, express_validator_1.body)("password_confirmation")
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
exports.validatePasswordReset = [
    (0, express_validator_1.body)("password")
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
    (0, express_validator_1.body)("password_confirmation")
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
exports.validateUpdateUser = [
    (0, express_validator_1.body)("name")
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
    (0, express_validator_1.body)("bio")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Bio cannot be more than 500 characters"),
];
