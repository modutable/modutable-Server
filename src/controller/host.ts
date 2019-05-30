import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, Like } from "typeorm";
import { hosts } from "../entity/hosts";

export = {
  mainViewAddress: async (req: Request, res: Response) => {
    const { searchAddress } = req.body;
    const resultHosts = await getRepository(hosts)
      .createQueryBuilder("hosts")
      .select(["hosts.address"])
      .where("hosts.address like :searchKeyword", {
        searchKeyword: `%${searchAddress}%`
      })
      .getMany();
    res.json(resultHosts);
  },
  quickSearchHost: async (req: Request, res: Response) => {
    const { city, date, guests } = req.body;
    const resultHosts = await getRepository(hosts)
      .createQueryBuilder("hosts")
      .where("hosts.address like :searchCity", { searchCity: `%${city}%` })
      .andWhere("hosts.openDate <= :searchDate", { searchDate: date })
      .andWhere("hosts.closeDate >= :searchDate", { searchdate: date })
      .andWhere("hosts.guestMin <= :searchGuests", { searchGuests: guests })
      .andWhere("hosts.guestMax >= :searchGuests", { searchGuests: guests })
      .getMany();

    res.json(resultHosts);
  }
};
