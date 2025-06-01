"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbconnect_1 = __importDefault(require("./config/dbconnect"));
const env_1 = require("./env");
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const passport_1 = __importDefault(require("passport"));
require("./config/passport-strategy");
require("./config/passport-google-strategy");
const setAuthCookies_1 = __importDefault(require("./utils/setAuthCookies"));
const port = env_1.env.PORT;
const app = (0, express_1.default)();
// enable cors
const corsWhitelist = [env_1.env.FRONTEND_HOST];
const corsOptions = {
    origin(requestOrigin, callback) {
        if (!requestOrigin || corsWhitelist.includes(requestOrigin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Blocked by CORS Policy"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// enable cookie parser and express.json support (replacement for body-parser)
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "10mb", type: "application/json" }));
// connect to database
(0, dbconnect_1.default)(env_1.env.DB_URL);
// initialize passport
app.use(passport_1.default.initialize());
// user routes
app.use("/api/v1/user", userRouter_1.default);
// google auth
app.get("/api/v1/auth/google", passport_1.default.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
}));
app.get("/api/v1/auth/google/callback", passport_1.default.authenticate("google", {
    session: false,
    failureRedirect: "/login",
}), (req, res) => {
    const { user, accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry, } = req.user;
    (0, setAuthCookies_1.default)(res, {
        accessToken,
        accessTokenExpiry,
        refreshToken,
        refreshTokenExpiry,
    });
    res.redirect(`${env_1.env.FRONTEND_HOST}/account/profile`);
});
app.listen(port, () => {
    console.log(`backend running on port : ${port}`);
});
