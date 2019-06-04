import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository } from "typeorm";
import { Hosts } from "../entity/Hosts";

export = {
  getHosts: async (req: Request, res: Response) => {
    console.log("host----->", req.user);

    const { address, date, guests } = req.body;
    const hosts = await getRepository(Hosts)
      .createQueryBuilder("Hosts")
      .leftJoinAndSelect("Hosts.user", "users")
      .leftJoinAndSelect("Hosts.review", "reviews")
      .where("Hosts.address like :searchCity", { searchCity: `%${address}%` })
      .andWhere("Hosts.openDate <= :searchDate", { searchDate: date })
      .andWhere("Hosts.closeDate >= :searchDate", { searchdate: date })
      .andWhere("Hosts.guestMin <= :searchGuests", { searchGuests: guests })
      .andWhere("Hosts.guestMax >= :searchGuests", { searchGuests: guests })
      .getMany();
    let resultHosts = hosts.map(host => {
      return {
        id: host.id,
        userName: host.user.firstName,
        profile: host.user.profile,
        address: host.address,
        title: host.title,
        mealsType: host.mealsType,
        reviewRating: host.rating,
        reviewCount: host.review.length
      };
    });
    res.json(resultHosts);
  },
  getOneHost: async (req: Request, res: Response) => {
    const { id } = req.body;
    const result = await getRepository(Hosts)
      .createQueryBuilder("Hosts")
      .leftJoinAndSelect("Hosts.user", "users")
      .leftJoinAndSelect("Hosts.review", "reviews")
      .leftJoinAndSelect("Hosts.images", "images")
      .where("Hosts.id = :id", { id: id })
      .getOne();
    res.json(result);
  }
};
