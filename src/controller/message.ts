import "reflect-metadata";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Messages } from "../entity/Messages";
import { Users } from "../entity/Users";
import { check } from "../middleware/tokenparser";
export = {
  save: async (data: any) => {
    const newMessage = new Messages();
    newMessage.sendUserId = data.sendUserId;
    newMessage.getUserId = data.getUserId;
    newMessage.message = data.message;
    newMessage.createdAt = data.createdAt;
    newMessage.updatedAt = data.updatedAt;
    await getRepository(Messages)
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

    res.json({ result: talkingUserObj(talkingUsers), myId: userInfo.id });
  },
  getMessages: async (req: Request, res: Response) => {
    const userInfo = req.user;
    const toUserId = req.params.id;
    const result = await getRepository(Messages)
      .createQueryBuilder("Messages")
      .where(`Messages.sendUserId in (${userInfo.id},${toUserId})`)
      .andWhere(`Messages.getUserId in (${userInfo.id},${toUserId})`)
      .addOrderBy("Messages.createdAt", "ASC")
      .getMany();
    res.json(result);
  }
};
function talkingUserObj(datas: any): Array<any> {
  var messageArray = [];
  var temp: Number[] = [];
  for (var i = datas.length - 1; i >= 0; i--) {
    if (temp.includes(datas[i].getUserId)) continue;
    var message: any = {};
    message.getUserId = datas[i].getUserId;
    message.user = datas[i].getUser.firstName + " " + datas[i].getUser.lastName;
    message.email = datas[i].getUser.email;
    message.url = datas[i].getUser.profileImg;
    message.message = datas[i].message;
    messageArray.push(message);
    temp.push(datas[i].getUserId);
  }
  return messageArray;
}
