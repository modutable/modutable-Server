import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double
} from "typeorm";

@Entity()
export class user_hosts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: string;
  @Column()
  bookDate: Date;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  user_id: number;
  @Column()
  host_id: number;
}
