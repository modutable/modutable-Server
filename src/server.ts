// const tokenParser = require("./middleware/tokenParser");

import express from "express";
import cors from "cors";
import router from "./router/index";
import { ORMConnect } from "./database";
import session from "express-session";
import middlewarePassport from "./middleware/passport";
import auth from "./router/auth";
import secret from "./secret";
import http from "http";

require("dotenv").config();
const socketServer = http.createServer(); // if express used,, there is a way to do it using express
require("./socketServer")(socketServer);

const app = express();
ORMConnect();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend base url // why we need to use env variable here?
    credentials: true
  })
);
app.use(express.json());

app.use( // are we using JWT? if so, this session is unnecessary?
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
app.listen(process.env.PORT, () => { // if env var not provided....no back up no back up
  console.log("server start Port :" + process.env.PORT);
});

socketServer.listen(process.env.SOCKET_PORT, () => {
  console.log("socket Server Start prot : " + process.env.SOCKET_PORT);
});
