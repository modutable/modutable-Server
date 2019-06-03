import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
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
  lastName: string;
  @Column()
  address: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  birthday: Date;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
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
