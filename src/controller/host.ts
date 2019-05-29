import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository } from "typeorm";
import { hosts } from "../entity/hosts";

export = {
  mainAddress: async (req: Request, res: Response) => {
    const table = await getRepository(hosts).find();
    res.json(table);
  }
};
