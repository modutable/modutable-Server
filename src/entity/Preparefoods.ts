import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne
} from "typeorm";
import { Users } from "./Users";
import { Events } from "./Events";
@Entity()
export class Preparefoods extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  state: Number;

  @ManyToOne(type => Users, user => user.event)
  user: Users;
  @Column()
  userId: Number;
  @ManyToOne(type => Events, event => event.preparefoods)
  event: Users;
  @Column()
  eventId: Number;

  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
