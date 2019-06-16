import "reflect-metadata";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Messages } from "../entity/Messages";
import { Users } from "../entity/Users";
export = {
  save: async (data: any) => {
    const newMessage = new Messages();
    newMessage.sendUserId = data.myId;
    newMessage.getUserId = data.otherUserId;
    newMessage.message = data.text;
    newMessage.createdAt = data.createdAt;
    await getRepository(Messages)
      .createQueryBuilder()
      .insert()
      .values(newMessage)
      .execute();
  },
  deleteMessages: async (req: Request, res: Response) => {
    const myid = req.user.id;
    const yourId = req.params.id;
    console.log(11);
    await getRepository(Messages)
      .createQueryBuilder("Messages")
      .delete()
      .where(`Messages.sendUserId in (${myid},${yourId})`)
      .andWhere(`Messages.getUserId in (${myid},${yourId})`)
      .execute();

    res.json("test");
  },
  talkingUserList: async (req: Request, res: Response) => {
    const userInfo = req.user;
    const list1 = await getRepository(Messages)
      .createQueryBuilder("Messages")
      .leftJoinAndSelect("Messages.sendUser", "users")
      .where(`Messages.getUserId = ${userInfo.id}`)
      .getMany();

    const list2 = await getRepository(Messages)
      .createQueryBuilder("Messages")
      .leftJoinAndSelect("Messages.getUser", "users")
      .where(`Messages.sendUserId = ${userInfo.id}`)
      .getMany();
    res.json({
      messages: talkingUserObj(list1, list2, req.user.id),
      myId: userInfo.id
    });
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
      messageArray = [...messageArray, ...list2];
      break;
    } else if (!list2.length) {
      messageArray = [...messageArray, ...list1];
      break;
    }
    if (list1[list1.length - 1].createdAt < list2[list2.length - 1].createdAt) {
      message = list1.splice(list1.length - 1, 1);
    } else {
      message = list2.splice(list2.length - 2, 1);
    }
    messageArray = [...messageArray, ...message];
  }
  messageArray = messageArray.map(message => {
    var newMessage: any = {};
    newMessage.otherUserId =
      message.getUserId === myId ? message.sendUserId : message.getUserId;
    newMessage.otherUserName =
      message.getUserId === myId
        ? message.sendUser.firstName + " " + message.sendUser.lastName
        : message.getUser.firstName + " " + message.getUser.lastName;
    newMessage.photo =
      message.getUserId === myId
        ? message.sendUser.profileImg
        : message.getUser.profileImg;
    newMessage.email =
      message.getUserId === myId
        ? message.sendUser.email
        : message.getUser.email;
    newMessage.text = message.message;
    newMessage.createdAt = message.createdAt;
    newMessage.isMine = message.sendUserId === myId;
    return newMessage;
  });
  return messageArray;
}
