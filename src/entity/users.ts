import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne
} from "typeorm";
import { Events } from "./Events";
import { Users_travelers } from "./Users_travelers";
import { Preparefoods } from "./Preparefoods";
import { Events_Users } from "./Events_Users";
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
  profileImg: string;

  @OneToMany(type => Events, Events => Events.user)
  event: Events[];
  @OneToOne(type => Users_travelers, travelers => travelers.user)
  Travelers: Users_travelers;

  @OneToMany(type => Preparefoods, Preparefoods => Preparefoods.user)
  preparefoods: Preparefoods[];

  @OneToMany(type => Events_Users, Events_Users => Events_Users.user)
  events_users: Events_Users[];
}
