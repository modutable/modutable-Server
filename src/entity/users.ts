import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double
} from "typeorm";

@Entity()
export class users extends BaseEntity {
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
}
