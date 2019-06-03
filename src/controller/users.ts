import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, Like } from "typeorm";
import { Users } from "../entity/Users";
import { publishToken } from "../middleware/tokenparser";
import bcrypt from "bcrypt";
import { getPriority } from "os";

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
    res.json({ test: 1 });
  },
  Login: async (req: any, res: Response) => {
    const { Email, password } = req.body;
    const result = await getRepository(Users)
      .createQueryBuilder("Users")
      .where("Users.email = :email", { email: Email })
      .getOne();
    if (result) {
      const userJSON = JSON.parse(JSON.stringify(result));
      const hashPass = userJSON.password;
      const flag = await bcrypt.compare(password, hashPass);
      if (flag) {
        const token = await publishToken(userJSON);
        res.json(token);
      } else {
        res.json("no password");
      }
    } else {
      res.json("no ID");
    }
    /* var user = { test: 1 };
    console.log("--->", req.user);
    const result = await getRepository(Users)
      .createQueryBuilder("Users")
      .where("Users.email = :email", { email: "jiy8319@gmail.com" })
      .getOne();
    try {
      const token = await publishToken(user);
      res.json(token);
    } catch (error) {
      res.status(501).json("fail making token");
    } */
  },
  FailLogin: async (req: Request, res: Response) => {
    res.json("fail Login");
  }
};

async function hasingPassword(password: string): Promise<string> {
  const hashValue = await bcrypt.hash(password, 10);
  return hashValue;
}
