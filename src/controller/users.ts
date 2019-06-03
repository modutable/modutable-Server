import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, Like } from "typeorm";
import { Users } from "../entity/Users";
import bcrypt from "bcrypt";

export = {
  SignUp: async (req: Request, res: Response) => {
    console.log(req.body);
    var birthday = `${req.body.year}-${req.body.month}-${req.body.day}`;
    const user = new Users();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.address = req.body.city;
    user.email = req.body.Email;
    user.password = req.body.password;
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
    res.json("seccess Sign Up");
  }
};

function hasingPassword(password: string): String {
  return "test";
}
