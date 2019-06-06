import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, createQueryBuilder } from "typeorm";
import { Events } from "../entity/Events";
import { Events_Users } from "../entity/Events_Users";
import { Users } from "../entity/Users";
import { Preparefoods } from "../entity/Preparefoods";

export = {
  getEvents: async (req: Request, res: Response) => {
    const { address, date, guests } = req.body;
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
  },
  bookEvent: async (req: Request, res: Response) => {
    const { userId, eventId, foodNames } = req.body;

    const event = new Events();
    event.id = eventId;
    const user = new Users();
    user.id = userId;
    const event_user = new Events_Users();
    event_user.event = JSON.parse(JSON.stringify(event));
    event_user.user = JSON.parse(JSON.stringify(user));
    await getRepository(Events_Users)
      .createQueryBuilder()
      .insert()
      .values(event_user)
      .execute();

    for (var food of foodNames) {
      await createQueryBuilder()
        .update(Preparefoods)
        .set({
          state: "신청",
          userId: userId
        })
        .where("eventId = :id", { id: eventId })
        .andWhere("name = :name", { name: food })
        .execute();
    }
    res.json("result");
  }
};
