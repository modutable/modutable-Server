import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, Like } from "typeorm";
import { Users } from "../entity/Users";
import { publishToken } from "../middleware/tokenparser";
import bcrypt from "bcrypt";

export = {
  SignUp: async (req: Request, res: Response) => {
    var birthday = `${req.body.year}-${req.body.month}-${req.body.day}`;
    const user = new Users();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.address = req.body.city;
    user.email = req.body.Email;
    user.password = await hasingPassword(req.body.password);
    user.birthday = new Date(birthday);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.profile = "/init.png";
    try {
      await getRepository(Users)
        .createQueryBuilder("users")
        .insert()
        .values(user)
        .execute();
    } catch (error) {
      res.status(501).json("fail Sign Up error message :" + error);
    }
    res.json({ message: "great!" });
  },
  Login: async (req: any, res: Response) => {
    try {
      const token = await publishToken(req.user);
      res.json(token);
    } catch (error) {
      res.status(501).json("fail making token");
    }
  },
  SotialLogin: async (req: any, res: Response) => {
    console.log("-->", req.user);
    try {
      const token = await publishToken(req.user);
      //res.redirect("/auth/sotial?token=" + token);
    } catch (error) {
      res.status(501).json("fail making token");
    }
  },
  FailLogin: async (req: Request, res: Response) => {
    res.json("fail Login");
  }
};

async function hasingPassword(password: string): Promise<string> {
  const hashValue = await bcrypt.hash(password, 10);
  return hashValue;
}
