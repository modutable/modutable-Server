import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Travelers extends BaseEntity {
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
  @ManyToOne(type => Users, user => user.Travelers)
  user: Users[];
}
