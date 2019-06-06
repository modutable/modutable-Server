import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from "typeorm";
import { Users } from "./Users";
import { Images } from "./Images";
import { Preparefoods } from "./Preparefoods";
import { Events_Users } from "./Events_Users";

@Entity()
export class Events extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  guestMin: number;
  @Column()
  guestMax: number;
  @Column()
  guests: number;
  @Column()
  openDate: Date;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  experience: string;
  @Column()
  mealsType: string;
  @Column()
  deadline: Date;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  rating: number;

  @ManyToOne(type => Users, user => user.event)
  user: Users;

  @OneToMany(type => Users, user => user.event)
  events_users: Events_Users[];

  @OneToMany(type => Images, images => images.event)
  images: Images[];

  @OneToMany(type => Preparefoods, Preparefoods => Preparefoods.event)
  preparefoods: Preparefoods[];
}
