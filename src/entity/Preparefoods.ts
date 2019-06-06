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
  state: string;

  @ManyToOne(type => Users, user => user.event)
  user: Users;
  @Column()
  userId: number;
  @ManyToOne(type => Events, event => event.preparefoods)
  event: Users;

  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
