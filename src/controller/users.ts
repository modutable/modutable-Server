import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, createQueryBuilder } from "typeorm";
import { Users } from "../entity/Users";
import { publishToken } from "../middleware/tokenparser";
import bcrypt from "bcrypt";
require("dotenv").config();
export = {
  SignUp: async (req: Request, res: Response) => {
    const user = await createUserClass(req);
    user.createdAt = new Date();
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
  },
  updateUserInfo: async (req: Request, res: Response) => {
    const { profileImg } = req.body;
    const user = await createUserClass(req);
    /* user에서 원래 업데이트 하지 않기로 한 property는 잘 걸러야 함. */
    user.profileImg = profileImg;

    await createQueryBuilder()
      .update(Users)
      .set(user)
      .where("id = :id", { id: req.user.id })
      .execute();
    res.json("good~!update userInfo");
  },
  mypage: async (req: Request, res: Response) => {
    const { user } = req;
    const result = await getRepository(Users)
      .createQueryBuilder("Users")
      .leftJoinAndSelect("Users.events_users", "Events_Users")
      .leftJoinAndSelect("Events_Users.event", "Events")
      .leftJoinAndSelect("Events.preparefoods", "Preparefoods")
      .where("Users.id = :id", { id: user.id })
      .andWhere("Preparefoods.userId = :id", { id: user.id })
      .getOne();
    res.json(result);
  },
  myInfo: async (req: Request, res: Response) => {
    const { user } = req;
    res.json(await checkUser(user));
  }
};
function redirect(res: Response, token: any) {
  res.redirect(process.env.CLIENT_URL + "/sotialTokenQuery?token=" + token);
}
async function createUserClass(req: Request) {
  const user = new Users();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.address = req.body.city;
  user.email = req.body.Email;
  user.password = await hasingPassword(req.body.password);
  var birthday = `${req.body.year}-${req.body.month}-${req.body.day}`;
  user.birthday = new Date(birthday);
  user.updatedAt = new Date();
  return user;
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
