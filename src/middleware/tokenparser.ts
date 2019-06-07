import * as jwt from "jsonwebtoken";
import secret from "../secret";
import { Request, Response, NextFunction, response } from "express";

var options = { expiresIn: "7d" };

export const publishToken = (userInfo: Object) => {
  return new Promise((resolve, reject) => {
    jwt.sign(userInfo, secret.salt, options, (err: any, token: string) => {
      err === null ? resolve(token) : reject(err);
    });
  });
};

export const checkToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  new Promise((resolve, reject) => {
    if (!token) {
      reject("다시 로그인 시도를 해주세요.");
    } else {
      jwt.verify(token, secret.salt, (err: any, decoded: any) => {
        err === null ? resolve(decoded) : reject(err);
      });
    }
  })
    .then((data: any) => {
      req.user = data;
      next();
    })
    .catch(error => {
      res.json(error);
    });
};
