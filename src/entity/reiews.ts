import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double
} from "typeorm";

@Entity()
export class reviews extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;
  @Column()
  score: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  host_id: number;
}
