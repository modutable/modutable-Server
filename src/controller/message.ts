import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, Like } from "typeorm";
import { Messages } from "../entity/Messages";

export = {
  getMessages: async (req: Request, res: Response) => {
    const message = await getRepository(Messages)
      .createQueryBuilder("Messages")
      .getMany();
    res.send(message);
  }
};
