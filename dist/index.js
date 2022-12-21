"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = require("dotenv");
const schoolRouter_1 = __importDefault(require("./router/schoolRouter"));
const teacherRouter_1 = __importDefault(require("./router/teacherRouter"));
const classRouter_1 = __importDefault(require("./router/classRouter"));
const testRouter_1 = __importDefault(require("./router/testRouter"));
(0, dotenv_1.config)();
const proc = (0, dotenv_1.config)().parsed;
const port = proc.LOCALPORT;
db_1.default;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: false,
    name: "sessionID",
    secret: "This is Safe",
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 1,
    },
}));
app.use("/api/school", schoolRouter_1.default);
app.use("/api/teacher", teacherRouter_1.default);
app.use("/api/class", classRouter_1.default);
app.use("/api/test", testRouter_1.default);
const protect = (req, res, next) => {
    if (!req.session.sessionID) {
        app.use("/out", (req, res) => {
            return res.status(200).json({
                message: "Get Out!",
            });
        });
    }
    else {
        return next();
    }
};
const protectedData = (req, res, next) => {
    if (!req.session.sessionID) {
        return res.status(200).json({
            message: "Get Out!",
        });
    }
    else {
        return next();
    }
};
// app.use("/", (req: Request, res: Response): Response => {
//   console.log(req.session);
//   return res.status(200).json({
//     message: "This is the Home Page!",
//   });
// });
// import { google } from "googleapis";
// import googleOAuth from "passport-google-oauth20";
// import passport from "passport";
// import schoolModel from "./model/schoolModel";
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
// const GoogleStrategy = googleOAuth.Strategy;
// const GOOGLE_SECRET = "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";
// const GOOGLE_ID =
//   "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
// const GOOGLE_REFRESHTOKEN =
//   "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";
// const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
// const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
// oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });
// const url: string = "http:localhost:2244";
// const accessToken = oAuth.getAccessToken();
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_ID,
//       clientSecret: GOOGLE_SECRET,
//       callbackURL: "http://localhost:2244/auth/google/callback",
//       // callbackURL: GOOGLE_REDIRECT,
//     },
//     // function ({ accessToken, refreshToken: GOOGLE_REFRESHTOKEN, profile, cb }) {
//     //   schoolModel.create({ googleId: profile.id }, function (err, user) {
//     //     return cb(err, user);
//     //   });
//     // }
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);
//       schoolModel.create(
//         {
//           // _id: user,
//           name: profile.displayName,
//           email: profile.emails[0].email,
//           logo: profile.photos[0].value,
//         },
//         function (err, user) {
//           console.log(user);
//           return cb(err, user);
//         }
//       );
//     }
//   )
// );
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/auth/google" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.status(200).json({ message: "Welcome back home" });
//     // res.redirect("/");
//   }
// );
app.listen(port, () => {
    console.log("server is ready");
});