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

export const checkToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  try {
    const userInfo = await check(token);
    req.user = userInfo;
    next();
  } catch (error) {
    res.json(error);
  }
};

export const check = (token: string) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject("다시 로그인 시도를 해주세요.");
    } else {
      jwt.verify(token, secret.salt, (err: any, decoded: any) => {
        err === null ? resolve(decoded) : reject(err);
      });
    }
  });
};
