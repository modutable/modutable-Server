import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository } from "typeorm";
import { Events } from "../entity/Events";

export = {
  getEvents: async (req: Request, res: Response) => {
    const { address, date, guests } = req.body;
    console.log(address, date, guests);
    const events = await getRepository(Events)
      .createQueryBuilder("Events")
      .leftJoinAndSelect("Events.user", "users")
      .where("Events.address like :searchCity", { searchCity: `%${address}%` })
      .andWhere("Events.openDate = :searchDate", { searchDate: date })
      .andWhere("Events.guestMin <= :searchGuests", { searchGuests: guests })
      .andWhere("Events.guestMax >= :searchGuests", { searchGuests: guests })
      .getMany();
    let resultEvents = events.map(event => {
      return {
        id: event.id,
        userName: event.user.firstName,
        profile: event.user.profileImg,
        address: event.address,
        title: event.title,
        mealsType: event.mealsType,
        reviewRating: event.rating
      };
    });
    res.json(resultEvents);
  },
  getOneEvent: async (req: Request, res: Response) => {
    const { id } = req.body;
    const result = await getRepository(Events)
      .createQueryBuilder("Events")
      .leftJoinAndSelect("Events.user", "users")
      .leftJoinAndSelect("Events.images", "images")
      .leftJoinAndSelect("Events.preparefoods", "preparefoods")
      .where("Events.id = :id", { id: id })
      .getOne();
    res.json(result);
  }
};
