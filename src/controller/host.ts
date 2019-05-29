import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, Like } from "typeorm";
import { hosts } from "../entity/hosts";

export = {
  mainAddress: async (req: Request, res: Response) => {
    const { searchAddress } = req.body;
    const table = await getRepository(hosts)
      .createQueryBuilder("hosts")
      .select(["hosts.address"])
      .where("hosts.address like :searchKeyword", {
        searchKeyword: `%${searchAddress}%`
      })
      .getMany();
    res.json(table);
  }
};
