const jwt = require("jsonwebtoken");
const secret = require("../../secret/secret");
import { Request, Response, NextFunction } from "express";

const tokenParser = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.token) {
    req.headers.token = jwt.verify(req.headers.token, secret.salt);
  }
  next();
};

export = tokenParser;
