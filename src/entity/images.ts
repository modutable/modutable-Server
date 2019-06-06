import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double,
  ManyToOne
} from "typeorm";
import { Events } from "./Events";

@Entity()
export class Images extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
  @ManyToOne(type => Events, Events => Events.images)
  event: Events;
}
