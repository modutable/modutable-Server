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
import { Reviews } from "./Reviews";

@Entity()
export class Hosts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  openDate: Date;
  @Column()
  CloseDate: Date;
  @Column()
  guestMin: number;
  @Column()
  guestMax: number;
  @Column()
  guests: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  deadline: Date;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  rating: number;
  @Column()
  mealsType: string;

  @ManyToOne(type => Users, user => user.hosts)
  user: Users;

  @ManyToMany(type => Users, user => user.Mhosts)
  @JoinTable()
  Musers: Users[];

  @OneToMany(type => Images, images => images.host)
  images: Images[];
  @OneToMany(type => Reviews, review => review.host)
  review: Reviews[];
}
