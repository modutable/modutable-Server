const express = require("express");
const cors = require("cors");
const router = require("./router");
const app = express();
const tokenParser = require("./middleware/tokenParser");
app.use(cors());
app.use(express.json());
app.use(tokenParser);
app.use(router);

app.listen(3001, () => {
  console.log("server start");
});
