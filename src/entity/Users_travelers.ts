import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Users_travelers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  legion: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @OneToOne(type => Users, user => user.Travelers)
  user: Users;
}
