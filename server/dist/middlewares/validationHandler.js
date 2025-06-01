"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidation = void 0;
const express_validator_1 = require("express-validator");
const handleValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: "fail",
            message: "Validation failed",
            errors: errors.array(),
        });
        return;
    }
    next();
};
exports.handleValidation = handleValidation;
