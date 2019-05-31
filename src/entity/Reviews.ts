import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double,
  ManyToOne
} from "typeorm";
import { Hosts } from "./Hosts";

@Entity()
export class Reviews extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;
  @Column()
  score: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;

  @ManyToOne(type => Hosts, hosts => hosts.review)
  host: Hosts;
}
