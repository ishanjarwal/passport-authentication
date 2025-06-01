"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async (DB_URL) => {
    try {
        const dbOptions = {
            dbName: "passport-authentication",
        };
        await mongoose_1.default.connect(DB_URL, dbOptions);
        console.log("Connected to DB");
    }
    catch (error) {
        console.error("Something went wrong while connecting to db : ", error);
    }
};
exports.default = connectDB;
