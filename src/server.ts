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
app.use(cors());
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

app.use(authRouter);
app.use(router);
app.listen(3000, () => {
  console.log("server start");
});
