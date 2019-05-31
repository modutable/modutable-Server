import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Hosts } from "./Hosts";
import { Travelers } from "./Travelers";
@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  @Column()
  lastName: Date;
  @Column()
  address: Date;
  @Column()
  email: Date;
  @Column()
  password: number;
  @Column()
  birthday: number;
  @Column()
  createdAt: number;
  @Column()
  updatedAt: number;
  @Column()
  profile: string;

  @OneToMany(type => Hosts, hosts => hosts.user)
  hosts: Hosts[];
  @OneToMany(type => Travelers, travelers => travelers.user)
  Travelers: Travelers[];

  @ManyToMany(type => Hosts, hosts => hosts.Musers)
  @JoinTable()
  Mhosts: Hosts[];
}
