import { Request, Response } from "express";
import "reflect-metadata";
import { getRepository, createQueryBuilder } from "typeorm";
import { Events } from "../entity/Events";
import { Events_Users } from "../entity/Events_Users";
import { Users } from "../entity/Users";
import { Preparefoods } from "../entity/Preparefoods";
import { Images } from "../entity/Images";
require("dotenv").config();
export = {
  getEvents: async (req: Request, res: Response) => {
    let { address, opendate, guests } = req.query;
    opendate = new Date(opendate);

    var date = `${opendate.getFullYear()}-${opendate.getMonth() +
      1}-${opendate.getDate()}`;
    const events = await getRepository(Events)
      .createQueryBuilder("Events")
      .leftJoinAndSelect("Events.user", "users")
      .leftJoinAndSelect("Events.images", "images")
      .where("Events.address like :searchCity", { searchCity: `%${address}%` })
      .andWhere("Events.openDate = :searchDate", { searchDate: date })
      .andWhere("Events.guestMin <= :searchGuests", { searchGuests: guests })
      .andWhere("Events.guestMax >= :searchGuests", { searchGuests: guests })
      .getMany();

    let resultEvents = events.map(event => {
      // there should be a way doing this at one time when query
      return {
        id: event.id,
        userName: event.user.firstName,
        profile: event.user.profileImg,
        address: event.address,
        title: event.title,
        mealsType: event.mealsType,
        reviewRating: event.rating,
        images: event.images[0].url
      };
    });
    res.json(resultEvents);
  },
  getOneEvent: async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getRepository(Events)
      .createQueryBuilder("Events")
      .leftJoinAndSelect("Events.user", "users")
      .leftJoinAndSelect("Events.images", "images")
      .leftJoinAndSelect("Events.preparefoods", "preparefoods")
      .leftJoinAndSelect("Events.events_users", "events_users")
      .where("Events.id = :id", { id: id })
      .getOne();
    res.json(result);
  },
  getEventReview: async (req: Request, res: Response) => {
    // 네임
    const { id } = req.params;
    const result = await getRepository(Events_Users)
      .createQueryBuilder("Events_Users") // if we know even id, why we need join table
      .leftJoinAndSelect("Events_Users.user", "users")
      .where("Events_Users.eventId = :id", { id })
      .andWhere("Events_Users.review_contents is not null")
      .addOrderBy("Events_Users.updatedAt", "ASC")
      .getMany();
    res.json(result);
  },
  bookEvent: async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const userId = req.user.id; // i'm confused, are we using token?
    const { foodNames } = req.body;
    console.log(eventId, userId, foodNames);

    const checkBook = await getRepository(Events_Users)
      .createQueryBuilder()
      .where("Events_Users.eventId = :eventId", { eventId })
      .andWhere("Events_Users.userId =:userId", { userId })
      .getMany();

    if (checkBook.length !== 0) {
      res.json(false);
    } else {
      const event = new Events();
      event.id = eventId;
      const user = new Users();
      user.id = userId;
      const event_user = new Events_Users();
      event_user.event = JSON.parse(JSON.stringify(event));
      event_user.user = JSON.parse(JSON.stringify(user));
      event_user.createdAt = new Date();
      event_user.updatedAt = new Date();
      event_user.bookDate = new Date();
      event_user.state = "신청중";
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
      res.json(true);
    }
  },
  createEvent: async (req: Request, res: Response) => {
    const event = setEventObj(req);
    event.createdAt = new Date();
    const { images } = req.body;
    const result = await getRepository(Events)
      .createQueryBuilder()
      .insert()
      .values(event)
      .execute();

    for (var image of images) {
      var imageClass = new Images();
      imageClass.url = image;
      imageClass.eventId = result.raw.insertId;
      await getRepository(Images)
        .createQueryBuilder()
        .insert()
        .values(imageClass)
        .execute();
    }
    res.json("test");
  },
  updateEvent: async (req: Request, res: Response) => {
    const event = setEventObj(req);
    const eventId = req.params.id;
    const { images } = req.body;

    await createQueryBuilder()
      .update(Events)
      .set(event)
      .where("id = :id", { id: eventId })
      .execute();

    await createQueryBuilder()
      .delete()
      .from(Images)
      .where("eventId = :id", { id: eventId })
      .execute();

    for (var image of images) {
      var imageClass = new Images();
      imageClass.url = image;
      imageClass.eventId = eventId;
      await getRepository(Images)
        .createQueryBuilder()
        .insert()
        .values(imageClass)
        .execute();
    }
    res.json("test");
  },
  deleteEvent: async (req: Request, res: Response) => {
    const { id } = req.params.id;
    await getRepository(Events)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id: id })
      .execute();
  }
};

function setEventObj(req: Request) {
  const {
    phone,
    address,
    guest_min,
    guest_max,
    openDate,
    title,
    mealsType,
    experience,
    description,
    deadline
  } = req.body;

  const event = new Events();
  event.phone = phone;
  event.address = address;
  event.guestMin = guest_min;
  event.guestMax = guest_max;
  event.openDate = openDate;
  event.title = title;
  event.description = description;
  event.experience = experience;
  event.mealsType = mealsType;
  event.deadline = deadline;
  event.updatedAt = new Date();
  event.userId = req.user.id;
  return event;
}
