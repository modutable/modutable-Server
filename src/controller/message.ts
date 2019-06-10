import "reflect-metadata";
import { getRepository } from "typeorm";
import { Messages } from "../entity/Messages";
import { Users } from "../entity/Users";

export = {
  save: async (data: any) => {
    const toUserId = await getUserIdByEmail(data.to);
    const fromUserId = await getUserIdByEmail(data.from);

    console.log(toUserId);
    console.log(fromUserId);
    const newMessage = new Messages();
    newMessage.sendUser = data.from;
    newMessage.getUser = data.to;
    newMessage.message = data.message;
    newMessage.createdAt = new Date();
    newMessage.updatedAt = new Date();
    console.log(newMessage);
    const result = await getRepository(Messages)
      .createQueryBuilder()
      .insert()
      .values(newMessage)
      .execute();
  }
};

async function getUserIdByEmail(email: string) {
  return await getRepository(Users)
    .createQueryBuilder()
    .where("email = :email", { email: email })
    .getOne();
}
