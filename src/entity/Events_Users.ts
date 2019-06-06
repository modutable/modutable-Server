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
  state: string;
  @Column()
  bookDate: Date;
  @Column()
  review_contents: string;
  @Column()
  review_date: Date;
  @Column()
  score: Number;

  @ManyToOne(type => Users, user => user.event)
  user: Users;

  @ManyToOne(type => Users, user => user.event)
  event: Events;
}
