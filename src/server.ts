// const tokenParser = require("./middleware/tokenParser");

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./router/index";
import tokenParser from "./middleware/tokenparser";

const app = express();
app.use(cors());
app.use(express.json());

app.use(tokenParser);
app.use(router);

app.listen(3001, () => {
  console.log("server start");
});
