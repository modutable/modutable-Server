import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  Double
} from "typeorm";
import "reflect-metadata";
import { Users } from "./Users";
import { Events } from "./Events";

@Entity()
export class Events_Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: Number;
  @Column()
  bookDate: Date;
  @Column()
  review_contents: string;
  @Column()
  review_date: Date;
  @Column()
  score: Number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;

  @ManyToOne(type => Users, user => user.events_users)
  user: Users;
  @Column()
  userId: Number;

  @ManyToOne(type => Events, event => event.events_users)
  event: Events;
  @Column()
  eventId: Number;
}
