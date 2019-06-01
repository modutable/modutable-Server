import * as jwt from "jsonwebtoken";
import secret from "../secret";
import { Request, Response, NextFunction } from "express";

var options = { expiresIn: "7d", issuer: "inyongTest", subject: "userInfo" };

export const publishToken = (userInfo: Object) => {
  return new Promise((resolve, reject) => {
    jwt.sign(userInfo, secret.salt, options, (err: any, token: string) => {
      err === null ? resolve(token) : reject(err);
    });
  });
};

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    const token = req.headers["x-access-token"] || req.body.token;
    if (!token) {
      resolve({ loginCheck: false, message: "not token" });
    }
    jwt.verify(token, secret.salt, (err: any, decoded: any) => {
      err === null
        ? resolve({ loginCheck: true, message: "success" })
        : reject(err);
    });
  });
};
