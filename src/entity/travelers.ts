import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double
} from "typeorm";

@Entity()
export class travelers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  legion: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  user_id: number;
}
