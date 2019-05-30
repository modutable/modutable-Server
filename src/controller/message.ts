import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, Like } from "typeorm";
import { messages } from "../entity/messages";

export = {
  getMessages: async (req: Request, res: Response) => {
    const message = await getRepository(messages)
      .createQueryBuilder("messages")
      .getMany();
    res.send(message);
  }
};
