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
    const list1 = await getRepository(Messages)
      .createQueryBuilder("Messages")
      .leftJoinAndSelect("Messages.getUser", "users")
      .orWhere(`Messages.getUserId = ${userInfo.id}`)
      .getMany();
    const list2 = await getRepository(Messages)
      .createQueryBuilder("Messages")
      .leftJoinAndSelect("Messages.sendUser", "users")
      .where(`Messages.sendUserId = ${userInfo.id}`)
      .getMany();
    res.json(talkingUserObj(list1, list2, userInfo.id));
  },
  getMessages: async (req: Request, res: Response) => {
    const userInfo = req.user;
    const toUserId = req.params.id;
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

function talkingUserObj(list1: any, list2: any, myId: Number): Array<any> {
  var messageArray: any[] = [];
  var otherTemp: Number[] = [];

  while (true) {
    var message;
    if (!list1.length) {
      return [...messageArray, ...list2];
    } else if (!list2.length) {
      return [...messageArray, ...list1];
    }
    if (list1[list1.length - 1].createdAt > list2[list2.length - 1].createdAt) {
      message = list1.splice(list1.length - 1, 1);
    } else {
      message = list2.splice(list2.length - 2, 1);
    }
    messageArray.push(message);
  }

  for (var i = datas.length - 1; i >= 0; i--) {
    var otherId =
      myId === datas[i].getUserId ? datas[i].sendUserId : datas[i].getUserId;
    if (otherTemp.includes(otherId)) continue;
    var message: any = {};
    message.getUserId = datas[i].getUserId;
    message.user = datas[i].getUser.firstName + " " + datas[i].getUser.lastName;
    message.url = datas[i].getUser.profileImg;
    message.message = datas[i].message;
    message.mine = datas[i].sendUserId === myId ? true : false;
    messageArray.push(message);
    otherTemp.push(otherId);
  }
  return messageArray;
}
