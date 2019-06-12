import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Users } from "./Users";
@Entity()
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Users)
  @JoinColumn()
  sendUser: Users;

  @Column()
  sendUserId: Number;

  @OneToOne(type => Users)
  @JoinColumn()
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
