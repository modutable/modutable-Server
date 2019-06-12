import "reflect-metadata";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Messages } from "../entity/Messages";
import { Users } from "../entity/Users";
import { check } from "../middleware/tokenparser";
import { MetadataArgsStorage } from "typeorm/metadata-args/MetadataArgsStorage";
export = {
  save: async (data: any) => {
    const fromUser = await check(data.from);
    const toUser = await getUserIdByEmail(data.to);

    const newMessage = new Messages();
    newMessage.sendUserId = JSON.parse(JSON.stringify(fromUser)).id;
    newMessage.getUserId = JSON.parse(JSON.stringify(toUser)).id;
    newMessage.message = data.message;
    newMessage.createdAt = new Date();
    newMessage.updatedAt = new Date();
    const result = await getRepository(Messages)
      .createQueryBuilder()
      .insert()
      .values(newMessage)
      .execute();
  },
  talkingUserList: async (req: Request, res: Response) => {
    const userInfo = req.user;
    const talkingUsers = await getRepository(Messages)
      .createQueryBuilder("Messages")
      .leftJoinAndSelect("Messages.getUser", "users")
      .where("Messages.sendUserId = :id", { id: userInfo.id })
      .getMany();

    res.json(talkingUserObj(talkingUsers));
  },
  getMessages: async (req: Request, res: Response) => {
    const userInfo = req.user;
    const toUserId = req.params.id;
    console.log(Number(userInfo.id), Number(toUserId));
    const result = await getRepository(Messages)
      .createQueryBuilder("Messages")
      .where("Messages.sendUserId = :sendId", { sendId: Number(userInfo.id) })
      .andWhere("Messages.getUserId = :getId", { getId: Number(toUserId) })
      .getMany();
    console.log(result);
    res.json(result);
  }
};

async function getUserIdByEmail(email: string) {
  return await getRepository(Users)
    .createQueryBuilder()
    .where("email = :email", { email: email })
    .getOne();
}

function talkingUserObj(datas: any): Array<any> {
  var messageArray = [];
  var temp: Number[] = [];
  for (var i = datas.length - 1; i >= 0; i--) {
    if (temp.includes(datas[i].getUserId)) continue;
    var message: any = {};
    message.getUserId = datas[i].getUserId;
    message.user = datas[i].getUser.firstName + " " + datas[i].getUser.lastName;
    message.url = datas[i].getUser.profileImg;
    message.message = datas[i].message;
    messageArray.push(message);
    temp.push(datas[i].getUserId);
  }
  return messageArray;
}
