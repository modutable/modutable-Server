const jwt = require("jsonwebtoken");
const secret = require("../../secret/secret");

const tokenParser = (req, res, next) => {
  if (req.headers.token) {
    req.headers.token = jwt.verify(req.headers.token, secret.salt);
  }
  next();
};

module.exports = tokenParser;
