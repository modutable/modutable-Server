// const tokenParser = require("./middleware/tokenParser");

import express from "express";
import cors from "cors";
import router from "./router/index";
import tokenParser from "./middleware/tokenparser";
import { ORMConnect } from "./database";

const app = express();
ORMConnect();
app.use(cors());
app.use(express.json());

app.use(tokenParser);
app.use(router);

app.listen(3000, () => {
  console.log("server start");
});
