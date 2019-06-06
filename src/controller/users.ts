import { Request, Response, response } from "express";
import "reflect-metadata";
import { getRepository, Like } from "typeorm";
import { Users } from "../entity/Users";
import { publishToken } from "../middleware/tokenparser";
import bcrypt from "bcrypt";
import sercret from "../secret";

export = {
  SignUp: async (req: Request, res: Response) => {
    const user = new Users();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.address = req.body.city;
    user.email = req.body.Email;
    user.password = await hasingPassword(req.body.password);
    var birthday = `${req.body.year}-${req.body.month}-${req.body.day}`;
    user.birthday = new Date(birthday);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.profileImg = "/init.png";
    var result = await checkUser(user);
    if (result !== undefined) {
      res.json({ message: "already" });
    } else {
      try {
        await insertUser(user);
        const token = await publishToken(JSON.parse(JSON.stringify(user)));
        res.json(token);
      } catch (error) {
        res.status(501).json("fail Sign Up error message :" + error);
      }
    }
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
    var result = await checkUser(req.user);
    if (result === undefined) {
      const user = new Users();
      user.firstName = req.user.firstName;
      user.lastName = req.user.lastName;
      user.email = req.user.Email;
      user.profileImg = req.user.profile;
      await insertUser(user);
      result = user;
    }
    try {
      const token = await publishToken(JSON.parse(JSON.stringify(result)));
      redirect(res, token);
    } catch (error) {
      res.status(501).json("fail making token");
    }
  },
  FailLogin: async (req: Request, res: Response) => {
    res.json("fail Login");
  }
};
function redirect(res: Response, token: any) {
  res.redirect(sercret.clientRequestURL + "/sotialTokenQuery?token=" + token);
}
async function hasingPassword(password: string): Promise<string> {
  const hashValue = await bcrypt.hash(password, 10);
  return hashValue;
}
async function checkUser(user: any) {
  return await getRepository(Users)
    .createQueryBuilder("Users")
    .where("Users.email like :email", { email: `%${user.email}%` })
    .getOne();
}
async function insertUser(user: Users) {
  await getRepository(Users)
    .createQueryBuilder("users")
    .insert()
    .values(user)
    .execute();
}
