// const tokenParser = require("./middleware/tokenParser");

import express from "express";
import cors from "cors";
import router from "./router/index";
import { ORMConnect } from "./database";
import session from "express-session";
import middlewarePassport from "./middleware/passport";
import auth from "./router/auth";

const app = express();
ORMConnect();
app.use(
  cors({
    origin: "http://localhost:3000", // frontend base url
    credentials: true
  })
);
app.use(express.json());

app.use(
  session({
    secret: "asdfqwer",
    resave: false,
    saveUninitialized: true
  })
);

var passport = middlewarePassport(app);
const authRouter = auth(passport);

app.use("/auth", authRouter);
app.use(router);
app.listen(3001, () => {
  console.log("server start");
});
