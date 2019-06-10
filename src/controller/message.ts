import "reflect-metadata";
import { getRepository } from "typeorm";
import { Messages } from "../entity/Messages";
import { Users } from "../entity/Users";

export = {
  save: async (data: any) => {
    const toUser = await getUserIdByEmail(data.to);
    const fromUser = await getUserIdByEmail(data.from);

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
  }
};

async function getUserIdByEmail(email: string) {
  return await getRepository(Users)
    .createQueryBuilder()
    .where("email = :email", { email: email })
    .getOne();
}
