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
import { Messages } from "./Messages";
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
  Travelers: Users_travelers[];

  @ManyToMany(type => Events, Events => Events.Musers)
  @JoinTable()
  Mhosts: Events[];

  // @OneToOne(type => Preparefoods, Preparefoods => Preparefoods.userId)
  // preparefoods: Preparefoods;

  @OneToOne(type => Messages, message => message.sendUser)
  sendmessage: Messages;
  @OneToOne(type => Messages, message => message.getUser)
  getmessage: Messages;
}
