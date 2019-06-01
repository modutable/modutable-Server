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
export class Images extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
  @ManyToOne(type => Hosts, hosts => hosts.images)
  host: Hosts;
}
