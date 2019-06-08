// const tokenParser = require("./middleware/tokenParser");

import express from "express";
import cors from "cors";
import router from "./router/index";
import { ORMConnect } from "./database";
import session from "express-session";
import middlewarePassport from "./middleware/passport";
import auth from "./router/auth";
import secret from "./secret";
require("dotenv").config();

const app = express();
ORMConnect();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend base url
    credentials: true
  })
);
app.use(express.json());

app.use(
  session({
    secret: secret.salt,
    resave: false,
    saveUninitialized: true
  })
);

var passport = middlewarePassport(app);
const authRouter = auth(passport);

app.use("/auth", authRouter);
app.use(router);
app.listen(process.env.PORT, () => {
  console.log("server start Port :" + process.env.PORT);
});
