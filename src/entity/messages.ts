import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne
} from "typeorm";
import { Users } from "./Users";
@Entity()
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Users, user => user.sendmessage)
  sendUser: Users;
  @Column()
  sendUserId: Number;
  @OneToOne(type => Users, user => user.getmessage)
  getUser: Users;
  @Column()
  getUserId: Number;

  @Column()
  message: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
